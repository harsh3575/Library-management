import React, { useEffect, useContext, useState } from 'react'



import Home from './components/user/Home'
import About from './components/user/About'
import Contact from './components/user/Contact'
import Servics from './components/user/Servics'
import Login from './components/user/Login'
import Register from './components/user/Register'
import Error404 from './components/user/Error404'
import Books from './components/user/Books'
import AdminLogin from './components/dashbord/AdminLogin'
import Loader from './Loader'
import { Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext, AppPro } from './Val'
import Admin from './components/dashbord/Admin'
import RemoveBooks from './components/dashbord/RemoveBooks'
import Navbar from './components/user/Navbar'
import Readbook from './components/user/readbook'
import Foorter from './components/user/Foorter'
import ForgotPassword from './components/user/ForgotPassword'
import Otp from './components/user/Otp'
import ResetPassword from './components/user/ResetPassword'
import Updatebook from './components/dashbord/Updatebook'



export default function App() {
    const [load, setload] = useState(true)
    useEffect(() => {

        setInterval(() => {
            setload(false)
        }, 800)
    }, [])
    return (
        <>
            {(load) ?
                <Loader />
                : <>
                    <div className='ani'>
                        <AppPro>
                            <Routes>
                                <Route path='/' element={<Navbar />}>
                                    <Route index element={<Home />} />
                                    <Route path='about' element={<About />} />
                                    <Route path='service' element={<Servics />} />
                                    <Route path='contact' element={<Contact />} />
                                    <Route path='books' element={<Books />} />
                                    <Route path='login' element={<Login />} />
                                    <Route path='register' element={<Register />} />
                                    <Route path='readbook/:id' element={<Readbook />} />
                                    <Route path='forgot' element={<ForgotPassword />} />
                                    <Route path='otp' element={<Otp />} />
                                    <Route path='resetpassword' element={<ResetPassword />} />
                                    <Route path='*' element={<Error404 />} />
                                </Route>
                                <Route path='dashbord' >
                                    <Route index element={<AdminLogin />} />
                                    <Route path='panel' element={<Admin />} />
                                    <Route path='removeBook' element={<RemoveBooks />} />
                                    <Route path='updatebook' element={<Updatebook />} />
                                    <Route path='*' element={<h2>Error</h2>} />
                                </Route>
                            </Routes>
                            <ToastContainer />

                        </AppPro>
                    </div>
                </>
            }
        </>
    )
}
