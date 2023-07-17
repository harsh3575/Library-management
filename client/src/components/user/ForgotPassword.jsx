import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../Val';
import axios from 'axios';
import { toast } from 'react-toastify';







export default function ForgotPassword() {
    const History = useNavigate()
    const { user, setUser } = useContext(AppContext)
    const [email, setEmail] = useState("")
    const SendData = async () => {
        try {
            const { data } = await axios.post('/api/generatotp', { email })
            setUser(data.data)
            // let values = {
            //     intro:,
            //     outro: "If you did not forget your password, you can ignore this email.",
            //     name: data.data.name,
            //     email: data.data.email
            // }
            // const values = new FormData()
            // values.append("email", data.data.email)
            // values.append("name", data.data.name)
            // values.append("intro", `
            // Need to reset your password ?
            // Use your secret code!
            // ${data.code}
            // `)
            // values.append("outro", "If you did not forget your password, you can ignore this email.")

            let values = {
                name: data.data.name,
                email: data.data.email,
                intro: `Need to reset your password <br> Use your secret code ! <br> <h3>${data.code}</h3> `,
                outro: "If you did not forget your password, you can ignore this email"
            }

            const respon = axios.post('/api/sendmail', values)
            toast.promise(
                respon,
                {
                    pending: 'Promise is pending',
                    success: 'OTP send in your email',
                    error: 'SomeThing Wrong'
                }, {
                position: "top-center"
            }
            )
            History('/otp')
        } catch (er) {
            toast.error("Email is not exist", {
                position: "top-center"
            })
        }
    }
    return (
        <>
            <div className="max-w-4xl mx-auto mt-24">
                <div className="flex flex-col items-center justify-center  p-4 space-y-4 antialiased text-gray-900 bg-gray-100">
                    <div className="w-full px-8 max-w-lg space-y-6 bg-white rounded-md py-16">
                        <h1 className=" mb-6 text-3xl font-bold text-center">
                            Don't worry
                        </h1>
                        <p className="text-center mx-12">We are here to help you to recover your password. Enter the email address you used
                            when you joined and we'll send you instructions to reset your password.</p>
                        <div className="space-y-6 w-ful">
                            <input onChange={e => {
                                setEmail(e.target.value)
                            }}
                                value={email}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary-100"
                                type="email" name="email" placeholder="Email address" required="" autoComplete='off' />
                            <div>
                                <button onClick={SendData} type="submit"
                                    className="w-full px-4 py-2 font-medium text-center text-white bg-indigo-600 transition-colors duration-200 rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1">
                                    Send
                                </button>
                            </div>
                        </div>
                        <div className="text-sm text-gray-600 items-center flex justify-between">
                            <Link to={'/login'}>
                                <p className="text-gray-800 cursor-pointer hover:text-blue-500 inline-flex items-center ml-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                            clipRule="evenodd" />
                                    </svg>
                                    Back</p>
                            </Link>
                            <Link to='/contact'>
                                <p className="hover:text-blue-500 cursor-pointer">Need help?</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
