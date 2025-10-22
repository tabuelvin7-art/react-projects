import { Routes, Route } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { HomePage } from "./pages/HomePage.jsx";
import { CheckoutPage } from "./pages/CheckoutPage.jsx";
import { OrderPage } from "./pages/OrdersPage.jsx";
import { TrackingPage } from "./pages/TrackingPage.jsx";
import "./App.css";
import { use } from "react";

function App() {
const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("/api/cart-items").then((response) => {
      setCart(response.data);
    });
    },[]);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="/orders" element={<OrderPage />} />
      <Route path="/tracking" element={<TrackingPage />} />
    </Routes>
  );
}

export default App;
