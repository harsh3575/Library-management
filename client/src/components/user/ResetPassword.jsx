import React, { useContext, useState } from 'react'
import { AppContext } from '../../Val'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ResetPassword() {
    const History = useNavigate()
    const { user } = useContext(AppContext)
    const [values, setValues] = useState({
        password: "",
        confirm: ""
    })
    const [mess, setMess] = useState(false)
    const ResetPwd = async () => {
        try {
            if (values.password === values.confirm) {
                setMess(false)
                const result = {
                    email: user.email,
                    password: values.password
                }
                const { data } = await axios.put('/api/resetpassword', result)
                toast.success(data.message, {
                    position: "top-center"
                })
                History("/login")
            }
            else {
                setMess(true)
            }
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong")
        }
    }
    return (
        <>
            <section className="grid  place-content-center bg-transparent text-slate-300" style={{ height: "92.3vh" }}>
                <div className="mb-10 text-center text-black">
                    <h1 className="text-3xl font-bold font-sans tracking-widest">Reset Password</h1>
                </div>
                <div className="flex flex-col items-center justify-center space-y-6">
                    <input type="password" id="password" name="password" placeholder="Password" className="w-80 text-black transition-all  appearance-none rounded-full border-0 shadow-md  p-2 px-4 focus:bg-gray-100 focus:ring-2 "
                        onChange={(e) => setValues(prev => {
                            return { ...prev, password: e.target.value }
                        })}
                        value={values.password}
                    />
                    <div>
                        <input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm Password" className="w-80 appearance-none text-black transition-all rounded-full border-0 shadow-md p-2 px-4 focus:bg-gray-100 focus:ring-2 "
                            onChange={(e) => setValues(prev => {
                                return { ...prev, confirm: e.target.value }
                            })}
                            value={values.confirm}
                        />
                        <p id="validation" className="text-center  italic text-sm"></p>
                    </div>
                    <button id="showPw" onClick={ResetPwd} className="rounded-full bg-blue-500 p-2 px-4 text-white hover:bg-white hover:text-black hover:shadow-md"><span id="showHide">Save</span> Password</button>
                </div>
                {!mess ? null : <>
                    <p className='text-center mt-5 text-gray-500'>Password Must be same</p>
                </>
                }
            </section>
        </>
    )
}
