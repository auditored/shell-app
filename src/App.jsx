import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store"; // Kendi store'unu import et
import Header from "./components/header";

const AuthApp = React.lazy(() => import("auth_app/AuthApp"));
const ProductApp = React.lazy(() => import("product_app/ProductApp"));
const CheckoutApp = React.lazy(() => import("checkout_app/CheckoutApp"));


export default function App() {
  const [token, setToken] = useState(localStorage.getItem("auth_token") || null);

  useEffect(() => {
    const handler = () => setToken(localStorage.getItem("auth_token"));
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header token={token} />
        <main style={{ paddingTop: 90 }}>
          <Suspense fallback={<div>Loading remote...</div>}>
            <Routes>
              <Route path="/" element={<ProductApp />} />
              <Route path="/auth" element={<AuthApp />} />
              <Route path="/checkout" element={<CheckoutApp />} />
            </Routes>
          </Suspense>
        </main>

        {token && <RedirectToHome />}
      </BrowserRouter>
    </Provider>
  );
}

function RedirectToHome() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, [navigate]);
  return null;
}