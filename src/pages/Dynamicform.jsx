import React, { useState } from "react";

function Dynamicform() {
    let saveddata = localStorage.getItem('user');
    const all_users = JSON.parse(saveddata)||[];
    const [forms, setForms] = useState([
        { id: all_users.length, name: "", email: "", password: "", number: "" }
    ]);
    const [errors, setErrors] = useState({});

    let email_reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let password_reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!#$%&@"'*+/=?|^_~-]).{6,20}$/;
    const [user, setUser] = useState(all_users || []);

    const inputChange = (id, e) => {
        const { name, value } = e.target;
        let setData = forms.map((form) =>
            form.id === id ? { ...form, [name]: value } : form
        );
        setForms(setData);
    };

    const user_data = (e) => {
        e.preventDefault();
        let isValid = true;
        let newErrors = {};

        forms.forEach((form, index) => {
            if (!form.name || !form.name.match(/^[A-Za-z]+$/)) {
                newErrors[`name${index}`] = "name is required*";
                isValid = false;
            }
            if (!form.email || !form.email.match(email_reg)) {
                newErrors[`email${index}`] = "invalid email format.";
                isValid = false;
            }
            if (!form.password || !form.password.match(password_reg)) {
                newErrors[`password${index}`] = "invalid password pattern";
                isValid = false;
            }
            if (!form.number || form.number.length !== 10) {
                newErrors[`number${index}`] = "number must be exactly 10 digits.";
                isValid = false;
            }
            
            if (all_users) {
                all_users.forEach((user) => {
                    if(form.id===user.id){
                        form.id=form.id+1
                    }
                    if (user.number === form.number) {
                        newErrors[`number${index}`] = "number already registered!";
                        isValid = false;
                    }
                    if (user.email === form.email) {
                        newErrors[`email${index}`] = "email already registered!";
                        isValid = false;
                    }
                });
            }
        });

        setErrors(newErrors);

        if (isValid) {
            if (!all_users) {
                setUser([...user, ...forms]);
                localStorage.setItem('user', JSON.stringify([...user, ...forms]));
            } else {
                let updatedUsers = [...all_users, ...forms];
                setUser(updatedUsers);
                localStorage.setItem('user', JSON.stringify(updatedUsers));
            }
            window.location.reload();
        }
    };

    const addForm = () => {
        const newForm = { id: all_users.length + forms.length, name: "", email: "", password: "", number: "" };
        setForms([...forms, newForm]);
    };

    const deleteForm = (id) => {
        setForms(forms.filter((form) => form.id !== id));
    };

    return (
        <div className="font-mono text-center my-20">
            <h1 className="text-2xl font-semibold mb-8">Signup</h1>
            <button onClick={addForm} className="bg-slate-800 text-white px-4 py-2">+</button>
            {forms.map((form, index) => (
                <div key={form.id}>
                    <div className="lg:w-1/4 sm:w-1/2 w-full p-7 sm:p-0 space-y-6 mx-auto mb-10">
                        <div className="flex justify-between">
                            <h2>Form</h2>
                            {/* {form.id === 1 ? (
                                <button onClick={addForm} className="bg-slate-800 text-white px-4 py-2">+</button>
                            ) : (
                                <button onClick={() => deleteForm(form.id)} className="bg-slate-800 text-white px-4 py-2">-</button>
                            )} */}
                            <button onClick={() => deleteForm(form.id)} className="bg-slate-800 text-white px-4 py-2">-</button>
                        </div>

                        <div className="relative">
                            <input type="text" name="name" className="w-full py-2 sm:m-0 border-b-2 border-slate-800 focus:outline-none" placeholder="Enter Username" value={form.name} onChange={(e) => inputChange(form.id, e)} />
                            {errors[`name${index}`] && <p className="absolute text-sm text-red-500">{errors[`name${index}`]}</p>}
                        </div>

                        <div className="relative">
                            <input type="email" name="email" className="w-full py-2 sm:m-0 border-b-2 border-slate-800 focus:outline-none" placeholder="Enter Email" value={form.email} onChange={(e) => inputChange(form.id, e)} />
                            {errors[`email${index}`] && <p className="absolute text-sm text-red-500">{errors[`email${index}`]}</p>}
                        </div>

                        <div>
                            <input type="password" name="password" className="w-full py-2 sm:m-0 border-b-2 border-slate-800 focus:outline-none" placeholder="Enter Password" value={form.password} onChange={(e) => inputChange(form.id, e)} />
                            {errors[`password${index}`] && <p className="absolute text-sm text-red-500">{errors[`password${index}`]}</p>}
                        </div>

                        <div>
                            <input type="number" name="number" className="w-full py-2 sm:m-0 border-b-2 border-slate-800 focus:outline-none" placeholder="Enter Number" value={form.number} onChange={(e) => inputChange(form.id, e)} />
                            {errors[`number${index}`] && <p className="absolute text-sm text-red-500">{errors[`number${index}`]}</p>}
                        </div>
                    </div>
                </div>
            ))}

            <button className="bg-slate-800 text-white px-10 py-3" onClick={user_data}>Sign Up</button>
        </div>
    );
}

export default Dynamicform;
