 import firebase from "firebase";


 const firebaseApp= firebase.initializeApp({
    apiKey: "AIzaSyCnU9XxsfcLuqWqBhLPdVO8GS433vPeSDw",
    authDomain: "instagram-ce43a.firebaseapp.com",
    databaseURL: "https://instagram-ce43a.firebaseio.com",
    projectId: "instagram-ce43a",
    storageBucket: "instagram-ce43a.appspot.com",
    messagingSenderId: "917211046268",
    appId: "1:917211046268:web:981709472d5a04d45604f9",
    measurementId: "G-C26NVP7CKR"
  
 });
   
  const db=firebaseApp.firestore();
  const auth= firebase.auth();
  const storage= firebase.storage();

  export {db,auth,storage};  