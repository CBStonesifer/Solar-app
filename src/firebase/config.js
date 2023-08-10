import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA959ZciV5e5nbrx4yr6PqBExcZsNQoQV0",
  authDomain: "solar-cbs.firebaseapp.com",
  projectId: "solar-cbs",
  storageBucket: "solar-cbs.appspot.com",
  messagingSenderId: "441439783608",
  appId: "1:441439783608:web:e50b66ab57ef854604024d",
  measurementId: "G-T04C0F18JY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }