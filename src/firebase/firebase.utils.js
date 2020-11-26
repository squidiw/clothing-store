import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBfIHotMSSsCuHPNCrugYj3LzfmkQNLXHg",
    authDomain: "crwn-db-d1a08.firebaseapp.com",
    databaseURL: "https://crwn-db-d1a08.firebaseio.com",
    projectId: "crwn-db-d1a08",
    storageBucket: "crwn-db-d1a08.appspot.com",
    messagingSenderId: "628369976052",
    appId: "1:628369976052:web:77e03c2309642beedd4ca1"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
