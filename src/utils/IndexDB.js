// // This works on all devices/browsers, and uses IndexedDBShim as a final fallback
// var indexedDB =
//   window.indexedDB ||
//   window.mozIndexedDB ||
//   window.webkitIndexedDB ||
//   window.msIndexedDB ||
//   window.shimIndexedDB;

// // Open (or create) the database
// var open = indexedDB.open("MyDatabase", 1);

// // Create the schema
// open.onupgradeneeded = function() {
//   var db = open.result;
//   var store = db.createObjectStore("MyObjectStore", { keyPath: "id" });
//   var index = store.createIndex("NameIndex", ["name.last", "name.first"]);
// };

// open.onsuccess = function() {
//   // Start a new transaction
//   var db = open.result;
//   var tx = db.transaction("MyObjectStore", "readwrite");
//   var store = tx.objectStore("MyObjectStore");
//   var index = store.index("NameIndex");

//   // Add some data
//   store.put({ id: 12345, name: { first: "John", last: "Doe" }, age: 42 });
//   store.put({ id: 67890, name: { first: "Bob", last: "Smith" }, age: 35 });

//   // Query the data
//   var getJohn = store.get(12345);
//   var getBob = index.get(["Smith", "Bob"]);
//   var getAll = store.getAll();

//   getJohn.onsuccess = function() {
//     console.log(getJohn.result.name.first); // => "John"
//   };

//   getBob.onsuccess = function() {
//     console.log(getBob.result.name.first); // => "Bob"
//   };

//   getAll.onsuccess = () => {
//     console.log(getBob.result); // => "Bob"
//   };

//   // Close the db when the transaction is done
//   tx.oncomplete = function() {
//     db.close();
//   };
// };

const { UNICA, REPETIDA, FALTANTE } = {
  UNICA: "UNICA",
  REPETIDA: "REPETIDA",
  FALTANTE: "FALTANTE"
};

//@ts-ignore
var indexedDB =
  window.indexedDB ||
  //@ts-ignore
  window.mozIndexedDB ||
  //@ts-ignore
  window.webkitIndexedDB ||
  //@ts-ignore
  window.msIndexedDB ||
  //@ts-ignore
  window.shimIndexedDB;

// Open (or create) the database
var open = indexedDB.open("dbstickers", 1);

// Create the schema
open.onupgradeneeded = function() {
  var db = open.result;
  var store = db.createObjectStore("sticker", { keyPath: "id" });
  // var index = store.createIndex("NameIndex", ["name.last", "name.first"]);
};

open.onsuccess = function() {
  // Start a new transaction
  var db = open.result;
  var tx = db.transaction("sticker", "readwrite");
  var store = tx.objectStore("sticker");
  // var index = store.index("NameIndex");

  // Add some data
  for (let index = 1; index <= 696; index++) {
    store.put({ id: index, status: UNICA });
  }

  // Query the data
  // var getJohn = store.get(12345);
  // var getBob = index.get(["Smith", "Bob"]);

  var getAll = store.getAll();
  var request = store.put({ id: 1, status: "HOLAAAAAAAAAAAA" });
  var getAll = store.getAll();

  getAll.onsuccess = () => {
    console.log(getAll.result); // => "Bob"
  };

  // Close the db when the transaction is done
  tx.oncomplete = function() {
    db.close();
  };
};
