import { useEffect } from 'react';
import AdminModalForm from '../../components/AdminModalForm/AdminModalForm';
import AdminDeleteModal from '../../components/AdminDeleteModal/AdminDeleteModal';
import './ProductAdminItem.styles.scss';
const ProductAdminItem = ({ product, toggleChangeMade }) => {
  const { name, productImage, price, sizes, description, featured, docID  } = product;
  useEffect(() => {}, [product]);

  return (
    <div
      className='mt-4 text-center d-flex edit-button-container'
      style={{ minWidth: '700px', height: 200 }}
    >
      <img src={productImage} alt='productImage' />
      <div className='d-flex flex-column align-items-start ps-4'>
        <h4 className='text-capitalize fw-bold'>{name}</h4>
        <p className='fs-4 mb-2'>${price}</p>
        {featured ? (
          <h6 className='fw-bold text-warning bg-dark p-2'>FEATURED</h6>
        ) : null}
        <p className='text-start'>{description}</p>

        <div className='d-flex'>
          <AdminModalForm
            product={product}
            toggleChangeMade={toggleChangeMade}
          />
          <AdminDeleteModal modalId={docID} />
        </div>
      </div>
      <ul
        className='list-group list-group-flush fs-5 flex-fill ps-5 ms-5'
        style={{ minWidth: '30%' }}
      >
        <li className='list-group-item d-flex justify-content-between align-items-center'>
          <p className='mb-0'>S</p> <p>{sizes['s']}</p>
        </li>
        <li className='list-group-item d-flex justify-content-between align-items-center'>
          <p className='mb-0'>M</p> <p>{sizes['m']}</p>
        </li>
        <li className='list-group-item d-flex justify-content-between align-items-center'>
          <p className='mb-0'>L</p> <p>{sizes['l']}</p>
        </li>
        <li className='list-group-item d-flex justify-content-between align-items-center'>
          <p className='mb-0'>XL</p> <p>{sizes['xl']}</p>
        </li>
      </ul>
    </div>
  );
};

export default ProductAdminItem;
