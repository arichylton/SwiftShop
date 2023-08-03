import './App.css';
import Navbar from './components/Navbar/Navbar';
import Payment from './components/Payment/Payment';
import ProductsPage from './components/ProductsPage/ProductsPage';


function App() {

  return (
    <>
      <Navbar />
      <div className='container d-flex align-items-center flex-column'>
        <div className='d-flex justify-content-center p-3'>
          <ProductsPage />
        </div>
        <Payment />
      </div>
    </>
  );
}

export default App;
