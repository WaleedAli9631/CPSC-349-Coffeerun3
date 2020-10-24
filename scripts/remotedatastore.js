(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoZyZuN3eVxOoGHJE-dF-11vPDUezfm8w",
  authDomain: "coffeerun-36301.firebaseapp.com",
  databaseURL: "https://coffeerun-36301.firebaseio.com",
  projectId: "coffeerun-36301",
  storageBucket: "coffeerun-36301.appspot.com",
  messagingSenderId: "399869583740",
  appId: "1:399869583740:web:d3cd7a616172e241d344f9",
  measurementId: "G-18CJDTFMQL"
};
  var project = firebase.initializeApp(firebaseConfig);
  var firestore = project.firestore();
  
  const docRef = firestore.doc('orders/coffeeorders');

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
    }

    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function (key, val) {
   var coffeeRef = firestore.doc('orders/' + key);
   coffeeRef.set(val);
  };

  RemoteDataStore.prototype.getAll =  function (cb) {
    const snapshot =  firestore.collection('orders').get().then( snapshot => {
      var data = snapshot.docs.map(doc => doc.data());
      cb(data);
    });
  };

  RemoteDataStore.prototype.get = function (key, cb) {
    var coffeeRef = firestore.doc('orders/' + key);
    coffeeRef.get();
    cb(doc);

  };

  RemoteDataStore.prototype.remove = function (key) {

    var coffeeRef = firestore.doc('orders/'+key);
    coffeeRef.delete().then(function(doc){
      console.log(doc);
    }).catch(err=>{
      console.log(err)
    })
  };


  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
