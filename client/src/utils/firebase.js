import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDNthgHOptYCLhPWEcywXU3-V-8RGjHBls",
    authDomain: "only-friends-app.firebaseapp.com",
    projectId: "only-friends-app",
    storageBucket: "only-friends-app.appspot.com",
    messagingSenderId: "743455924405",
    appId: "1:743455924405:web:a4b9560193a3e7cd87defc",
    measurementId: "G-YCLXKVE73L"
};

firebase.initializeApp(config);

// export const createUserProfileDocument = async (userAuth, additionalData) => {
//   if (!userAuth) return;

//   const userRef = firestore.doc(`users/${userAuth.uid}`);

//   const snapShot = await userRef.get();

//   if (!snapShot.exists) {
//     const { displayName, email } = userAuth;
//     const createdAt = new Date();
//     try {
//       await userRef.set({
//         displayName,
//         email,
//         createdAt,
//         ...additionalData
//       });
//     } catch (error) {
//       console.log('error creating user', error.message);
//     }
//   }

//   return userRef;
// };

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();

export default firebase;
