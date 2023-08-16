const ProductPageItem = ({product}) => {

  const { name, productImage, price, size } = product;

  return (
    <div className='m-4 text-center'>
      <h3 className='text-capitalize'>{name}</h3>
      <img
        style={{ width: '240px' }}
        src={`/src/assets/images/products/${productImage}`}
        alt='productImage'
      />
      <p className='fs-4 mt-2 mb-2'>${price}</p>
      <p className='fs-5 text-uppercase'>{size}</p>
    </div>
  );
};

export default ProductPageItem;
