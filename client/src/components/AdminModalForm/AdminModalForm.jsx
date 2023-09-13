import { useEffect, useState } from 'react';
import FormInput from '../form-input/form-input';
import '../form-input/form-input.styles.scss';
import { updateProduct } from '../../utils/firebase.utils';
import AdminDeleteModal from '../AdminDeleteModal/AdminDeleteModal';

const AdminModalForm = ({ product, toggleChangeMade }) => {
  const [formFields, setFormFields] = useState(product);
  const { name, price, description } = formFields;
  const { docID, sizes } = product;
  const [productSizes, setProductSizes] = useState(sizes);
  const modalId = `exampleModal-${docID}`;

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
    <div>
        <button
          type='button'
          className='btn btn-outline-secondary edit-button me-3'
          data-bs-toggle='modal'
          data-bs-target={`#${modalId}`} // Use the unique modal ID
        >
          Edit
        </button>
      <div
        className='modal fade'
        id={modalId} // Use the unique modal ID
        tabIndex='-1'
        aria-labelledby={`${modalId}-label`} // Use the unique modal label ID
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5
                className='modal-title text-capitalize'
                id={`${modalId}-label`} // Use the unique modal label ID
              >
                {name}
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              {/* MODAL CONTENT ______________________________________________________________ */}
              <form id={`updateProductForm${modalId}`} onSubmit={handleSubmit}>
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
                      <label
                        htmlFor={`sizeInput_${sizeKey}`}
                        className='form-label'
                      >
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
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
              <button
                type='submit'
                form={`updateProductForm${modalId}`}
                data-bs-dismiss='modal'
                data-bs-target={`#${modalId}`}
                className='btn btn-primary'
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminModalForm;
