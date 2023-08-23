import './App.css';
import Navbar from './components/Navbar/Navbar';
import Payment from './components/Payment/Payment';
import ProductsPage from './components/ProductsPage/ProductsPage';
import Product from './containers/Product/Product';

import { Routes, Route } from 'react-router-dom';
import SignInPage from './containers/SignInPage/SignInPage';


function App() {
  return (
    <main className='bg-light'>
      <Navbar />
      <div
        className='container d-flex flex-column align-items-center' style={{ minHeight: '100vh'}}
      >
        <Routes>
          <Route path='/' element={<ProductsPage />}></Route>
          <Route path='payment' element={<Payment />}></Route>
          <Route path={`product/:id`} element={<Product />} />
          <Route path='signin' element={<SignInPage />}/>
        </Routes>
      </div>
    </main>
  );
}

export default App;
