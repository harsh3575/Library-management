import React, { useContext } from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component"
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../Val'
import { toast } from 'react-toastify'
export default function Card2({ _id, bookName, bookImg, bookAuthor }) {
    const { Cookies, setchk, chk } = useContext(AppContext)
    const History = useNavigate()
    const check = () => {
        if (Cookies.cheack == null) {
            toast.warning("Please Login !", {
                position: 'top-center'
            })
            History('/login')
        } else {
            History(`/readbook/${_id}`)
        }
    }
    return (
        <>
            <div className="relative  flex-shrink-0 m-6 relative overflow-hidden bg-white rounded-lg max-w-xs shadow-lg transition-all hover:scale-105">
                <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={{ transform: "scale(1.5)", opacity: " 0.1" }}>
                    <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="gray" />
                    <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="gray" />
                </svg>
                <div className="relative pt-10 px-10 flex items-center justify-center">
                    <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={{ background: "radial-gradient(black, transparent 60%)", transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)", opacity: "0.2" }}></div>
                    <LazyLoadImage src={`http://localhost:3000/${bookImg}`} className='relative w-40 rounded-xl' />
                </div>
                <div className="relative overflow-auto text-white px-6 pb-6 mt-6">
                    <span className="block opacity-75 -mb-1 text-black">{bookAuthor}</span>
                    <div className="flex justify-between">
                        <span className="block font-semibold text-xl text-black">{bookName}</span>
                    </div>
                </div>
                <div className="absolute  bottom-1 left-44 mt-5 bg-gray-300 rounded-full  text-black text-xs font-bold px-3 py-2 leading-none flex items-center" onClick={check}><Link>Read</Link></div>
            </div>
        </>
    )
}



{/* */ }
