import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Payment from './components/Payment/Payment';
import ProductsPage from './components/ProductsPage/ProductsPage';
import Product from './containers/Product/Product';
import PaymentSuccessPage from './containers/PaymentSuccessPage/PaymentSuccessPage';
import SignInPage from './containers/SignInPage/SignInPage';
import AdminProductsPage from './containers/AdminProductsPage/AdminProductsPage';
import NewProductPage from './containers/NewProductPage/NewProductPage';
import All from '../src/pages/All';
import Mens from '../src/pages/Mens';
import Seasonal from '../src/pages/Seasonal';
import Themes from '../src/pages/Themes';
import Womens from '../src/pages/Womens';
import Footer from './components/Footer/Footer';
import {
  onAuthStateChangedListener,
  getUserData,
} from './utils/firebase.utils';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './store/user/userSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChangedListener(async (authUser) => {
      if (authUser) {
        const { displayName, email, reviews, cart, photoURL, isAdmin } =
          await getUserData();
        dispatch(
          setCurrentUser({
            displayName,
            email,
            reviews,
            cart,
            photoURL,
            isAdmin,
          })
        );
      }
    });
  }, []);


  return (
    <main className='bg-light'>
      <Navbar />
      <div className=' d-flex flex-column align-items-center'>
        <Routes>
          <Route path='/' element={<ProductsPage />}></Route>
          <Route path='payment' element={<Payment />}></Route>
          <Route path={`product/:docID`} element={<Product />} />
          <Route path='signin' element={<SignInPage />} />
          <Route path='all' element={<All />} />
          <Route path='mens' element={<Mens />} />
          <Route path='womens' element={<Womens />} />
          <Route path='seasonal' element={<Seasonal />} />
          <Route path='themes' element={<Themes />} />
          <Route path={`payment/completion`} element={<PaymentSuccessPage />} />
          <Route path={`admin/products`} element={<AdminProductsPage />} />
          <Route path='admin/products/new' element={<NewProductPage />} />
        </Routes>
      </div>
      <Footer />
    </main>
  );
}

export default App;
