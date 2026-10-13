const dbName = "SearchDB";
const storeNames = ["springer", "google", "scholar"];
const storeLimit = 5000;

let dbPromise = null;

// Trims and collapses repeated whitespace, so "  foo   bar " becomes "foo bar".
export function normalizeQuery(query) {
  return String(query ?? "").trim().replace(/\s+/g, " ");
}

// Older versions stored URL-encoded queries ("foo%20bar"); decode them for display.
function decodeLegacy(query) {
  if (!/%[0-9a-f]{2}/i.test(query)) return query;
  try {
    return decodeURIComponent(query);
  } catch {
    return query;
  }
}

function requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function transactionDone(transaction) {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

export function openDB() {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      storeNames.forEach((name) => {
        if (!db.objectStoreNames.contains(name)) {
          db.createObjectStore(name, { keyPath: "id", autoIncrement: true });
        }
      });
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      dbPromise = null;
      reject(request.error);
    };
  });

  return dbPromise;
}

export async function loadSearches(storeName) {
  const db = await openDB();
  const store = db.transaction(storeName, "readonly").objectStore(storeName);
  const entries = await requestToPromise(store.getAll());

  // Oldest first (insertion order), queries normalized and deduplicated (newest wins).
  const seen = new Map();
  for (const entry of entries) {
    const query = normalizeQuery(decodeLegacy(entry.query));
    if (!query) continue;
    seen.delete(query.toLowerCase());
    seen.set(query.toLowerCase(), { ...entry, query });
  }
  return [...seen.values()];
}

export async function deleteByQuery(query, storeName) {
  const target = normalizeQuery(query).toLowerCase();
  const db = await openDB();
  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);
  let deletedCount = 0;

  const cursorRequest = store.openCursor();
  cursorRequest.onsuccess = () => {
    const cursor = cursorRequest.result;
    if (!cursor) return;
    if (normalizeQuery(decodeLegacy(cursor.value.query)).toLowerCase() === target) {
      cursor.delete();
      deletedCount++;
    }
    cursor.continue();
  };

  await transactionDone(transaction);
  return deletedCount;
}

export async function saveSearch(query, storeName) {
  const normalized = normalizeQuery(query);
  if (!normalized) return;

  await deleteByQuery(normalized, storeName);

  const db = await openDB();
  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);

  store.add({ query: normalized, date: new Date().toISOString() });

  const keysRequest = store.getAllKeys();
  keysRequest.onsuccess = () => {
    const keys = keysRequest.result;
    const overflow = keys.length - storeLimit;
    for (let i = 0; i < overflow; i++) {
      store.delete(keys[i]);
    }
  };

  // Resolve only once the write is committed, so navigating away can't drop it.
  await transactionDone(transaction);
}
