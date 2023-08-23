import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_API_KEY}`,
  authDomain: 'swiftshop-db.firebaseapp.com',
  projectId: 'swiftshop-db',
  storageBucket: 'swiftshop-db.appspot.com',
  messagingSenderId: '127152835913',
  appId: '1:127152835913:web:9dd912b386da2343141e98',
  measurementId: 'G-8EK1MYVLHG',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// AUTHENTICATION
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGoogleRedirect = () => {
  signInWithRedirect(auth, googleProvider);
};

// FIRESTORE
export const db = getFirestore(firebaseApp);

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userAuth);
  //if user data does not exist then create it
  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();
    const cart = [];
    const reviews = {};

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        cart,
        reviews,
        photoURL,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

// CREATE USER WITH EMAIL AND PASSWORD
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// SIGN IN WITH EMAIL AND PASSWORD
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const onAuthStateChangedListener = (callback) => {
  if (!callback) return;
  onAuthStateChanged(auth, callback);
};

export const getUserData = async () => {
  const docRef = doc(db, 'users', auth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists) {
    try {
      return docSnap.data();
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
};

export const updateUserCart = async (cartData) => {
  const currentUserDocRef = doc(db, 'users', auth.currentUser.uid);

  try {
    const userDoc = await getDoc(currentUserDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const updatedCart = userData.cart.concat(cartData);
      await updateDoc(currentUserDocRef, {
        cart: updatedCart,
      });

      console.log('Cart update successful');
    } else {
      console.log('User document not found');
    }
  } catch (error) {
    console.error('Error updating cart:', error);
  }
};

export const removeUserCartItem = async (docIdToRemove, sizeToRemove) => {
  const currentUserDocRef = doc(db, 'users', auth.currentUser.uid);

  try {
    const userDoc = await getDoc(currentUserDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const updatedCart = userData.cart.filter((item) => {
        return item.docId !== docIdToRemove && item.size !== sizeToRemove;
      });

      await updateDoc(currentUserDocRef, {
        cart: updatedCart,
      });

      console.log('Item removed from cart successfully');
    } else {
      console.log('User document not found');
    }
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};
