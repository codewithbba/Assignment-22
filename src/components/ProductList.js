import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productSlice';
import { addToCart } from '../features/cartSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Failed to fetch products!</div>;
  }

  return (
    <div>
      <h1 style={{textAlign:'center'}}>Products</h1>
      <div className="product-list">
        {items.map((product) => (
          <div style={{display:"flex", marginBottom:"40px", border:"3px solid black" }}  key={product.id} className="product-card">
         
            <img 
            src={product.image} width={200} alt={product.title} />
           
            <div style={{paddingLeft:"50px", paddingTop:"30px"}} >
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
