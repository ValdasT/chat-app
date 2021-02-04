import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = JSON.parse(process.env.REACT_APP_AUTH_CONFIG)

firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export default firebase;
