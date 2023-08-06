import { useDispatch } from "react-redux";
import { addCartItem } from "../../store/cartItems/cartItemsSlice";

const Product = ({ product }) => {
  const { name, productImage, productCategories, price, size } = product;
  const dispatch = useDispatch();

  const addToCart = (e) => {
    e.preventDefault();
    dispatch(addCartItem(product));
  }
  
  return (
    <div className='m-4 text-center'>
      <h3 className='text-capitalize'>{name}</h3>
      <img
        style={{ width: '240px' }}
        src={`/src/assets/images/products/${productImage}`}
        alt='productImage'
      />
      <p className="fs-4 mt-2 mb-2">${price}</p>
      <p className="fs-5 text-uppercase">{size}</p>
      <button className="btn btn-primary ps-4 pe-4" onClick={addToCart}>Add To Cart</button>
    </div>
  );
};

export default Product;
