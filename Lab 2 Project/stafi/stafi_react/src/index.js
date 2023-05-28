import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { RouterProvider } from 'react-router-dom';
import router from './router'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
  </React.StrictMode>
);

