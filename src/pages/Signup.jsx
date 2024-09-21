import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    const save_data = localStorage.getItem('user')
    const old_data = JSON.parse(save_data)
    const [data, setData] = useState(old_data || [])
    let [user, setUser] = useState({})
    let navigate = useNavigate();

    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [number, setNumber] = useState("")
    const [gender, setGender] = useState("")
    
    const [cities, setCities] = useState([]);
    const [select_city, setSelsect_city] = useState("")
    const [select_county, setSelect_county] = useState("");
    const [select_State, setSelect_State] = useState("");
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
        },
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

    let name_reg = /^[A-Za-z]*$/
    let password_reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!#$%&@"'*+/=?|^_~-]).{6,20}$/
    let email_reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const submit_user = (e) => {
        e.preventDefault();
        if (!fname) {
            document.getElementById("fname_er").innerHTML = "name is required*"
        }
        if (!lname) {
            document.getElementById("lname_er").innerHTML = "name is required*"
        }
        if (!email) {
            document.getElementById("email_er").innerHTML = "email is required*"
        }
        if (!password) {
            document.getElementById("password_er").innerHTML = "password is required*"
        }
        if (!number) {
            document.getElementById("number_er").innerHTML = "number is required*"
        }
        if (!select_State && !select_city) {
            document.getElementById("city_er").innerHTML = "state and city required*"
        }
        if (select_State && !select_city) {
            document.getElementById("city_er").innerHTML = "city is required*"
        }
        if (select_county) {
            document.getElementById("country_er").innerHTML = ""
        }
        if (!select_county) {
            document.getElementById("country_er").innerHTML = "coutry is required*"
        }
        if (select_city) {
            document.getElementById("city_er").innerHTML = ""
        }
        if (!gender) {
            document.getElementById("gender_er").innerHTML = "gender is required*"
        }
        if (gender) {
            document.getElementById("city_er").innerHTML = ""

        }
        if (fname.match(name_reg) && lname.match(name_reg) && password.match(password_reg) && email.match(email_reg) && number.length === 10 && gender && select_city && select_State) {
            user = {
                fname: fname,
                lname: lname,
                email: email,
                password: password,
                number: number,
                country:select_county,
                state: select_State,
                gender: gender,
                city: select_city,
                isLogin: false
            }
            console.log(user);

            if (!data.length) {
                console.log(user);
                setUser(user)
                data.push(user)
                console.log(data);
                localStorage.setItem('user', JSON.stringify(data))
                localStorage.setItem('SignupForm', true)
                alert("Form Submitted!")
                navigate('./login');
            }
            for (let x in old_data) {
                if (old_data[x].email === user.email && old_data[x].number === user.number) {
                    alert("Email and number already registed!")
                }
                else if (old_data[x].email === user.email) {
                    alert("Email already Registed!");
                }
                else if (old_data[x].number === user.number) {
                    alert("number already Registed!");
                }
                else if (!old_data[x].email !== user.email && old_data[x].number !== user.number) {
                    setUser(user)
                    data.push(user)
                    console.log(data);
                    localStorage.setItem('user', JSON.stringify(data))
                    localStorage.setItem('SignupForm', true)
                    alert("Form Submitted!");
                    navigate('./login');
                    break;
                }
            }
        }
    }


    return (
        <div className='font-mono'>
            <div className="container text-center pt-20">
                <div className="mt-10 sm:p-2 p-8 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <p className='text-3xl font-semibold'>Sign Up</p>
                        <div className="sm:flex gap-5">
                            <div className='relative'>
                                <input placeholder='First Name' type='text' name='fname' value={fname} onChange={(e) => setFname(e.target.value)} className='w-full py-2 mb-5 sm:m-0 border-b-2 border-slate-800 focus:outline-none' />
                                {!fname ? <p className='absolute text-sm text-red-500' id='fname_er'></p> : fname.match(name_reg) ? <p className='absolute text-sm text-green-500'>valid name</p> : <p className='absolute text-sm text-red-500'>! invalid name</p>}
                            </div>
                            <div className='relative'>
                                <input placeholder='Last Name' type='text' name='lname' value={lname} onChange={(e) => setLname(e.target.value)} className='w-full py-2 border-b-2 border-slate-800 focus:outline-none' />
                                {!lname ? <p className='absolute text-sm text-red-500' id='lname_er'></p> : lname.match(name_reg) ? <p className='absolute text-sm text-green-500'>valid name</p> : <p className='absolute  text-sm text-red-500'>! invalid name</p>}
                            </div>
                        </div>
                        <div className='relative'>
                            <input placeholder='Email Address' type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full py-2 border-b-2 border-slate-800 focus:outline-none' />
                            {!email ? <p className='absolute text-sm text-red-500' id='email_er'></p> : email.match(email_reg) ? <p className='absolute text-sm text-green-500'>valid address</p> : <p className='absolute text-sm text-red-500'>! invalid address</p>}
                        </div>
                        <div className='relative'>
                            <input placeholder='Password' type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full py-2 border-b-2 border-slate-800 focus:outline-none' />
                            {!password ? <p className='absolute text-sm text-red-500' id='password_er'></p> : password.match(password_reg) ? <p className='absolute text-sm text-green-500'>valid password</p> : <p className='absolute text-sm text-red-500'>! invalid password pattern</p>}
                        </div>
                        <div className='relative'>
                            <input placeholder='Number' type='number' name='number' value={number} onChange={(e) => setNumber(e.target.value)} className='w-full py-2 border-b-2 border-slate-800 focus:outline-none' />
                            {!number ? <p className='absolute text-sm text-red-500' id='number_er'></p> : number.length === 10 ? <p className='absolute text-sm text-green-500'>valid number</p> : <p className='absolute text-sm text-red-500'>! Enter 10 Digits of Number</p>}
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
                        <div className="flex gap-5 relative">
                            <div className="flex w-1/2 items-center">
                            <label htmlFor="state">State: </label>
                            <select id="state" value={select_State} className='w-full py-2 focus:outline-none' onChange={handleStateChange} disabled={!select_county}>
                                <option value="" hidden></option>
                                {states.map((state) => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>
                            </div>
                            <div className="w-1/2 flex items-center">
                            <label htmlFor="city">City: </label>
                            <select id="city" disabled={!select_State} className='w-full py-2 focus:outline-none' onChange={handlecity}>
                                <option value="" hidden></option>
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
                            {<span className='absolute -bottom-5 text-sm text-red-500' id='gender_er'></span>}
                        </div>
                        <button onClick={submit_user} className='bg-slate-800 text-white px-10 py-3'>Sign Up</button><br />
                        <button><Link to='/login'>Login</Link></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup