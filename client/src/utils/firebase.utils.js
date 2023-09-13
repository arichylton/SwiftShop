import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import {
  getFirestore,
  doc,
  getDocs,
  query,
  where,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  deleteDoc
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

// Initialize Firebase Storage
const storage = getStorage(firebaseApp); 

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
    const isAdmin = false;
    const cart = [];
    const reviews = {};

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        isAdmin,
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

export const handleImageUpload = async (newProductId) => {
  const imageInput = document.getElementById('imageInput');
  const file = imageInput.files[0];

  if (file) {
    try {
      // Upload the file to Firebase Storage
      const storageRef = ref(
        storage,
        `productImages/${newProductId}/${file.name}`
      );
      await uploadBytes(storageRef, file);

      // Get the download URL of the uploaded image
      const imageURL = await getDownloadURL(storageRef);

      // Save the image URL to Firestore (replace 'products' and 'productId' with your collection and document names)
      const productDocRef = doc(db, 'products', newProductId);
      const productDoc = await getDoc(productDocRef);

      if (productDoc.exists()) {
        await setDoc(
          productDocRef,
          { productImage: imageURL },
          { merge: true }
        );
      }

      console.log('Image uploaded successfully.');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
};

export const createNewProduct = async (newProductData) => {
  try {
    // Reference to the 'products' collection in Firestore
    const productsCollection = collection(db, 'products');

    // Check if a product with the same name exists
    const nameQuery = query(
      productsCollection,
      where('name', '==', newProductData.name)
    );

    // Check if a product with the same productImage exists
    const productImageQuery = query(
      productsCollection,
      where('productImage', '==', newProductData.productImage)
    );

    const nameQuerySnapshot = await getDocs(nameQuery);
    const productImageQuerySnapshot = await getDocs(productImageQuery);

    // If a matching product exists based on either condition, return
    if (!nameQuerySnapshot.empty || !productImageQuerySnapshot.empty) {
      console.warn(
        'Product with the same name or productImage already exists.'
      );
      return;
    }

    // If no matching product exists based on either condition, proceed to add the new product
    const docRef = await addDoc(productsCollection, newProductData);

    // The ID of the newly created document
    const newProductId = docRef.id;

    handleImageUpload(newProductId);
    return newProductId;
  } catch (error) {
    // Handle any errors that occurred during the creation
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (newProductData, productUID) => {
  const currentProductRef = doc(db, 'products', productUID);

  try {
    const productDoc = await getDoc(currentProductRef);
    if (productDoc.exists()) {
      await updateDoc(currentProductRef, newProductData);

      console.log('Cart update successful');
    } else {
      console.log('User document not found');
    }
  } catch (error) {
    console.error('Error updating cart:', error);
  }
};



export const removeProduct = async (productUID) => {
  const productRef = doc(db, 'products', productUID);

  try {
    const productDoc = await getDoc(productRef);

    if (productDoc.exists()) {
      await deleteDoc(productRef);
      console.log('Product removed successfully');
    } else {
      console.log('Product not found');
    }
  } catch (error) {
    console.error('Error removing product:', error);
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

export const removeAllFromUserCart = async () => {
  const currentUserDocRef = doc(db, 'users', auth.currentUser.uid);

  try {
    const userDoc = await getDoc(currentUserDocRef);
    if (userDoc.exists()) {
      const updatedCart = [];
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

export const signOutUser = async () => await signOut(auth);
