import React from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { signupValid } from '../schema/validation'
import { RegisterApi } from '../helper'
import { toast } from 'react-toastify'
import Navbar from './Navbar'
import Foorter from './Foorter'

export default function Register() {
    const History = useNavigate()
    const { errors, getFieldProps, handleSubmit } = useFormik({
        initialValues: {
            name: "",
            phone: "",
            email: "",
            password: ""
        },
        validationSchema: signupValid,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values) => {
            const data = RegisterApi({ ...values })
            data.then(() => {
                toast.promise(data, {
                    pending: "Promise is pending",
                    success: "Register Successfully",
                    error: "error"
                }, {
                    position: toast.POSITION.TOP_CENTER,

                })
            }).catch((err) => {
                toast.error("Something Wrong", {
                    position: toast.POSITION.TOP_CENTER
                })
            })
            History("/login")
        }
    })
    const { name, phone, email, password } = errors
    return (
        <>

            <form onSubmit={handleSubmit}>
                <div className='mx-auto flex min-h-full w-full items-center justify-center my-44'>
                    <section className="flex w-[30rem] flex-col space-y-10 max-sm:mx-16">


                        <div className="text-center text-4xl font-medium">Register</div>

                        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                            <input type="text" placeholder="Name" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" {...getFieldProps('name')} />
                            {(name) ? <span className='text-red-500'>{name}</span> : null}
                        </div>
                        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                            <input type="text" maxLength={10} placeholder="Phone" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" {...getFieldProps('phone')} />
                            {(phone) ? <span className='text-red-500'>{phone}</span> : null}
                        </div>
                        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                            <input type="text" placeholder="Email" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" {...getFieldProps('email')} />
                            {(email) ? <span className='text-red-500'>{email}</span> : null}
                        </div>

                        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                            <input type="password" placeholder="Password" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" {...getFieldProps('password')} />
                            {(password) ? <span className='text-red-500'>{password}</span> : null}
                        </div>

                        <button type='submit' className="transform rounded-sm text-white bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400">LOG IN</button>



                        <p className="text-center text-lg ">
                            Already have account ?&nbsp;
                            <Link to={'/login'} className="font-medium text-indigo-500 underline-offset-4 hover:underline">Login</Link>
                        </p>
                    </section>
                </div>
            </form>

        </>
    )
}
