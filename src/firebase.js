import { initializeApp } from "firebase/app";
import {getFirestore, collection} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCOR1oNfsWWH8mjwmvRTfNXmYk_IwNxGyg",
  authDomain: "notes-app-f3510.firebaseapp.com",
  projectId: "notes-app-f3510",
  storageBucket: "notes-app-f3510.appspot.com",
  messagingSenderId: "642118338464",
  appId: "1:642118338464:web:e547c4be99e8fa113846c5"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export const noteCollection = collection(db, "savedNotes")