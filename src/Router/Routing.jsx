import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Home from '../pages/Home';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import Forgot from '../pages/Forgot';
import ResetPass from '../pages/ResetPass';
import ProductsPage from '../pages/ProductsPage';
import Order from '../pages/Admin/Order';
import Customers from '../pages/Admin/Customers';
import AddProduct from '../pages/Admin/AddProduct';
import Setting from '../pages/Admin/Setting';


const Routing = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/adminDashboard' element={<AdminDashboard />} />
                    <Route path='/orders' element={<Order />} />
                    <Route path='/customers' element={<Customers />} />
                    <Route path='/add-product' element={<AddProduct />} />
                    <Route path='/setting' element={<Setting />} />

                    <Route path='/' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/forgot' element={<Forgot />} />
                    <Route path='/reset-password/:token' element={<ResetPass />} />
                    <Route path='/home' element={<ProductsPage />} />
                </Routes>

            </BrowserRouter>
        </>
    )
}

export default Routing