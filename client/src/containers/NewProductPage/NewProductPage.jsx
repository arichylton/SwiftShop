import FormInput from '../../components/form-input/form-input';
import { useState, useEffect } from 'react';

const defaultFormFields = {
  name: '',
  price: '',
  description: '',
  productSizes: {
    s: 0,
    m: 0,
    l: 0,
    xl: 0,
  },
};

const NewProductPage = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, price, description } = formFields;
  const [productSizes, setProductSizes] = useState(sizes);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
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
      await updateProduct(formFields, docID);
      toggleChangeMade();
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      }
      console.log('user creation encoutered an error', err);
    }
  };

  return (
    <div className='mt-5 pt-5' style={{ paddingTop: '300px' }}>
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
          <div className=''>
            <FormInput
              label='Description'
              type='text'
              required
              onChange={handleChange}
              name='description'
              value={description}
            />
          </div>

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
        </form>
        {/* MODAL CONTENT ______________________________________________________________ */}
      </div>
    </div>
  );
};
export default NewProductPage;
