import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Profile() {
    let name_reg = /^[A-Za-z]*$/
    let email_reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const _users = localStorage.getItem('user')
    const all_users = JSON.parse(_users);

    const login_user = localStorage.getItem('login_user')
    const luser = JSON.parse(login_user)

    const [fname, setFname] = useState(luser.fname || "")
    const [lname, setLname] = useState(luser.lname || "")
    const [email, setEmail] = useState(luser.email || "")
    const [number, setNumber] = useState(luser.number || "")
    const [gender, setGender] = useState(luser.gender || "")
    const [select_city, setSelsect_city] = useState(luser.city || "")
    const [select_county, setSelect_county] = useState(luser.country || "");
    const [select_State, setSelect_State] = useState(luser.state || "");
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([])

    const dropdown_data = {
        India: {
            Gujarat: ["Ahmedabad", "Surat", "Vadodra", "Rajkot"],
            Maharashtra: ["Mumbai", "Nagpur", "Nasik", "Pune"],
            Rajasthan: ["Udaipur", "Ajmer", "Bikaner", "JodhPur"],
        },
        USA: {
            California: ["Los Angeles", "San Francisco", "San Diego", "Fresno"],
            Texas: ["Houston", "Dallas", "Austin", "Lubbock"],
            Florida: ["Miami", "Orlando", "Tampa", "Destin"],
        },
        Canada: {
            Ontario: ["Toronto", "Ottawa", "Mississauga", "Oshawa"],
            Quebec: ["Montreal", "Quebec City", "Laval", "Chambly"],
            Alberta: ["Calgary", "Edmonton", "Red Deer", "Taber"],
        }
    };

    const handleCountryChange = (e) => {
        const country = e.target.value;
        setSelect_county(country);
        setStates(Object.keys(dropdown_data[country] || {}));
        setSelect_State("");
        setCities([]);
    };

    const handleStateChange = (e) => {
        const state = e.target.value;
        setSelect_State(state);
        setCities(dropdown_data[select_county][state] || []);
    };

    const handlecity = (e) => {
        const city = e.target.value;
        setSelsect_city(city);
    }

    let user = {}
    let navigate = useNavigate()

    const logout = (e) => {
        e.preventDefault()
        for (let x of all_users) {
            if (x.email === luser.email) {
                user = {
                    email: x.email,
                    password: x.password,
                    fname: x.fname,
                    lname: x.lname,
                    number: x.number,
                    state: x.state,
                    gender: x.gender,
                    city: x.city,
                    country: x.country,
                    isLogin: false
                }
                Object.assign(x, user)
                localStorage.setItem('user', JSON.stringify([...all_users]))
                navigate('/login')
                localStorage.removeItem('login_user')
                window.location.reload();
                break;
            }
        }
    }

    const update = (e) => {
        e.preventDefault();
        let update_data = {
            fname, lname, email, number, select_State, select_city, select_county, gender
        }
        if (!fname) {
            document.getElementById("fname_er").innerHTML = "name is required*"
        }
        if (!lname) {
            document.getElementById("lname_er").innerHTML = "name is required*"
        }
        if (!email) {
            document.getElementById("email_er").innerHTML = "email is required*"
        }
        if (!number) {
            document.getElementById("number_er").innerHTML = "number is required*"
        }
        if (fname.match(name_reg) && lname.match(name_reg) && email.match(email_reg) && number.length > 9 && select_county && select_State && select_city) {
            update_data = {
                fname: fname,
                lname: lname,
                email: email,
                number: number,
                country: select_county,
                state: select_State,
                gender: gender,
                city: select_city,
                isLogin: true
            }
            for (let x of all_users) {
                if (x.isLogin == true) {
                    update_data = {
                        fname: fname,
                        lname: lname,
                        email: email,
                        number: number,
                        country: select_county,
                        password: x.password,
                        state: select_State,
                        gender: gender,
                        city: select_city,
                        isLogin: true
                    }
                    Object.assign(x, update_data)
                    localStorage.setItem('user', JSON.stringify([...all_users]))
                    localStorage.setItem('login_user', JSON.stringify(update_data))
                    document.getElementById('btn').removeAttribute("hidden")
                    document.getElementById('edit_form').setAttribute("hidden", "hidden")
                    document.getElementById('user_data').removeAttribute("hidden")
                    alert("profile updated!")
                    navigate('/profile')
                    break;
                }
            }
        }
    }

    const edit_profile = () => {
        setStates(Object.keys(dropdown_data[select_county] || {}));
        setCities(dropdown_data[select_county][select_State] || []);
        document.getElementById('user_data').setAttribute("hidden", "hidden")
        document.getElementById('edit_form').removeAttribute("hidden", "hidden")
        document.getElementById('btn').setAttribute("hidden", "hidden")
        luser.gender === "male" ? document.getElementById('male').setAttribute("checked", "checked") : document.getElementById('female').setAttribute("checked", "checked")
    }

    const _change = () => {
        navigate('/change')
    }

    return (
        <div className='font-mono'>
            <div className="container">
                <div className="mt-10 sm:p-2 p-8 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div id="user_data" className='space-y-6'>
                        <h4 className='text-2xl font-semibold mb-7'>User Profile</h4>
                        <p>Username : {luser.fname} {luser.lname}</p>
                        <p>Email : {luser.email}</p>
                        <p>Number : {luser.number}</p>
                        <p>from {luser.city} , {luser.state} , {luser.country}.</p>
                        <p>Gender : {luser.gender}</p>
                    </div>


                    <div id="btn">
                        <button className='bg-slate-800 text-white px-10 py-3 mt-5 me-7' onClick={edit_profile}>Edit</button>
                        <button className='bg-slate-800 text-white px-10 py-3 mt-7' onClick={logout}>Logout</button><br />
                        <button className='bg-slate-800 text-white px-10 py-3 mt-7' onClick={_change}>change password</button>
                    </div>

                    {/* EDIT PROFILE PAGE  */}
                    <div id='edit_form' hidden>
                        <form action="" className='space-y-6'>
                            <h4 className='text-2xl font-semibold mb-7'>Edit Profile</h4>
                            <div className='relative'>
                                <span>Firstname: </span>
                                <input type="text" className='inline mb-5 sm:m-0 focus:outline-none' value={fname} onChange={(e) => setFname(e.target.value)} />
                                {!fname ? <p className='absolute text-sm text-red-500' id='fname_er'></p> : !fname.match(name_reg) ? <p className='absolute text-sm text-red-500'>! invalid name</p> : <p className='absolute text-sm text-red-500'></p>}
                            </div>
                            <div className='relative'>
                                <span>Lastname: </span>
                                <input type="text" className='mb-5 sm:m-0 focus:outline-none' value={lname} onChange={(e) => setLname(e.target.value)} />
                                {!lname ? <p className='absolute text-sm text-red-500' id='fname_er'></p> : !lname.match(name_reg) ? <p className='absolute text-sm text-red-500'>! invalid name</p> : <p className='absolute text-sm text-red-500'></p>}
                            </div>
                            <div className='relative'>
                                <span>Email : </span>
                                <input type="email" className='mb-5 sm:m-0 focus:outline-none' value={email} onChange={(e) => setEmail(e.target.value)} />
                                {!email ? <p className='absolute text-sm text-red-500' id='email_er'></p> : email.match(email_reg) ? <p className='absolute text-sm text-green-500'></p> : <p className='absolute text-sm text-red-500'>! invalid address</p>}
                            </div>
                            <div className='relative'>
                                <span>Number : </span>
                                <input type="number" className='mb-5 sm:m-0 focus:outline-none' value={number} onChange={(e) => setNumber(e.target.value)} />
                                {!number ? <p className='absolute text-sm text-red-500' id='number_er'></p> : number.length === 10 ? <p className='absolute text-sm text-green-500'></p> : <p className='absolute text-sm text-red-500'>! Enter 10 Digits of Number</p>}
                            </div>
                            <div className='flex items-center relative'>
                                <label htmlFor="country" className='me-5'>Country: </label>
                                <select id="country" value={select_county} className='w-1/2 py-2 focus:outline-none' onChange={handleCountryChange}>
                                    <option value="" hidden></option>
                                    {Object.keys(dropdown_data).map((country) => (
                                        <option key={country} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                                {<p className='absolute top-7 text-sm text-red-500' id='country_er'></p>}
                            </div>
                            <div className="flex gap-5 items-center relative">
                                <label htmlFor="state">State: </label>
                                <div>
                                    <select id="state" value={select_State} onChange={handleStateChange} className='w-full focus:outline-none py-2'>
                                        <option value="" hidden></option>
                                        {states.map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <label htmlFor="city" className="relative">City: </label>
                                <div>
                                    <select id="city" disabled={!select_State} value={select_city} onChange={handlecity} className='w-full focus:outline-none py-2'>
                                        <option hidden></option>
                                        {cities.map((city) => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {<p className='absolute -bottom-3 text-sm text-red-500' id='city_er'></p>}
                            </div>
                            <div className="flex gap-7 relative">
                                <label htmlFor="gender" id="gender"> Gender :</label>
                                <label htmlFor="male"><input type="radio" id="male" name="gender" value="male" onChange={(e) => setGender(e.target.value)} />Male</label>
                                <label htmlFor="female"><input type="radio" id="female" name="gender" value="female" onChange={(e) => setGender(e.target.value)} />Female</label>
                                <span id="gender_er" className="absolute top-5 text-sm text-red-500"></span>
                            </div>
                            <button className='bg-slate-800 text-white px-10 py-3' onClick={update}>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile

