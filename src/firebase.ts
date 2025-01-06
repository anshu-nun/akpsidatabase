import {initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASEKEY,
    authDomain: "akpsidb.firebaseapp.com",
    projectId: "akpsidb",
    storageBucket: "akpsidb.appspot.com",
    messagingSenderId: "162687480408",
    appId: "1:162687480408:web:5bbc8821aba85a5ff3502d",
    measurementId: "G-HSPBT5WEV5"
  };
  
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app);

const analytics = getAnalytics(app);