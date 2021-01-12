import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
   apiKey: "AIzaSyDWRL_H8CDruNqJvdBxfnTKYCi1IbrTC4I",
   authDomain: "crwn-db-81e2a.firebaseapp.com",
   projectId: "crwn-db-81e2a",
   storageBucket: "crwn-db-81e2a.appspot.com",
   messagingSenderId: "665416892422",
   appId: "1:665416892422:web:1b770bc0a8a5f6309f4387",
   measurementId: "G-T59K93Y25M",
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
            ...additionalData,
         });
      } catch (error) {
         console.log("error creating user", error.message);
      }
   }

   return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
   const collectionRef = firestore.collection(collectionKey);
   console.log(collectionRef);

   const batch = firestore.batch();
   objectsToAdd.forEach((obj) => {
     // GET A NEW DOC REFERENCE IN THIS COLLECTION & RANDOMLY GENERATE AND ID
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj)
   });

   return await batch.commit()

};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(
    doc => {
      const{ title, items } = doc.data();

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id, 
        title,
        items
      }
    });
    
  return transformedCollection.reduce(( accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
