import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import App_useReducer from './App_useReducer';
import App_useState from './App_useState';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    {/* 성능 최적화 테스트 */}
    {/* <App /> */}
    {/* <App_useState /> */}
    <App_useReducer />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
