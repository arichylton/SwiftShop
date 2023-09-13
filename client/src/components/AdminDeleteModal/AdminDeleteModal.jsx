import { removeProduct } from '../../utils/firebase.utils';

const AdminDeleteModal = ({ modalId }) => {
  console.log(modalId)
  return (
    <div className='edit-button'>
      <p>
        <a
          className='btn btn-outline-danger'
          data-bs-toggle='collapse'
          href='#collapseExample'
          role='button'
          aria-expanded='false'
          aria-controls='collapseExample'
        >
          Remove Item
        </a>
      </p>
      <div className='collapse' id='collapseExample'>
        <div className='card card-body d-flex align-items-centered'>
          Are you sure you want to delete?
          <div className='d-flex align-items-centered justify-content-centered'>
            <button onClick={async () => await removeProduct(modalId)}>
              Yes
            </button>
            <button
              href='#collapseExample'
              data-bs-toggle='collapse'
              aria-expanded='false'
              aria-controls='collapseExample'
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminDeleteModal;
