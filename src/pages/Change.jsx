import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Change() {
    const login_user = localStorage.getItem('login_user')
    const luser = JSON.parse(login_user)
    const _users = localStorage.getItem('user')
    const all_users = JSON.parse(_users);
    // console.log(all_users);
    
    let navigate = useNavigate()
    let password_reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!#$%&@"'*+/=?|^_~-]).{6,20}$/

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const check_password = () => {
        if(!password){
            document.getElementById("password_er").innerHTML = "please enter password*"
        }
        else{

            if (luser.password === password) {
                document.getElementById('old_password').setAttribute("hidden", "hidden")
                document.getElementById('new_password').removeAttribute('hidden')
            }
            else {
                alert("incorrect password!")
            }
        }
    }

    const change_password = () => {
        if (!newPassword) {
            document.getElementById('password_er').innerHTML = "! please enter password"
        }
        if (newPassword.match(password_reg)) {
            let user = {
                email: luser.email,
                password: newPassword,
                fname: luser.fname,
                lname: luser.lname,
                number: luser.number,
                state: luser.state,
                gender: luser.gender,
                city: luser.city,
                isLogin: true
            }
            for (let x of all_users) {

                if (x.isLogin == true) {
                    user = {
                        fname: x.fname,
                        lname: x.lname,
                        email: x.email,
                        number: x.number,
                        password: newPassword,
                        state: x.state,
                        gender: x.gender,
                        city: x.city,
                        isLogin: true
                    }
                    Object.assign(x, user)
                    localStorage.setItem('user', JSON.stringify([...all_users]))
                    break;
                }
            }
            localStorage.setItem('login_user', JSON.stringify(user))
            alert("Password updated!");
            window.location.reload();
        }
    }

    return (
        <div className='font-mono'>
            <div className="container">
                <div className="mt-10 sm:p-2 p-8 sm:mx-auto sm:w-full sm:max-w-sm">
                    <p className='text-2xl font-semibold mb-7'>Change password</p>
                    <div id="old_password" className='space-y-6 relative'>
                        <input type="password" className='w-full py-2 border-b-2 border-slate-800 focus:outline-none' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter current password' />
                            {!password ? <p className='absolute top-5 text-sm text-red-500' id='password_er'></p> : password.match(password_reg) ? <p className='absolute text-sm text-green-500'>valid password</p> : <p className='absolute text-sm text-red-500'>! Enter valid Password Pattern</p>}
                        <button className='bg-slate-800 text-white px-10 py-3 mt-7' onClick={check_password}>next</button>
                    </div>
                    <div id="new_password" hidden>
                        <div className='relative'>
                            <input type="password" className='w-full py-2 border-b-2 border-slate-800 focus:outline-none' placeholder='Enter New password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            {!newPassword ? <p className='absolute text-sm text-red-500' id='password_er'></p> : newPassword.match(password_reg) ? <p className='absolute text-sm text-green-500'>valid password</p> : <p className='absolute text-sm text-red-500'>! Enter valid Password Pattern</p>}
                        </div>
                        <button className='bg-slate-800 text-white px-10 py-3 mt-7' onClick={change_password}>change password</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Change