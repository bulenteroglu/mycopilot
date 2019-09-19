import authReducer from "./authReducer";
import logbookReducer from "./logbookReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  logbook: logbookReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
