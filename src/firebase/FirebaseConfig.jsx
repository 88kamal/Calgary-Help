// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCnl0p5JDz6DUJOXS28AMwyAc_mg51LNcQ",
    authDomain: "calgary-help-d6d90.firebaseapp.com",
    projectId: "calgary-help-d6d90",
    storageBucket: "calgary-help-d6d90.appspot.com",
    messagingSenderId: "187517919898",
    appId: "1:187517919898:web:7f6f99c9f10a3bb8283523"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app)
const storage = getStorage(app);

export { fireDB, auth, storage };