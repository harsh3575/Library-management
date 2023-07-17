import React, { useRef, useState } from 'react'
import { AppContext } from '../../Val'
import axios from 'axios'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Otp() {
    const History = useNavigate()
    const { user } = useContext(AppContext)
    const [number, setNumber] = useState({
        num1: "",
        num2: "",
        num3: "",
        num4: ""
    })
    const num1 = useRef()
    const num2 = useRef()
    const num3 = useRef()
    const num4 = useRef()
    const HandleValue = (e) => {
        let { value, name } = e.target
        if (value.length != 2) {
            setNumber(prev => {
                return { ...prev, [name]: value }
            })
        }
    }
    const SubmitCode = async () => {
        try {

            let otp = number.num1 + number.num2 + number.num3 + number.num4
            otp = parseInt(otp)
            const { data } = await axios.get(`/api/verifyotp/${otp}`)
            toast.success(data.message, {
                position: "top-right"
            })
            History("/resetpassword")
        } catch (er) {
            console.log(er);
        }
    }
    return (
        <>
            <div className=" relative flex  flex-col justify-center  bg-transparent  py-12" style={{ height: '90vh' }}>
                <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                        <div className="flex flex-col items-center justify-center text-center space-y-2">
                            <div className="font-semibold text-3xl">
                                <p>Email Verification</p>
                            </div>
                            <div className="flex flex-row text-sm font-medium text-gray-400">
                                <p>We have sent a code to your email <b>{user.email}</b></p>
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-col space-y-16">
                                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                    <div className="w-16 h-16 ">
                                        <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="number" name="num1" id="num1"
                                            onChange={(e) => {
                                                HandleValue(e)
                                                if (e.target.value)
                                                    num2.current.focus()
                                            }}
                                            value={number.num1}
                                            ref={num1}
                                        />
                                    </div>
                                    <div className="w-16 h-16 ">
                                        <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="number" name="num2" id=""
                                            onChange={(e) => {
                                                HandleValue(e)
                                                if (e.target.value)
                                                    num3.current.focus()
                                            }}
                                            value={number.num2}
                                            ref={num2}

                                        />
                                    </div>
                                    <div className="w-16 h-16 ">
                                        <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="number" name="num3" id=""
                                            onChange={(e) => {
                                                HandleValue(e)
                                                if (e.target.value)
                                                    num4.current.focus()
                                            }}
                                            value={number.num3}
                                            ref={num3}

                                        />
                                    </div>
                                    <div className="w-16 h-16 ">
                                        <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="number" name="num4" id=""
                                            onChange={(e) => {
                                                HandleValue(e)
                                            }}
                                            value={number.num4}
                                            ref={num4}

                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <button onClick={SubmitCode} className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-500 border-none text-white text-xl shadow-sm">
                                            Verify Account
                                        </button>
                                    </div>

                                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                        <p>Didn't recieve code?</p> <Link className="flex flex-row items-center text-blue-600" rel="noopener noreferrer" to="/forgot">Resend</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
