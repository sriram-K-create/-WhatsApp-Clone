// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAgY2LTttXEHro6RKLxe0Kh_ZZFCRpFda8",
    authDomain: "whatsapp-clone-3cd5d.firebaseapp.com",
    projectId: "whatsapp-clone-3cd5d",
    storageBucket: "whatsapp-clone-3cd5d.appspot.com",
    messagingSenderId: "603676587844",
    appId: "1:603676587844:web:69f477bef1869f59330911",
    measurementId: "G-1F5X5SZ7YB"
  };

  const firebaseApp =  firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  const auth = firebase.auth();

  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth , provider};

  export default db;