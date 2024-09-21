import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const user_data = localStorage.getItem('user')
    const users = JSON.parse(user_data)
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let navigate = useNavigate()
    let luser = {}

    let password_reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!#$%&@"'*+/=?|^_~-]).{6,20}$/
    let email_reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const login_user = (e) => {
        e.preventDefault();
        if (!email) {
            document.getElementById("email_er").innerHTML = "email is required*"
        }
        if (!password) {
            document.getElementById("password_er").innerHTML = "password is required*"
        }
        if (password.match(password_reg) && email.match(email_reg)) {
            luser = {
                email: email,
                password: password
            }

            for (let x of users) {
                if (x.email === luser.email && x.password !== luser.password) {
                    alert("incorrect password!")
                }
                if (x.email === luser.email && x.password === luser.password) {
                    luser = {
                        email: email,
                        password: password,
                        fname: x.fname,
                        lname: x.lname,
                        number: x.number,
                        country:x.country,
                        state: x.state,
                        gender: x.gender,
                        city: x.city,
                        isLogin: true
                    }
                    Object.assign(x, luser)
                    localStorage.setItem('user', JSON.stringify([...users]))
                    localStorage.setItem('login_user', JSON.stringify(luser))
                    navigate('/home')
                    alert("login success")
                }
            }
        }
    }

    return (
        <div className='font-mono'>
            <div className="container text-center pt-20">
                <div className="mt-10 sm:p-2 p-8 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <p className='text-3xl font-semibold'>Login</p>
                        <div className='relative'>
                            <input placeholder='Email Address' type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full py-2 border-b-2 border-slate-800 focus:outline-none' />
                            {!email ? <p className='absolute text-sm text-red-500' id='email_er'></p> : email.match(email_reg) ? <p className='absolute text-sm text-red-500'></p> : <p className='absolute text-sm text-red-500'>! Enter valid Email Address</p>}
                        </div>
                        <div className='relative'>
                            <input placeholder='Password' type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full py-2 border-b-2 border-slate-800 focus:outline-none' />
                            {!password ? <p className='absolute text-sm text-red-500' id='password_er'></p> : password.match(password_reg) ? <p className='absolute text-sm text-red-500'></p> : <p className='absolute text-sm text-red-500'>! Enter valid Password Pattern</p>}
                        </div>
                        <button onClick={login_user} className='bg-slate-800 text-white px-10 py-3'>Login</button><br />
                        <button><Link to='/'>Sign Up</Link></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login