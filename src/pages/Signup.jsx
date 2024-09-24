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

    const [select_city, setSelsect_city] = useState("")
    const [select_country, setSelect_country] = useState("");
    const [select_State, setSelect_State] = useState("");
    const [city_data, setCity_data] = useState([]);
    const [state_data, setState_data] = useState([])

    const Countries = [
        { id: 1, c_name: "India" },
        { id: 2, c_name: "USA" },
        { id: 3, c_name: "Canada" }
    ]
    const States = [
        { id: 1, s_name: "Gujarat", c_id: 1 },
        { id: 2, s_name: "Maharashtra", c_id: 1 },
        { id: 3, s_name: "Rajasthan", c_id: 1 },

        { id: 4, s_name: "California", c_id: 2 },
        { id: 5, s_name: "Texas", c_id: 2 },
        { id: 6, s_name: "Florida", c_id: 2 },

        { id: 7, s_name: "Ontario", c_id: 3 },
        { id: 8, s_name: "Quebec", c_id: 3 },
        { id: 9, s_name: "Alberta", c_id: 3 }
    ]
    const Cities = [
        { id: 1, city_name: "Ahmedabad", s_id: 1 },
        { id: 2, city_name: "Surat", s_id: 1 },
        { id: 3, city_name: "Vadodra", s_id: 1 },
        { id: 4, city_name: "Rajkot", s_id: 1 },

        { id: 5, city_name: "Mumbai", s_id: 2 },
        { id: 6, city_name: "Nagpur", s_id: 2 },
        { id: 7, city_name: "Nasik", s_id: 2 },
        { id: 8, city_name: "Pune", s_id: 2 },

        { id: 9, city_name: "Udaipur", s_id: 3 },
        { id: 10, city_name: "Ajmer", s_id: 3 },
        { id: 11, city_name: "Bikaner", s_id: 3 },
        { id: 12, city_name: "JodhPur", s_id: 3 },

        { id: 13, city_name: "Los Angeles", s_id: 4 },
        { id: 14, city_name: "San Francisco", s_id: 4 },
        { id: 15, city_name: "San Diego", s_id: 4 },
        { id: 16, city_name: "Fresno", s_id: 4 },

        { id: 17, city_name: "Houston", s_id: 5 },
        { id: 18, city_name: "Dallas", s_id: 5 },
        { id: 19, city_name: "Austin", s_id: 5 },
        { id: 20, city_name: "Lubbock", s_id: 5 },

        { id: 21, city_name: "Miami", s_id: 6 },
        { id: 22, city_name: "Orlando", s_id: 6 },
        { id: 23, city_name: "Tampa", s_id: 6 },
        { id: 24, city_name: "Destin", s_id: 6 },

        { id: 25, city_name: "Toronto", s_id: 7 },
        { id: 26, city_name: "Ottawa", s_id: 7 },
        { id: 27, city_name: "Mississauga", s_id: 7 },
        { id: 28, city_name: "Oshawa", s_id: 7 },

        { id: 29, city_name: "Montreal", s_id: 8 },
        { id: 30, city_name: "Quebec City", s_id: 8 },
        { id: 31, city_name: "Laval", s_id: 8 },
        { id: 32, city_name: "Chambly", s_id: 8 },

        { id: 33, city_name: "Toronto", s_id: 9 },
        { id: 34, city_name: "Edmonton", s_id: 9 },
        { id: 35, city_name: "Red Deer", s_id: 9 },
        { id: 36, city_name: "Taber", s_id: 9 },
    ]

    const handleCountryChange = (e) => {
        let country=e.target.value
        setSelect_country(country)
        let country_id=Countries.find((e)=>e.c_name===country)
        let filter_state=States.filter((e)=>e.c_id===country_id.id)
        setState_data(filter_state);
    };

    const handleStateChange = (e) => {
        let state=e.target.value
        setSelect_State(state)
        let state_id=States.find((e)=>e.s_name===state)
        let filter_city=Cities.filter((e)=>e.s_id===state_id.id)
        setCity_data(filter_city)
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
        if (select_country) {
            document.getElementById("country_er").innerHTML = ""
        }
        if (!select_country) {
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
                country: select_country,
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
                            <select id="country" value={select_country} className='w-1/2 py-2 focus:outline-none' onChange={handleCountryChange}>
                                <option value="" hidden></option>
                                {Countries.map((Country) => (
                                    <option key={Country.id} value={Country.c_name}>
                                        {Country.c_name}
                                    </option>
                                ))}
                            </select>
                            {<p className='absolute top-7 text-sm text-red-500' id='country_er'></p>}
                        </div>
                        <div className="flex gap-5 relative">
                            <div className="flex w-1/2 items-center">
                                <label htmlFor="state">State: </label>
                                <select id="state" value={select_State} className='w-full py-2 focus:outline-none' onChange={handleStateChange} disabled={!select_country}>
                                    <option value="" hidden></option>
                                    {state_data.map((state) => (
                                        <option key={state.id} value={state.s_name}>
                                            {state.s_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-1/2 flex items-center">
                                <label htmlFor="city">City: </label>
                                <select id="city" disabled={!select_State} className='w-full py-2 focus:outline-none' onChange={handlecity}>
                                    <option value="" hidden></option>
                                    {city_data.map((city) => (
                                        <option key={city.id} value={city.city_name}>
                                            {city.city_name}
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