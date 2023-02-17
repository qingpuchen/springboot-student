import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import StuList from "./components/stuList";
// import {BrowserRouter, Route} from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.css';
import 'element-theme-default';
// import {Button} from 'element-react';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <div className='container'>
      {/* <Route path="/"  exact component={StuList} /> */}
      <StuList />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
