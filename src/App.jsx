import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

import Login from "./Login/Login";
import Applayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Components from "./pages/Components";
import Animation from "./pages/Animation";
import Calculator from "./pages/Calculator";
import Todos from "./pages/Todos";
import Carts from "./pages/Carts";
import Products from "./pages/Products";
import ForwardToHome from "./pages/ForwardToHome";

import { fetProducts } from "./data/products";

function App() {
  const [token, setToken] = useState('');
  const [products, setProduct] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => setProduct(fetProducts()), []);

  return (
    <BrowserRouter basename="/csi205/">
      <Routes>
        {!token ? (
          <Route path="login" element={<Login setToken={setToken} />} />
        ) : (
          <>
            <Route
              element={
                <Applayout
                  products={products}
                  carts={carts}
                  token={token}
                  setToken={setToken}
                />
              }
            >
              <Route path="home" element={<Home />} />
              <Route path="components" element={<Components />} />
              <Route path="animation" element={<Animation />} />
              <Route path="calculator" element={<Calculator />} />
              <Route path="todos" element={<Todos />} />
              <Route path="carts" element={<Carts carts={carts} setCarts={setCarts} />} />
              <Route path="products" element={<Products products={products} carts={carts} setCarts={setCarts} />} />
              <Route path="*" element={<ForwardToHome />} />
            </Route>
            <Route path="login" element={<Navigate to="/home" replace />} />
          </>
        )}

        <Route path="*" element={<Navigate to={token ? "/home" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
