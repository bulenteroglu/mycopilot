import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyAFYY_M7Qq91SSD0hix8qPZHJ4RyOnsd-c",
  authDomain: "mycopilot-15535.firebaseapp.com",
  databaseURL: "https://mycopilot-15535.firebaseio.com",
  projectId: "mycopilot-15535",
  storageBucket: "mycopilot-15535.appspot.com",
  messagingSenderId: "902168114360"
};
firebase.initializeApp(config);
firebase.firestore();

export default firebase;
