let db; // Globale Variable für die Datenbank
const dbName = "SearchDB";
const storeNames = ["springer", "google", "scholar"];



// 1. IndexedDB öffnen/erstellen
export function openDB() {
    const request = indexedDB.open(dbName, 1); // Versionsnummer: 1

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
        console.log("IndexedDB erfolgreich geöffnet");
    };

    request.onerror = function (event) {
        console.error("Fehler beim Öffnen der IndexedDB", event.target.error);
    };
}

// 2. Suchanfrage speichern
export function saveSearch(event, storeName) {
    const searchInput = event.target.value;

    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);

    const searchEntry = {
        query: searchInput,
        date: new Date().toISOString(),
    };

    const request = store.add(searchEntry);

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

 