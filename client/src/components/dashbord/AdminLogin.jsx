import React, { useContext } from 'react'
import { useFormik } from "formik"
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../../Val'
import Cookies from 'universal-cookie'


export default function AdminLogin() {
    const cookie = new Cookies()
    const { setCookies } = useContext(AppContext)
    const History = useNavigate()
    const { getFieldProps, handleSubmit } = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: value => {
            const data = axios.post('/api/dashbord/login', { ...value })
                .then((val) => {
                    let { data } = val
                    const Result = axios.get('/api/dashbord/verify', {
                        headers: {
                            'Authorization': 'Bearer ' + data.token
                        }
                    }).then(() => {
                        cookie.set('token', data.token, {
                            expires: new Date(3600 * 1000)
                        })
                        toast.success("User verfy Succefully",
                            {
                                position: "top-center"
                            })
                        History("panel")
                    }).catch((err) => {
                        console.log(err);
                        toast.error("Authentication Faild !", {
                            position: "top-center"
                        })
                    })
                })
                .catch((err) => {
                    let { response } = err
                    toast.error(response.data, {
                        position: "top-center"
                    })
                })
        }
    }
    )
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                        </div>
                        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                            <div className="max-w-md mx-auto">
                                <div>
                                    <h1 className="text-2xl font-semibold mx-10">Login Form Admin</h1>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                        <div className="relative">
                                            <input autoComplete="off" id="username" name="username" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Admin Username " {...getFieldProps('username')} />
                                            <label htmlFor="text" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Admin Username </label>
                                        </div>
                                        <div className="relative">
                                            <input autoComplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" {...getFieldProps('password')} />
                                            <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                        </div>
                                        <div className="relative  text-center ">
                                            <button className="bg-blue-500 text-white rounded-md px-2 py-1 ">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <Outlet />
        </>
    )
}
