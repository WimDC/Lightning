import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBCBCTqly78qYNyM7J6VtasRadjs7sbX3s",
  authDomain: "lightning-b1137.firebaseapp.com",
  projectId: "lightning-b1137",
  storageBucket: "lightning-b1137.appspot.com",
  messagingSenderId: "703823722108",
  appId: "1:703823722108:web:f22d59afb684ed31a47bf9",
  measurementId: "G-2E37P3XPEQ",
};

const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
