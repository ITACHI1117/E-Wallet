// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtr3zzenkKaveQT9ClBi9UB4cOJxIw2IM",
  authDomain: "test-a66fa.firebaseapp.com",
  databaseURL: "https://test-a66fa-default-rtdb.firebaseio.com",
  projectId: "test-a66fa",
  storageBucket: "test-a66fa.firebasestorage.app",
  messagingSenderId: "674996150222",
  appId: "1:674996150222:web:d761d0cca05fdfa99f559f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize SDKs you need
const auth = getAuth(app);
const db = getFirestore(app);

// Export for use in your app
export { auth, db };
