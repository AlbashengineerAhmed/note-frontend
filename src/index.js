import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/APP/App';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "jquery/dist/jquery.min.js"
import "popper.js/dist/umd/popper.min.js"
import "@fortawesome/fontawesome-free/css/all.min.css"
import { HashRouter } from "react-router-dom"  // Change BrowserRouter to HashRouter
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
