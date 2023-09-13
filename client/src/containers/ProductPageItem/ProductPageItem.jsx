const ProductPageItem = ({product}) => {

  const { name, productImage, price, size } = product;

  return (
    <div className='m-4 text-center'>
      <img
        style={{ width: '240px' }}
        src={productImage}
        alt='productImage'
      />
      <h4 className='text-capitalize mt-2 mb-1'>{name}</h4>
      <p className='fs-4'>${price}</p>
    </div>
  );
};

export default ProductPageItem;
