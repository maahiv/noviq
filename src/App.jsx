import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { dbGet, firebaseConfigured } from './api/firebaseRest';
import { categories as seedCategories, products as seedProducts } from './api/seed';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import { Login, Signup, ForgotPassword } from './pages/Auth';
import { Cart, Checkout, Orders, Profile } from './pages/Commerce';

function AppInner(){
  const [products,setProducts]=useState(seedProducts);
  useEffect(()=>{ if(firebaseConfigured()){dbGet('products').then(data=>{ if(data){setProducts(Object.entries(data).map(([id,p])=>({id,...p})));} }).catch(()=>{}); } },[]);
  return <Routes>
    <Route path="/login" element={<Login/>}/><Route path="/signup" element={<Signup/>}/><Route path="/forgot-password" element={<ForgotPassword/>}/>
    <Route path="*" element={<Layout><Routes>
      <Route path="/" element={<Home products={products}/>}/>
      <Route path="/products" element={<Products products={products}/>}/>
      <Route path="/products/:id" element={<ProductDetails products={products}/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/checkout" element={<ProtectedRoute><Checkout/></ProtectedRoute>}/>
      <Route path="/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
      <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
    </Routes></Layout>}/>
  </Routes>
}

export default function App(){ return <BrowserRouter><AuthProvider><CartProvider><AppInner/></CartProvider></AuthProvider></BrowserRouter> }
