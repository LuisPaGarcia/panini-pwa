import { ONE as UNICA } from "../data/const";
//@ts-check

// export default function InitData() {
//   let open = OpenDB();

//   open.onsuccess = function() {
//     var db = open.result;
//     var tx = db.transaction("sticker", "readwrite");
//     var store = tx.objectStore("sticker");

//     for (let index = 1; index <= 696; index++) {
//       store.add({ id: index, status: UNICA });
//     }

//     // var request = store.put({ id: 10, status: "HOLAAAAAAAAAAAA" });
//     var getAll = store.getAll();

//     getAll.onsuccess = () => {
//       console.log(getAll.result); // => All fields on stickers db
//     };

//     // Close the db when the transaction is done
//     tx.oncomplete = function() {
//       db.close();
//     };
//   };
// }

// export async function GetAllData() {
//   let open = await OpenDB();
//   InitData();

//   open.onsuccess = await function() {
//     var db = open.result;
//     var tx = db.transaction("sticker", "readwrite");
//     var store = tx.objectStore("sticker");

//     // Query the data
//     var getAll = store.getAll();

//     getAll.onsuccess = function() {
//       console.log(`Get all onsuccess: ${getAll.result}`);
//       return getAll.result;
//     };
//     // return store.getAll();
//   };
// }

// export function ChangeStickerStatus(obj) {
//   let open = OpenDB();

//   open.onsuccess = function() {
//     var db = open.result;
//     var tx = db.transaction("sticker", "readwrite");
//     var store = tx.objectStore("sticker");
//     var oldStatus = store.get(obj.id);
//     var request = store.put(obj);
//     tx.oncomplete = () => {
//       db.close();
//       return { new: request, old: oldStatus };
//     };
//   };
// }

// export function OpenDB() {
//   let open = indexedDB.open("dbstickers", 1);
//   open.onupgradeneeded = () => {
//     var db = open.result;
//     var store = db.createObjectStore("sticker", { keyPath: "id" });
//   };
//   return open;
// }

// function _isDataLoaded() {
//   let dbname = "dbstickers";
//   let storeName = "sticker";

//   return new Promise(function(resolve, reject) {
//     var dbRequest = indexedDB.open(dbname, 1);
//     dbRequest.onerror = function(event) {
//       reject(Error("Error text"));
//     };

//     dbRequest.onupgradeneeded = function(event) {
//       var db = dbRequest.result;
//       var store = db.createObjectStore(storeName, { keyPath: "id" });
//     };

//     dbRequest.onsuccess = function(event) {
//       var db = event.target.result;
//       var transaction = db.transaction(storeName, "readwrite");
//       var objectStore = transaction.objectStore(storeName);

//       // Query the data
//       var objectRequest = objectStore.get(1);

//       objectRequest.onerror = function(event) {
//         reject(Error("Error text"));
//       };

//       objectRequest.onsuccess = function(event) {
//         if (objectRequest.result) resolve(objectRequest.result);
//         else reject(Error("object not found"));
//       };
//     };
//   });
// }

export function updateStatus(object) {
  let dbname = "dbstickers";
  let storeName = "sticker";

  return new Promise(function(resolve, reject) {
    if (object.id === undefined) reject(Error("object has no id."));
    var dbRequest = indexedDB.open(dbname, 1);

    dbRequest.onerror = function(event) {
      reject(Error("IndexedDB database error"));
    };

    dbRequest.onupgradeneeded = function(event) {
      var database = event.target.result;
      // eslint-disable-next-line
      var objectStore = database.createObjectStore(storeName, {
        keyPath: "id"
      });
    };

    dbRequest.onsuccess = function(event) {
      var database = event.target.result;
      var transaction = database.transaction([storeName], "readwrite");
      var objectStore = transaction.objectStore(storeName);
      var objectRequest = objectStore.put(object); // Overwrite if exists

      objectRequest.onerror = function(event) {
        reject(Error("Error text"));
      };

      objectRequest.onsuccess = function(event) {
        resolve("Data saved OK");
      };
    };
    dbRequest.oncomplete = event => {
      event.target.result.close();
    };
  });
}

export function saveToIndexedDB() {
  let dbname = "dbstickers";
  let storeName = "sticker";

  return new Promise(function(resolve, reject) {
    // if (object.id === undefined) reject(Error('object has no id.'));
    var dbRequest = indexedDB.open(dbname, 1);

    dbRequest.onerror = function(event) {
      reject(Error("IndexedDB database error"));
    };

    dbRequest.onupgradeneeded = function(event) {
      var db = event.target.result;
      // eslint-disable-next-line
      var store = db.createObjectStore("sticker", { keyPath: "id" });
    };

    dbRequest.onsuccess = function(event) {
      var database = event.target.result;
      var transaction = database.transaction("sticker", "readwrite");
      var objectStore = transaction.objectStore(storeName);

      var dataExist = objectStore.get(1);

      dataExist.onerror = function(event) {
        console.log("error: ", dataExist.result);
      };

      dataExist.onsuccess = () => {
        console.log("Success: ", dataExist.result);

        if (dataExist.result === undefined) {
          console.log("UNO!");
          for (let index = 0; index <= 669; index++) {
            var objectRequest = objectStore.add({ id: index, status: UNICA });
            objectRequest.onerror = function(event) {
              reject("error");
            };

            objectRequest.onsuccess = function(event) {
              resolve("Data saved OK");
            };
          }
        } else {
          resolve("Data saved OK");
        }
      };
    };
    dbRequest.oncomplete = event => {
      event.target.result.close();
    };
  });
}

export function loadFromIndexedDB() {
  let dbname = "dbstickers";
  let storeName = "sticker";

  return new Promise(function(resolve, reject) {
    var dbRequest = indexedDB.open(dbname, 1);

    dbRequest.onerror = function(event) {
      reject(Error("Error text"));
    };

    dbRequest.onupgradeneeded = function(event) {
      var db = dbRequest.result;
      // eslint-disable-next-line
      var store = db.createObjectStore(storeName, { keyPath: "id" });
    };

    dbRequest.onsuccess = function(event) {
      var db = event.target.result;
      var transaction = db.transaction(storeName, "readwrite");
      var objectStore = transaction.objectStore(storeName);

      // Query the data
      var objectRequest = objectStore.getAll();

      objectRequest.onerror = function(event) {
        reject(Error("Error text"));
      };

      objectRequest.onsuccess = function(event) {
        if (objectRequest.result) resolve(objectRequest.result);
        else reject(Error("object not found"));
      };
    };
    dbRequest.oncomplete = event => {
      event.target.result.close();
    };
  });
}
