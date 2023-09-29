import FormInput from '../../components/form-input/form-input';
import { createNewProduct, handleImageUpload  } from '../../utils/firebase.utils';
import { useState, useEffect } from 'react';

const defaultFormFields = {
  name: '',
  price: 0,
  description: '',
  sizes: {
    s: 0,
    m: 0,
    l: 0,
    xl: 0,
  },
  theme: 'light',
  season: 'summer',
  gender: 'M',
  productImage: '', // To store the URL of the uploaded image
  userRatings: [],
  featured: false
};

const NewProductPage = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, price, description, season, theme, gender, productImage, featured } =
    formFields;
  const [productSizes, setProductSizes] = useState(defaultFormFields.sizes);


  const handleChange = (event) => {
    const { name, value } = event.target;
    // Convert the price value to a number using parseFloat
    const parsedValue = name === 'price' ? parseFloat(value) : value;

    setFormFields({ ...formFields, [name]: parsedValue });
  };

  const handleSizeChange = (sizeKey, event) => {
    const { value } = event.target;
    setProductSizes({ ...productSizes, [sizeKey]: parseInt(value) });
  }; 

  useEffect(() => {
    // Update the formFields state whenever productSizes change
    setFormFields({ ...formFields, sizes: { ...productSizes } });
  }, [productSizes]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createNewProduct(formFields);
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      }
      console.log('user creation encoutered an error', err);
    }
  };


  return (
    <div className='mt-5 pt-5' style={{ paddingTop: '300px' }}>
      <h1>New Product</h1>
      <div className='modal-body'>
        {/* MODAL CONTENT ______________________________________________________________ */}
        <form id='AdminProductNewForm' onSubmit={handleSubmit}>
          <FormInput
            label='Name'
            type='text'
            required
            onChange={handleChange}
            name='name'
            value={name}
          />
          <FormInput
            label='Price'
            type='number'
            autoComplete='off'
            required
            onChange={handleChange}
            name='price'
            value={price}
          />
          <FormInput
            label='Description'
            type='text'
            required
            onChange={handleChange}
            name='description'
            value={description}
          />
          <div>
            <label>
              Select Season:
              <select value={season} onChange={handleChange} name='season'>
                <option value='summer'>Summer</option>
                <option value='winter'>Winter</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Select Theme:
              <select value={theme} onChange={handleChange} name='theme'>
                <option value='light'>Light</option>
                <option value='dark'>Dark</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Select Gender:
              <select value={gender} onChange={handleChange} name='gender'>
                <option value='M'>Male</option>
                <option value='F'>Female</option>
              </select>
            </label>
          </div>
          <label>
            Featured: 
            <input type='checkbox' onChange={() => setFormFields({ ...formFields, featured: !featured })} />
          </label>

          <div className='group'>
            {Object.keys(productSizes).map((sizeKey) => (
              <div key={sizeKey} className='mb-3'>
                <label htmlFor={`sizeInput_${sizeKey}`} className='form-label'>
                  Size {sizeKey.toUpperCase()}
                </label>
                <input
                  type='number'
                  className='form-control form-input-control'
                  id={`sizeInput_${sizeKey}`}
                  value={parseInt(productSizes[sizeKey])}
                  onChange={(event) => handleSizeChange(sizeKey, event)}
                />
              </div>
            ))}
          </div>
          <div>
            {/* File input for image upload */}
            <input
              type='file'
              accept='.png'
              id='imageInput'
              onChange={handleImageUpload}
            />
          </div>
          <div>
            {/* Display the uploaded image */}
            {productImage && (
              <div>
                <img
                  src={productImage}
                  alt='Uploaded'
                  style={{ maxWidth: '200px' }}
                />
              </div>
            )}
          </div>
          <button className='btn btn-primary' type='submit'>
            Submit
          </button>
        </form>
        {/* MODAL CONTENT ______________________________________________________________ */}
      </div>
    </div>
  );
};

export default NewProductPage;
