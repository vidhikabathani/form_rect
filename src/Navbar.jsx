import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    const login_user = localStorage.getItem('login_user')
    const luser = JSON.parse(login_user)
    let fname=luser.fname
    
    return (
        <div className='container font-mono font-semibold'>
            <div className="space-x-10 p-5">
                <Link to="/home">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/profile">{fname}</Link>
            </div>
        </div>
    )
}

export default Navbar