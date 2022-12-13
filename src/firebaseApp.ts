import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApSIAN7ZgcdS2Tn5tiaw8A52IPf6LEQvE",
  authDomain: "turn-tracker-d9844.firebaseapp.com",
  databaseURL: "https://turn-tracker-d9844-default-rtdb.firebaseio.com",
  projectId: "turn-tracker-d9844",
  storageBucket: "turn-tracker-d9844.appspot.com",
  messagingSenderId: "774129733544",
  appId: "1:774129733544:web:97b3f235ca50a3c320579d",
  measurementId: "G-HHFVL8G50J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth };
