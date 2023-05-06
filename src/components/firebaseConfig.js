// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRWMc0R_eONrEYGbh0vpKfWFhRXVs_Yco",
  authDomain: "chitchat-62a9f.firebaseapp.com",
  projectId: "chitchat-62a9f",
  storageBucket: "chitchat-62a9f.appspot.com",
  messagingSenderId: "182874392632",
  appId: "1:182874392632:web:af93727bc807025fc7fecd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;
