import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC-tSh0pC6LYU2cw3R4tUxC7n4nsgy-bQc",
    authDomain: "testproject-ca204.firebaseapp.com",
    databaseURL: "https://testproject-ca204-default-rtdb.firebaseio.com",
    projectId: "testproject-ca204",
    storageBucket: "testproject-ca204.appspot.com",
    messagingSenderId: "831503148489",
    appId: "1:831503148489:web:1a45ecc9d95460bcaa7418"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
