// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { 
  getDatabase, 
  ref, 
  push, 
  onValue, 
  update, 
  remove 
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC-Ci2XFYGGHu9NqGC-j0QeSqAW4B2oh3M",
  authDomain: "scrum-78aa5.firebaseapp.com",
  projectId: "scrum-78aa5",
  storageBucket: "scrum-78aa5.firebasestorage.app",
  messagingSenderId: "851396906073",
  appId: "1:851396906073:web:f445984cb7ae985c99f548",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, push, onValue, update, remove };
