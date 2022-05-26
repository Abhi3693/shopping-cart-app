import React, { useReducer } from 'react';
import { connect } from 'react-redux';

import Main from './Main';
import Cart from './Cart';
import Sidebar from './Sidebar';
import data from '../data/data.json';

function App(props) {
  const [selectedSizes, dispatch] = useReducer(reducer, []);

  // Filter products by Size
  const handleFilterBySize = (size) => dispatch({ type: 'filterBySize', size });

  return (
    <>
      <Sidebar
        handleFilterBySize={handleFilterBySize}
        selectedSizes={selectedSizes}
        {...data}
      />
      <Main {...data} selectedSizes={selectedSizes} />
      <Cart {...data} />
    </>
  );
}

function mapStateToProps(state) {
  return { usersCart: state };
}

export default connect(mapStateToProps)(App);

// Reducer function for useReducer
function reducer(state, action) {
  if (action.type === 'filterBySize') {
    let index = state.indexOf(action.size);
    let newSelecetedSizes = [];
    if (index < 0) {
      newSelecetedSizes = state.concat(action.size);
    } else {
      newSelecetedSizes = state.filter((size, i) => i !== index);
    }
    state = newSelecetedSizes;
  }
  return state;
}
