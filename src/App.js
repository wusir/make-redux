import React, { Component } from 'react';
import PropTypes from 'prop-types'
import logo from './logo.svg';
import './App.css';
import Header from './Header'
import Content from './Content'


//store构建器
function createStore(reducer){
  let state = null
  var getState = () => state;
  var listeners = [];
  var subscribe = (renderState) => listeners.push(renderState);
  var dispatch = (action) => {
      state = reducer(state, action);
      listeners.forEach((listener) =>{
          listener();
      });
  }
  //初始化state，相当于{null, {}}
  dispatch({});
  return {
      getState,
      dispatch,
      subscribe,
  };
}

//主题reducer，内部初始化state以及根据state和action计算新的state
function themeReducer(state, action){
  if(!state){
    return {
      themeColor: 'red',
    };
  }

  switch(action.type){
    case 'CHANGE_THEME':
      return {
        ...state,
        themeColor: action.themeColor
      };
    default:
      return state;
  }
}

//创建store
const store = createStore(themeReducer);

class App extends Component {
  static childContextTypes = {
    store: PropTypes.object
  }

  getChildContext () {
    return { store }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Content />
      </div>
    );
  }
}

export default App;
