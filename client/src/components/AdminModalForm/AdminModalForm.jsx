const AdminModalForm = ({ product }) => {
  const { id, name, productImage, price, sizes, description,docID } = product;
  const modalId = `exampleModal-${docID}`; // Generate a unique modal ID based on the product ID

  return (
    <div>
      <button
        type='button'
        className='btn btn-outline-secondary edit-button'
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
              <form>
                <div className='mb-3'>
                  <label htmlFor='exampleInputEmail1' className='form-label'>
                    Name
                  </label>
                  <input
                    type='email'
                    className='form-control'
                    id='exampleInputEmail1'
                    aria-describedby='emailHelp'
                  />
                  <div id='emailHelp' className='form-text'>
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className='mb-3'>
                  <label htmlFor='exampleInputPassword1' className='form-label'>
                    Price
                  </label>
                  <input
                    type='password'
                    className='form-control'
                    id='exampleInputPassword1'
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='exampleInputPassword1' className='form-label'>
                    Description
                  </label>
                  <input
                    type='password'
                    className='form-control'
                    id='exampleInputPassword1'
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='exampleInputPassword1' className='form-label'>
                    Sizes
                  </label>
                  <input
                    type='password'
                    className='form-control'
                    id='exampleInputPassword1'
                  />
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
              <button type='button' className='btn btn-primary'>
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
