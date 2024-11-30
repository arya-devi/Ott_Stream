import react from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './router';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <react>
        <RouterProvider router = {router } />
  </react>
);

reportWebVitals();