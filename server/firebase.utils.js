const { initializeApp } = require('firebase/app');

const {
  getFirestore,
  doc,
  collection,
  getDocs,
  getDoc,
  setDoc,
  Firestore,
} = require('firebase/firestore');

// Your web app's Firebase configuration
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${process.env.FIREBASE_API_KEY}`,
  authDomain: 'swiftshop-db.firebaseapp.com',
  projectId: 'swiftshop-db',
  storageBucket: 'swiftshop-db.appspot.com',
  messagingSenderId: '127152835913',
  appId: '1:127152835913:web:9dd912b386da2343141e98',
  measurementId: 'G-8EK1MYVLHG',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const getAllProducts = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));

  let products = [];
  
  try {
    querySnapshot.forEach((doc) => {
      let docID = doc.id
      products.push({ ...doc.data(), docID });
    });
    return products;
  } catch (error) {
    console.log('error fetching products', error.message);
  }
};

const getProductData = async (currentItemUID) => {
  const docRef = doc(db, 'products', currentItemUID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists) {
    try {
      return docSnap.data();
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
};

module.exports = { db, getAllProducts, getProductData };
