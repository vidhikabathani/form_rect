import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import Change from './pages/Change'

function AllRoute() {
    return (
        <div><Routes>
            <Route path="/" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/change" element={<Change />}></Route>
        </Routes></div>
    )
}

export default AllRoute