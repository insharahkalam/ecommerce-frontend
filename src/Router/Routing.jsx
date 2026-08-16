import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';

import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Forgot from '../pages/Forgot';
import ResetPass from '../pages/ResetPass';

import PublicLayout from '../pages/customer/PublicLayout';
import Home from '../pages/customer/Home';
import ProductDetail from '../pages/customer/ProductDetail';
import Cart from '../pages/customer/Cart';
import Checkout from '../pages/customer/Checkout';
import MyOrders from '../pages/customer/MyOrders';

import AdminLayout from '../pages/Admin/AdminLayout';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import Order from '../pages/Admin/Order';
import Customers from '../pages/Admin/Customers';
import AddProduct from '../pages/Admin/AddProduct';
import Setting from '../pages/Admin/Setting';
import Shop from '../pages/customer/Shop';
import About from '../pages/customer/About';
import Contact from '../pages/customer/Contact';
import NotificationsPage from '../pages/Admin/Notifications';
import AdminRoute from '../components/AdminRoute';

const Routing = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <Routes>

                        <Route element={<PublicLayout />}>
                            <Route path='/home' element={<Home />} />
                            <Route path='/product/:id' element={<ProductDetail />} />
                            <Route path='/cart' element={<Cart />} />
                            <Route path='/checkout' element={<Checkout />} />
                            <Route path='/my-orders' element={<MyOrders />} />
                            <Route path="/shop" element={<Shop />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                        </Route>

                        {/* Auth routes — no header/layout needed */}
                        <Route path='/' element={<Signup />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/forgot' element={<Forgot />} />
                        <Route path='/reset-password/:token' element={<ResetPass />} />

                        {/* Admin routes */}
                        <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
                            <Route path='/adminDashboard' element={<AdminDashboard />} />
                            <Route path='/orders' element={<Order />} />
                            <Route path='/customers' element={<Customers />} />
                            <Route path='/add-product' element={<AddProduct />} />
                            <Route path='/setting' element={<Setting />} />
                            <Route path='/notifications' element={<NotificationsPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    )
}

export default Routing