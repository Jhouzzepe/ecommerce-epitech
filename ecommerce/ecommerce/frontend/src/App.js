import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./components/View/Home";
import Product from "./components/View/Product";
import Cart from "./components/View/Cart";
import ProductList from "./components/ProductList";
import Categories from "./components/View/Categories";
import Profile from "./components/View/Profile";
import Register from "./components/AuthComponents/Register";
import Logout from "./components/AuthComponents/Logout";
import Footer from "./components/MainComponents/Footer";
import Navbar from './components/MainComponents/Navbar';
import CategoryProduct from './components/View/CategoryProduct';
import ProtectedRoute from "./components/AuthComponents/ProtectedRoute";
import Login from './components/AuthComponents/Login';
import Terms from './components/View/Terms';
import ProductDetail from './components/ProductComponents/ProductDetail';
import { ProductProvider } from './contexts/ProductContext';
import { CartItemProvider } from "./contexts/CartItemContext";
import CapyJumpView from "./components/View/CapyJumpView";
import { TokenProvider } from './contexts/UserTokenContext';
import { AuthProvider } from './contexts/AuthContext';
import { DeliveryMethodProvider } from './contexts/DeliveryMethodContext';
import { PrestatairesProvider } from './contexts/PrestatairesContext';

const App = () => {
  return (
    <TokenProvider>
      <AuthProvider>
        <ProductProvider>
          <CartItemProvider>
            <DeliveryMethodProvider>
              <PrestatairesProvider>
                <Router>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/product/:productId" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/category-products/:categoryId" element={<CategoryProduct />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/CapyJump" element={<CapyJumpView />} />
                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/logout" element={<Logout />} />
                  </Routes>
                  <Footer />
                </Router>
              </PrestatairesProvider>
            </DeliveryMethodProvider>
          </CartItemProvider>
        </ProductProvider>
      </AuthProvider>
    </TokenProvider>
  );
};

export default App;
