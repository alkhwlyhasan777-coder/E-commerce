import BtmHeader from "./components/header/BtmHeader";
import TopHeader from "./components/header/TopHeader";
import Home from "./pages/home/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/product/ProductDetails";
import CartItem from "./components/cart/CartItem";
import HearttCart from "./components/heartCard/HearttCart";

import { AnimatePresence } from "framer-motion";
import CategoryPage from "./components/cart/categoryPage/CategoryPage";
import SearchPage from "./pages/search/searchPage";

function App() {
  return (
    <>
      <header>
        <TopHeader />
        <BtmHeader />
      </header>

      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartItem />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/heartCart" element={<HearttCart />} />
          <Route path="/category/:category" element={<CategoryPage/>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;