import { initializeApp } from "firebase/app";
import {
  API_KEY as apiKey,
  AUTH_DOMAIN as authDomain,
  PROJECT_ID as projectId,
  STORAGE_BUCKET as storageBucket,
  MESSAGING_SENDER_ID as messagingSenderId,
  APP_ID as appId,
  MEASUREMENT_ID as measurementId,
} from "@env";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

console.log(apiKey, authDomain, projectId, storageBucket, measurementId, messagingSenderId, appId)

// Initialize Firebase
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

const firebase = initializeApp(firebaseConfig);

export default firebase;
