import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import the seedDatabase function (uncomment the next line "6" and line 21 before 
// the first load of the app to seed the data, then comment them back)
//import { seedDatabase } from "../seed";

// initialize the config object, firease app and the FieldValue
const config = {
    apiKey: "AIzaSyBwWaIySAe19hYhLbvrooPpBWa0HaIGrYE",
    authDomain: "insta-clone-35f4c.firebaseapp.com",
    projectId: "insta-clone-35f4c",
    storageBucket: "insta-clone-35f4c.appspot.com",
    messagingSenderId: "574594817547",
    appId: "1:574594817547:web:7a8380eaae1b1f7abab10e"
};
const firebaseApp = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// Call the seedDatabase function only once to seed the data
//seedDatabase(firebaseApp);

export { firebaseApp, FieldValue }