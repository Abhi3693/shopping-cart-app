import React, { useState } from 'react';
import { connect } from 'react-redux';

function Cart(props) {
  const [isOpen, setIsOpen] = useState(false);

  //  Open cart
  const open = () => setIsOpen(true);

  // Close cart
  const close = () => setIsOpen(false);

  //  Increment Product in cart
  const incrementProduct = (item) =>
    props.dispatch({ type: 'increment', id: item.id });

  //  Decrement Product in cart
  const decrementProduct = (item) =>
    props.dispatch({ type: 'decerement', id: item.id });

  //  Remove Product from cart
  const removeProduct = (item) =>
    props.dispatch({ type: 'delete', id: item.id });

  // Total Quantity of Products
  let totalQuantity = props.usersCart.reduce((prev, curr) => {
    prev = prev + curr.quantity;
    return prev;
  }, 0);

  // Total Amount of All Products
  let totalAmount = props.usersCart.reduce((prev, curr) => {
    prev = prev + curr.price * curr.quantity;
    return Number(prev.toFixed(2));
  }, 0);

  if (!isOpen) {
    return <ClosedCart open={open} totalQuantity={totalQuantity} />;
  }

  return (
    <div className='open-cart-holder flex'>
      <div onClick={close} className='btn close-cart-btn'>
        X
      </div>
      <div className='back-black'>
        <div className='cart-info relative'>
          <div className='cart-heading-holder relative justify-center align-center flex gap-2 padd-2'>
            <span className='open-btn'>
              <div className='relative closed-cart-holder'>
                <img
                  className='closed-cart-img'
                  src='/static/bag-icon.png'
                  alt=''
                />
                <span className='product-count flex justify-center align-center absolute'>
                  {totalQuantity}
                </span>
              </div>
            </span>
            <h2 className='cart-heading'>Cart</h2>
          </div>
          <ul className='cart-list-holder'>
            {props.usersCart.map((item) => {
              return (
                <li
                  key={item.id}
                  className='single-cart-item align-center gap-1  padd-1 flex space-btw'
                >
                  <div className='flex gap-1 align-center'>
                    <img
                      className='cart-product-img'
                      src={`/static/products/${item.sku}_2.jpg`}
                      alt=''
                    />
                    <div className='product-info flex column gap-1'>
                      <h2 className='font-white cart-poroduct-title'>
                        {item.title}
                      </h2>
                      <h3 className='font-white cart-product-quantity'>
                        Quantity: {item.quantity}
                      </h3>
                    </div>
                  </div>
                  <div className='flex column align-center margin-right-1'>
                    <button
                      onClick={() => removeProduct(item)}
                      className='btn font-white remove-item'
                    >
                      X
                    </button>
                    <h3 className='product-price-cart font-white'>
                      {item.currencyFormat} {item.price}
                    </h3>
                    <div className='flex'>
                      <button
                        onClick={() => decrementProduct(item)}
                        className='btn quantity remove-item font-white'
                      >
                        -
                      </button>
                      <button
                        onClick={() => incrementProduct(item)}
                        className='btn quantity remove-item font-white'
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className='cart-total-box flex column padd-2'>
            <div className='sub-total-box flex space-btw padd-1'>
              <span className='font-white sub-total'>SUBTOTAL</span>
              <span className='font-white count-sub-total'>
                $ {totalAmount}
              </span>
            </div>
            <button
              onClick={() => alert(`Total Amount: ${totalAmount}`)}
              className='btn font-white checkout flex justify-center'
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { usersCart: state };
}

export default connect(mapStateToProps)(Cart);

function ClosedCart(props) {
  return (
    <div className='btn closed-cart' onClick={props.open}>
      <span onClick={props.open} className='open-btn'>
        <div className='relative closed-cart-holder'>
          <img className='closed-cart-img' src='/static/bag-icon.png' alt='' />
          <span className='product-count flex justify-center align-center absolute'>
            {props.totalQuantity}
          </span>
        </div>
      </span>
    </div>
  );
}
