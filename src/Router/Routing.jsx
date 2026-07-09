import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from '../pages/Signup';
import Login from '../pages/Login';


const Routing = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                </Routes>

            </BrowserRouter>
        </>
    )
}

export default Routing