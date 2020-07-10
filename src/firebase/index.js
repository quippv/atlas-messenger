import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB8S5wLqqjcWIY2zUT0kyQhDykVaYFYVJM",
  authDomain: "atlas-messenger-6b2b8.firebaseapp.com",
  databaseURL: "https://atlas-messenger-6b2b8.firebaseio.com",
  projectId: "atlas-messenger-6b2b8",
  storageBucket: "atlas-messenger-6b2b8.appspot.com",
  messagingSenderId: "437656680421",
  appId: "1:437656680421:web:6736ca08fd772dcca9e10c",
  measurementId: "G-94MNFFZ5F9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();

export default firebase;
