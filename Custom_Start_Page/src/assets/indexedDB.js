let db; // Globale Variable für die Datenbank
const dbName = "SearchDB";
const storeNames = ["springer", "google", "scholar"];
const storeLimit = 2000;




export async function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = function (event) {
        db = event.target.result;

        storeNames.forEach(element => {
            if (!db.objectStoreNames.contains(element)) {
                db.createObjectStore(element, { keyPath: "id", autoIncrement: true });
            }
        });
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        resolve;
    };

    request.onerror = reject;
  })
}

function checkCount(storeName){
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], "readwrite");
        const store = transaction.objectStore(storeName);

        const countRequest = store.count();

        countRequest.onsuccess = function () {
            const count = countRequest.result;

            if (count >= storeLimit) {
                const getAllKeysRequest = store.getAllKeys();

                getAllKeysRequest.onsuccess = () => {
                  const keys = getAllKeysRequest.result;
      
                  if (keys.length > 0) {
                    store.delete(keys[0]).onsuccess = () => {
                      console.log(`Eintrag mit Schlüssel ${keys[0]} gelöscht.`);
                    };
                  }
                }
            } else {
                resolve;
            }
        };
        countRequest.onerror = reject;
    });
}

export async function deleteByQuery(query, storeName) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName);
  
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
  
        // Erstelle einen Cursor, um nach `query` zu suchen
        const cursorRequest = store.openCursor();
        let deletedCount = 0;
  
        cursorRequest.onsuccess = (event) => {
          const cursor = event.target.result;
  
          if (cursor) {
            if (cursor.value.query.toLowerCase().trim() === query.toLowerCase().trim()) {
              // Passenden Eintrag löschen
              cursor.delete();
              deletedCount++;
            }
            cursor.continue();
          } else {
            // Kein weiterer Eintrag, löschvorgang abgeschlossen
            resolve(deletedCount);
          }
        };
  
        cursorRequest.onerror = (event) => {
          console.error('Fehler beim Durchsuchen mit Cursor:', event.target.error);
          reject(event.target.error);
        };
      };
  
      request.onerror = (event) => {
        console.error('Datenbank-Fehler:', event.target.error);
        reject(event.target.error);
      };
    });
  }


export async function saveSearch(searchInput, storeName) {
    await deleteByQuery(searchInput, storeName)

    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);

    const searchEntry = {
        query: searchInput.trim(),
        date: new Date().toISOString(),
    };

    const request = store.add(searchEntry);

    checkCount(storeName);

    request.onsuccess = function () {
        console.log("Suchanfrage erfolgreich gespeichert:", searchEntry);
    };

    request.onerror = function (event) {
        console.error("Fehler beim Speichern der Suchanfrage:", event.target.error);
    };
}

// 3. Alle Suchanfragen laden und anzeigen
export function loadSearches(storeName) {
    return new Promise((resolve, reject) => {
        // Transaktion im "readonly"-Modus starten
        const transaction = db.transaction([storeName], "readonly");
        const store = transaction.objectStore(storeName);

        const request = store.openCursor();
        const resultArray = []; // Array zum Speichern der Daten

        // Cursor durchläuft alle Einträge im Store
        request.onsuccess = function (event) {
            const cursor = event.target.result;

            if (cursor) {
                resultArray.push(cursor.value); // Eintrag zum Array hinzufügen
                cursor.continue(); // Zum nächsten Eintrag weitergehen
            } else {
                // Cursor beendet, alle Einträge wurden gesammelt
                resolve(resultArray);
            }
        };

        request.onerror = function (event) {
            console.error("Fehler beim Laden der Daten aus dem Store:", event.target.error);
            reject(event.target.error);
        };
    });
}

 