import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "auth-exam-note-ai.firebaseapp.com",
  projectId: "auth-exam-note-ai",
  storageBucket: "auth-exam-note-ai.firebasestorage.app",
  messagingSenderId: "731771738745",
  appId: "1:731771738745:web:506be8fde793c0ec3e92a8"
};

const app = initializeApp(firebaseConfig);

const auth=getAuth(app)

const provider=new GoogleAuthProvider()

export {auth, provider}