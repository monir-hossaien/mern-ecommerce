import {StrictMode, useEffect} from 'react'
import { createRoot } from 'react-dom/client'
// bootstrap css file
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "bootstrap-icons/font/bootstrap-icons.css";
//custom css file
import "../src/assets/css/main.css"
import "../src/assets/css/animate.min.css"
import 'react-loading-skeleton/dist/skeleton.css'
import 'bootstrap/dist/js/bootstrap.js';
import '../src/assets/css/style.css'
import '../src/assets/css/responsive.css'
import App from './App.jsx'
import {Toaster} from "react-hot-toast";



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
      <Toaster position="bottom-right" />
  </StrictMode>,
)
