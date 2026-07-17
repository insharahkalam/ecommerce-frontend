import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Forgot from '../pages/Forgot';
import ResetPass from '../pages/ResetPass';
import ProductsPage from '../pages/ProductsPage';

import AdminLayout from '../pages/Admin/AdminLayout';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import Order from '../pages/Admin/Order';
import Customers from '../pages/Admin/Customers';
import AddProduct from '../pages/Admin/AddProduct';
import Setting from '../pages/Admin/Setting';

const Routing = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Layout route — no path of its own. It renders Sidebar + Topbar
                        once and shares orders/products/customers state to whichever
                        admin page matches below, via <Outlet context={...} />. */}
                    <Route element={<AdminLayout />}>
                        <Route path='/adminDashboard' element={<AdminDashboard />} />
                        <Route path='/orders' element={<Order />} />
                        <Route path='/customers' element={<Customers />} />
                        <Route path='/add-product' element={<AddProduct />} />
                        <Route path='/setting' element={<Setting />} />
                    </Route>

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
