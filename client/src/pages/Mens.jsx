import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/button/button.jsx';
import ProductPageItem from '../containers/ProductPageItem/ProductPageItem.jsx';

const Men = () => {
  const [productsData, setProductsData] = useState();
  const [sortOption, setSortOption] = useState(null);

  console.log(productsData);
  useEffect(() => {
    fetch('/products-data').then(async (result) => {
      const { productsDataInfo } = await result.json();
      setProductsData(productsDataInfo);
    });
  }, []);

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const renderProducts = () => {
    if (productsData) {
      let sortedProducts = [...productsData];

      // Sort the products based on the selected option
      if (sortOption === 'featured') {
        sortedProducts = sortedProducts.sort((a, b) => {
          return b.featured - a.featured;
        });
      } else if (sortOption === 'new') {
        sortedProducts = sortedProducts.sort((a, b) => {
          return b.dateCreated.seconds - a.dateCreated.seconds;
        });
      } else if (sortOption === 'lowToHigh') {
        sortedProducts = sortedProducts.sort((a, b) => {
          return a.price - b.price;
        });
      } else if (sortOption === 'highToLow') {
        sortedProducts = sortedProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }

      return sortedProducts
        .filter((product) => product.gender === 'M')

        .map((product, index) => (
          <Link key={index} to={`/product/${product.docID}`} state={product}>
            <ProductPageItem product={product} />
          </Link>
        ));
    }
  };

  return (
    <div className='d-flex flex-column mt-5'>
      <div style={{ paddingBottom: 100 }}>
        <div
          className='pb-4 mb-3'
          style={{
            fontFamily: 'merriweather',
            backgroundColor: '#eee',
            minWidth: '100vw',
            paddingTop: '150px',
          }}
        >
          <div
            className='fw-bold container'
            style={{
              fontFamily: 'merriweather',
              fontSize: '2.4rem',
            }}
          >
            Mens
          </div>
        </div>
        <div
          className='container mb-5 pb-3 p-0 d-flex gap-2'
          style={{ borderBottom: 'solid 1px #d9d9d9' }}
        >
          <div className='dropdown'>
            <a
              className='dropdown-button-container dropdown-toggle'
              href='#'
              role='button'
              id='dropdownMenuLink'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              Sort
            </a>

            <div
              className='dropdown-menu p-0 mt-2'
              style={{ width: '250px' }}
              aria-labelledby='dropdownMenuLink'
            >
              <div className='p-2 d-flex align-items-center gap-2 dropdown-button-item'>
                <input
                  className='form-check-input m-0 '
                  type='radio'
                  name='flexRadioDefault'
                  id='flexRadioDefault1'
                  onChange={() => handleSortChange('featured')}
                />
                <label
                  style={{ cursor: 'pointer' }}
                  className='form-check-label fs-5 w-100'
                  htmlFor='flexRadioDefault1'
                >
                  Featured
                </label>
              </div>
              <div className='p-2 d-flex align-items-center gap-2 dropdown-button-item'>
                <input
                  className='form-check-input m-0'
                  type='radio'
                  name='flexRadioDefault'
                  id='flexRadioDefault2'
                  onChange={() => handleSortChange('new')}
                />
                <label
                  style={{ cursor: 'pointer' }}
                  className='form-check-label fs-5 w-100'
                  htmlFor='flexRadioDefault2'
                >
                  New
                </label>
              </div>
              <div className='p-2 d-flex align-items-center gap-2 dropdown-button-item'>
                <input
                  className='form-check-input m-0'
                  type='radio'
                  name='flexRadioDefault'
                  id='flexRadioDefault3'
                  onChange={() => handleSortChange('lowToHigh')}
                />
                <label
                  style={{ cursor: 'pointer' }}
                  className='form-check-label fs-5 w-100'
                  htmlFor='flexRadioDefault3'
                >
                  Price, low to high
                </label>
              </div>
              <div className='p-2 d-flex align-items-center gap-2 dropdown-button-item'>
                <input
                  className='form-check-input m-0'
                  type='radio'
                  name='flexRadioDefault'
                  id='flexRadioDefault4'
                  onChange={() => handleSortChange('highToLow')}
                />
                <label
                  style={{ cursor: 'pointer' }}
                  className='form-check-label fs-5 w-100'
                  htmlFor='flexRadioDefault4'
                >
                  Price, high to low
                </label>
              </div>
            </div>
          </div>

          <div className='dropdown'>
            <a
              className='dropdown-button-container dropdown-toggle'
              href='#'
              role='button'
              id='dropdownMenuLink'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              Availability
            </a>

            <div
              className='dropdown-menu p-0'
              style={{ width: '250px' }}
              aria-labelledby='dropdownMenuLink'
            >
              <div className='p-2 d-flex align-items-center gap-2 dropdown-button-item'>
                <input
                  className='form-check-input m-0 '
                  type='radio'
                  name='flexRadioDefault'
                  id='flexRadioDefault1'
                  onChange={() => handleSortChange('featured')}
                />
                <label
                  style={{ cursor: 'pointer' }}
                  className='form-check-label fs-5 w-100'
                  htmlFor='flexRadioDefault1'
                >
                  Featured
                </label>
              </div>
              <div className='p-2 d-flex align-items-center gap-2 dropdown-button-item'>
                <input
                  className='form-check-input m-0'
                  type='radio'
                  name='flexRadioDefault'
                  id='flexRadioDefault2'
                  onChange={() => handleSortChange('new')}
                />
                <label
                  style={{ cursor: 'pointer' }}
                  className='form-check-label fs-5 w-100'
                  htmlFor='flexRadioDefault2'
                >
                  New
                </label>
              </div>
              <div className='p-2 d-flex align-items-center gap-2 dropdown-button-item'>
                <input
                  className='form-check-input m-0'
                  type='radio'
                  name='flexRadioDefault'
                  id='flexRadioDefault3'
                  onChange={() => handleSortChange('lowToHigh')}
                />
                <label
                  style={{ cursor: 'pointer' }}
                  className='form-check-label fs-5 w-100'
                  htmlFor='flexRadioDefault3'
                >
                  Price, low to high
                </label>
              </div>
              <div className='p-2 d-flex align-items-center gap-2 dropdown-button-item'>
                <input
                  className='form-check-input m-0'
                  type='radio'
                  name='flexRadioDefault'
                  id='flexRadioDefault4'
                  onChange={() => handleSortChange('highToLow')}
                />
                <label
                  style={{ cursor: 'pointer' }}
                  className='form-check-label fs-5 w-100'
                  htmlFor='flexRadioDefault4'
                >
                  Price, high to low
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-4 container p-0'>{renderProducts()}</div>
      </div>
    </div>
  );
};
export default Men;
