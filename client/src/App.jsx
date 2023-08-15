import './App.css';
import Navbar from './components/Navbar/Navbar';
import Payment from './components/Payment/Payment';
import ProductsPage from './components/ProductsPage/ProductsPage';
import Product from './containers/Product/Product';

import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Navbar />
      <div className='container d-flex flex-column align-items-center'>
        <Routes>
          <Route path='/' element={<ProductsPage />}></Route>
          <Route path='/payment' element={<Payment />}></Route>
          <Route
            path={`product/:id`}
            element={
              <Product />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
