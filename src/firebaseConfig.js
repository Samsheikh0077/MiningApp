import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOe6GgKFenALc-Xh0DStJxhs5cfugxIKM",
  authDomain: "miningapp-c07b2.firebaseapp.com",
  projectId: "miningapp-c07b2",
  storageBucket: "miningapp-c07b2.firebasestorage.app",
  messagingSenderId: "949131785344",
  appId: "1:949131785344:web:8bceddb6fd5e661ac8e265",
  measurementId: "G-H32XGJBYPT",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs };
