import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store"; // Kendi store'unu import et
import Header from "./components/header";

const ProductApp = React.lazy(() => import("product_app/ProductApp"));
const CheckoutApp = React.lazy(() => import("checkout_app/CheckoutApp"));

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("auth_token") || null);
  const navigate = useNavigate();

  // URL'deki token'ı al ve localStorage'a kaydet
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");

    if (urlToken) {
      localStorage.setItem("auth_token", urlToken);
      setToken(urlToken);

      // Query param'ı temizle
      window.history.replaceState({}, document.title, "/");

      // Ana sayfaya yönlendir
      navigate("/");
    }
  }, [navigate]);

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
              <Route path="/checkout" element={<CheckoutApp />} />
            </Routes>
          </Suspense>
        </main>
      </BrowserRouter>
    </Provider>
  );
}
