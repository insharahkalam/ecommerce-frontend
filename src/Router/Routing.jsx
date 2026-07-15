import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Home from '../pages/Home';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import Forgot from '../pages/Forgot';
import ResetPass from '../pages/ResetPass';
import ProductsPage from '../pages/ProductsPage';


const Routing = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    {/* <Route path='/home' element={<Home />} /> */}
                    <Route path='/admin' element={<AdminDashboard />} />
                    <Route path='/forgot' element={<Forgot />} />
                    <Route path='/reset-password/:token' element={<ResetPass />} />
                    <Route path='/home' element={<ProductsPage />} />
                </Routes>

            </BrowserRouter>
        </>
    )
}

export default Routing