import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMvnJc7Tzk8ZmjtS_UHD1De0l9ykhPtP4",
    authDomain: "mfuko-61785.firebaseapp.com",
    databaseURL: "https://mfuko-61785.firebaseio.com",
    projectId: "mfuko-61785",
    storageBucket: "mfuko-61785.appspot.com",
    messagingSenderId: "1071991826486",
    appId: "1:1071991826486:web:b6d43d2ac40e32be75d097"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { firebase, storage as default };