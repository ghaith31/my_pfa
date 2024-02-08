// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCE1JAcdlXIdRycp8xbvnnpcMJhDEDToA",
  authDomain: "holberton-cf87f.firebaseapp.com",
  projectId: "holberton-cf87f",
  storageBucket: "holberton-cf87f.appspot.com",
  messagingSenderId: "584086758508",
  appId: "1:584086758508:web:941436ab9cf03e0f5f2449",
  measurementId: "G-NB6EKCL2JR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);