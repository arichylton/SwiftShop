import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/button/button.jsx';
import ProductPageItem from '../containers/ProductPageItem/ProductPageItem.jsx';

const Themes = () => {
  const [productsData, setProductsData] = useState();
  const [sortOption, setSortOption] = useState(null);
  const [sizeOption, setSizeOption] = useState(null);
  const [sortdarkOption, setSortdarkOption] = useState(null);
  const [sizedarkOption, setSizedarkOption] = useState(null);

  useEffect(() => {
    fetch('/products-data').then(async (result) => {
      const { productsDataInfo } = await result.json();
      setProductsData(productsDataInfo);
    });
  }, []);

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handledarkSortChange = (option) => {
    setSortdarkOption(option);
  };

  const renderLightProducts = () => {
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
        .filter((product) => {
          if (!sizeOption) {
            return product.theme === 'light';
          } else {
            return product.theme === 'light' && product.sizes[sizeOption] != 0;
          }
        })
        .map((product, index) => (
          <Link key={index} to={`/product/${product.docID}`} state={product}>
            <ProductPageItem product={product} />
          </Link>
        ));
    }
  };

  const handleClearFilters = () => {
    setSizeOption(null);
    setSortOption(null);

    // Clear selected radio buttons in the Sort dropdown
    document
      .querySelectorAll('[name="flexRadioDefault"]')
      .forEach((radio) => (radio.checked = false));

    // Clear selected radio buttons in the Availability dropdown
    document
      .querySelectorAll('[name="flexRadioDefault2"]')
      .forEach((radio) => (radio.checked = false));
  };

  const handleCleardarkFilters = () => {
    setSizedarkOption(null);
    setSortdarkOption(null);

    // Clear selected radio buttons in the Sort dropdown
    document
      .querySelectorAll('[name="flexRadioDefaultdark"]')
      .forEach((radio) => (radio.checked = false));

    // Clear selected radio buttons in the Availability dropdown
    document
      .querySelectorAll('[name="flexRadioDefault2dark"]')
      .forEach((radio) => (radio.checked = false));
  };

  const renderdarkProducts = () => {
    if (productsData) {
      let sortedProducts = [...productsData];

      // Sort the products based on the selected option
      if (sortdarkOption === 'featured') {
        sortedProducts = sortedProducts.sort((a, b) => {
          return b.featured - a.featured;
        });
      } else if (sortdarkOption === 'new') {
        sortedProducts = sortedProducts.sort((a, b) => {
          return b.dateCreated.seconds - a.dateCreated.seconds;
        });
      } else if (sortdarkOption === 'lowToHigh') {
        sortedProducts = sortedProducts.sort((a, b) => {
          return a.price - b.price;
        });
      } else if (sortdarkOption === 'highToLow') {
        sortedProducts = sortedProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }

      return sortedProducts
        .filter((product) => {
          if (!sizedarkOption) {
            return product.theme === 'dark';
          } else {
            return (
              product.theme === 'dark' && product.sizes[sizedarkOption] != 0
            );
          }
        })
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
            Light
          </div>
        </div>
        <div
          className='container mb-5 pb-3 p-0 d-flex gap-2'
          style={{ borderBottom: 'solid 1px #d9d9d9' }}
        >
          <button
            className={`dropdown-button-container ${
              !sortOption && !sizeOption ? 'd-none' : ''
            }`}
            style={{ backgroundColor: '#d9d9d9' }}
            onClick={handleClearFilters}
          >
            X Clear All
          </button>
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
                  className='form-check-input m-0'
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
              id='dropdownMenuLink2'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              Availability
            </a>

            <div
              className='dropdown-menu p-0 mt-2'
              aria-labelledby='dropdownMenuLink2'
            >
              <div className=' d-flex align-items-center gap-2 dropdown-button-item'>
                <input
                  className='form-check-input p-2 ms-2'
                  type='radio'
                  name='flexRadioDefault2'
                  id='flexRadioDefault21'
                  onChange={() => setSizeOption('s')}
                />
                <label
                  style={{ cursor: 'pointer', padding: '3px 3px 3px 0' }}
                  className='form-check-label fs-5 w-100'
                  htmlFor='flexRadioDefault21'
                >
                  s
                </label>
              </div>
              <div className='d-flex align-items-center gap-2 dropdown-button-item'>
                <input
                  className='form-check-input ms-2 p-2'
                  type='radio'
                  name='flexRadioDefault2'
                  id='flexRadioDefault22'
                  onChange={() => setSizeOption('m')}
                />
                <label
                  style={{ cursor: 'pointer', padding: '3px 3px 3px 0' }}
                  className='form-check-label fs-5 w-100'
                  htmlFor='flexRadioDefault22'
                >
                  m
                </label>
              </div>
              <div className='d-flex align-items-center gap-2 dropdown-button-item'>
                <input
                  className='form-check-input ms-2 p-2'
                  type='radio'
                  name='flexRadioDefault2'
                  id='flexRadioDefault23'
                  onChange={() => setSizeOption('l')}
                />
                <label
                  style={{ cursor: 'pointer', padding: '3px 3px 3px 0' }}
                  className='form-check-label fs-5 w-100'
                  htmlFor='flexRadioDefault23'
                >
                  l
                </label>
              </div>
              <div className='d-flex align-items-center gap-2 dropdown-button-item'>
                <input
                  className='form-check-input ms-2 p-2'
                  type='radio'
                  name='flexRadioDefault2'
                  id='flexRadioDefault24'
                  onChange={() => setSizeOption('xl')}
                />
                <label
                  style={{ cursor: 'pointer', padding: '3px 3px 3px 0' }}
                  className='form-check-label fs-5 w-100'
                  htmlFor='flexRadioDefault24'
                >
                  xl
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-4 container p-0'>
          {renderLightProducts()}
        </div>
      </div>
      <div style={{ paddingBottom: 100 }}>
        <div
          className='pb-4 mb-3'
          style={{
            fontFamily: 'merriweather',
            backgroundColor: '#eee',
            minWidth: '100vw',
            paddingTop: '60px',
          }}
        >
          <div
            className='fw-bold container'
            style={{
              fontFamily: 'merriweather',
              fontSize: '2.4rem',
            }}
          >
            Dark
          </div>
        </div>
        <div
          className='container mb-5 pb-3 p-0 d-flex gap-2'
          style={{ borderBottom: 'solid 1px #d9d9d9' }}
        >
          <button
            className={`dropdown-button-container ${
              !sortdarkOption && !sizedarkOption ? 'd-none' : ''
            }`}
            style={{ backgroundColor: '#d9d9d9' }}
            onClick={handleCleardarkFilters}
          >
            X Clear All
          </button>
          <div className='dropdown'>
            <a
              className='dropdown-button-container dropdown-toggle'
              href='#'
              role='button'
              id='dropdownMenuLinkdark'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              Sort
            </a>

            <div
              className='dropdown-menu p-0 mt-2'
              style={{ width: '250px' }}
              aria-labelledby='dropdownMenuLinkdark'
            >
              <div className='p-2 d-flex align-items-center gap-2 dropdown-button-item'>
                <input
                  className='form-check-input m-0'
                  type='radio'
                  name='flexRadioDefaultdark'
                  id='flexRadioDefault1dark'
                  onChange={() => handledarkSortChange('featured')}
                />
                <label
                  style={{ cursor: 'pointer' }}
                  className='form-check-label fs-5 w-100'
                  htmlFor='flexRadioDefault1dark'
                >
                  Featured
                </label>
              </div>
              <div className='p-2 d-flex align-items-center gap-2 dropdown-button-item'>
                <input
                  className='form-check-input m-0'
                  type='radio'
                  name='flexRadioDefaultdark'
                  id='flexRadioDefault2dark'
                  onChange={() => handledarkSortChange('new')}
                />
                <label
                  style={{ cursor: 'pointer' }}
                  className='form-check-label fs-5 w-100'
                  htmlFor='flexRadioDefault2dark'
                >
                  New
                </label>
              </div>
              <div className='p-2 d-flex align-items-center gap-2 dropdown-button-item'>
                <input
                  className='form-check-input m-0'
                  type='radio'
                  name='flexRadioDefault'
                  dark
                  id='flexRadioDefault3dark'
                  onChange={() => handledarkSortChange('lowToHigh')}
                />
                <label
                  style={{ cursor: 'pointer' }}
                  className='form-check-label fs-5 w-100'
                  htmlFor='flexRadioDefault3dark'
                >
                  Price, low to high
                </label>
              </div>
              <div className='p-2 d-flex align-items-center gap-2 dropdown-button-item'>
                <input
                  className='form-check-input m-0'
                  type='radio'
                  name='flexRadioDefaultdark'
                  id='flexRadioDefault4dark'
                  onChange={() => handledarkSortChange('highToLow')}
                />
                <label
                  style={{ cursor: 'pointer' }}
                  className='form-check-label fs-5 w-100'
                  htmlFor='flexRadioDefault4dark'
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
              id='dropdownMenuLink2dark'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              Availability
            </a>

            <div
              className='dropdown-menu p-0 mt-2'
              aria-labelledby='dropdownMenuLink2dark'
            >
              <div className=' d-flex align-items-center gap-2 dropdown-button-item'>
                <input
                  className='form-check-input p-2 ms-2'
                  type='radio'
                  name='flexRadioDefault2dark'
                  id='flexRadioDefault21dark'
                  onChange={() => setSizedarkOption('s')}
                />
                <label
                  style={{ cursor: 'pointer', padding: '3px 3px 3px 0' }}
                  className='form-check-label fs-5 w-100'
                  htmlFor='flexRadioDefault21dark'
                >
                  s
                </label>
              </div>
              <div className='d-flex align-items-center gap-2 dropdown-button-item'>
                <input
                  className='form-check-input ms-2 p-2'
                  type='radio'
                  name='flexRadioDefault2dark'
                  id='flexRadioDefault22dark'
                  onChange={() => setSizedarkOption('m')}
                />
                <label
                  style={{ cursor: 'pointer', padding: '3px 3px 3px 0' }}
                  className='form-check-label fs-5 w-100'
                  htmlFor='flexRadioDefault22dark'
                >
                  m
                </label>
              </div>
              <div className='d-flex align-items-center gap-2 dropdown-button-item'>
                <input
                  className='form-check-input ms-2 p-2'
                  type='radio'
                  name='flexRadioDefault2dark'
                  id='flexRadioDefault23dark'
                  onChange={() => setSizedarkOption('l')}
                />
                <label
                  style={{ cursor: 'pointer', padding: '3px 3px 3px 0' }}
                  className='form-check-label fs-5 w-100'
                  htmlFor='flexRadioDefault23dark'
                >
                  l
                </label>
              </div>
              <div className='d-flex align-items-center gap-2 dropdown-button-item'>
                <input
                  className='form-check-input ms-2 p-2'
                  type='radio'
                  name='flexRadioDefault2dark'
                  id='flexRadioDefault24dark'
                  onChange={() => setSizedarkOption('xl')}
                />
                <label
                  style={{ cursor: 'pointer', padding: '3px 3px 3px 0' }}
                  className='form-check-label fs-5 w-100'
                  htmlFor='flexRadioDefault24dark'
                >
                  xl
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-4 container p-0'>
          {renderdarkProducts()}
        </div>
      </div>
    </div>
  );
};
export default Themes;
