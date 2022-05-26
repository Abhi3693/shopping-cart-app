import { createStore } from 'redux';

function reducer(state, action) {
  let updatedCartItems = [];
  switch (action.type) {
    case 'add':
      let isPresent = state.findIndex(
        (product) => product.id === action.product.id
      );
      if (isPresent >= 0) {
        updatedCartItems = state.map((elm) => {
          if (elm.id === action.product.id) {
            elm.quantity = elm.quantity + 1;
            return elm;
          }
          return elm;
        });
        state = updatedCartItems;
      } else {
        state = state.concat({ ...action.product, quantity: 1 });
      }
      break;
    case 'delete':
      updatedCartItems = state.filter((p) => {
        return p.id !== action.id;
      });
      state = updatedCartItems;
      break;
    case 'increment':
      updatedCartItems = state.map((p) => {
        if (p.id === action.id) {
          p.quantity = p.quantity + 1;
          return p;
        }
        return p;
      });
      state = updatedCartItems;
      break;
    case 'decerement':
      updatedCartItems = state.map((p) => {
        if (p.id === action.id) {
          if (p.quantity === 1) {
            p.quantity = 1;
          } else {
            p.quantity = p.quantity - 1;
          }
          return p;
        }
        return p;
      });
      state = updatedCartItems;
      break;
    default:
      break;
  }
  localStorage.setItem('carts', JSON.stringify(state));
  return [...state];
}

let store = createStore(
  reducer,
  JSON.parse(localStorage.getItem('carts')) || []
);

export default store;
