import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCHHKUpZqCEkIMUYim5uTiJqZsSCvgDvig",
  authDomain: "reactblog-b6033.firebaseapp.com",
  projectId: "reactblog-b6033",
  storageBucket: "reactblog-b6033.appspot.com",
  messagingSenderId: "405408825556",
  appId: "1:405408825556:web:97cb038d1a8d0bb256fb41",
  measurementId: "G-VHZS9E6DSW",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
