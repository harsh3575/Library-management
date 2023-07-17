import React, { useContext } from 'react'


import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { loginValid } from '../schema/validation'
import { LoginApi } from '../helper'
import { toast } from 'react-toastify'
import { AppContext } from '../../Val'
import Navbar from './Navbar'
import Foorter from './Foorter'


export default function Login() {
    const History = useNavigate()
    const { setCookies, setchk } = useContext(AppContext)
    const { getFieldProps, handleSubmit, errors } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginValid,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values) => {
            const data = LoginApi({ ...values })
            data.then(() => {
                toast.promise(data, {
                    pending: "Promise is pending",
                    success: "Login Successfully",
                    error: "error"
                }, {
                    position: toast.POSITION.TOP_CENTER,

                })
                setCookies("cheack", true)

            }).catch((err) => {
                toast.error("Invalid Value", {
                    position: toast.POSITION.TOP_CENTER
                })
            })
            setchk(true)
            History('/')
        }
    })

    const { email, password } = errors
    return (
        <>

            <form onSubmit={handleSubmit}>
                <div className='mx-auto flex min-h-full w-full items-center justify-center my-56'>
                    <section className="flex w-[30rem] flex-col space-y-10 max-sm:mx-16">
                        <div className="text-center text-4xl font-medium">Log In</div>

                        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                            <input {...getFieldProps("email")} type="text" placeholder="Email" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
                            {(email) ? <span className='text-red-500'>{email}</span> : null}
                        </div>

                        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                            <input {...getFieldProps("password")} type="password" placeholder="Password" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
                            {(password) ? <span className='text-red-500'>{password}</span> : null}
                        </div>

                        <button type='submit' className="transform rounded-sm text-white bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400">LOG IN</button>

                        <Link className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300" to={'/forgot'}>FORGOT PASSWORD?</Link>

                        <p className="text-center text-lg ">
                            No account?
                            <Link to={'/register'} className="font-medium text-indigo-500 underline-offset-4 hover:underline">Create One</Link>
                        </p>
                    </section>
                </div>
            </form>

        </>
    )
}
