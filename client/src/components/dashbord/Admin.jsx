import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'

import { AddBook } from '../helper'
import { toast } from 'react-toastify'

export default function Admin() {
    const [val, setVal] = useState("Upload Image")
    const [data, setData] = useState({
        bookName: "",
        bookCategory: "",
        bookTitle: "",
        bookContent: "",
        bookAuthor: ""
    })
    const cheack = useRef(0)
    // const { handleSubmit, getFieldProps } = useFormik({
    //     initialValues: {
    //         bookName: "",
    //         bookCategory: "",
    //         bookTitle: "",
    //         bookContent: "",
    //     },
    //     validateOnBlur: false,
    //     validateOnChange: false,
    //     onSubmit: value => {
    //         value.bookImg = cheack.current.files[0]
    //         console.log(value.bookImg);
    //         const data = AddBook(value)
    //     }
    // })
    const submitData = () => {
        const formData = new FormData()
        formData.append('bookName', data.bookName)
        formData.append('bookCategory', data.bookCategory)
        formData.append('bookAuthor', data.bookAuthor)
        formData.append('bookTitle', data.bookTitle)
        formData.append('bookContent', data.bookContent)
        formData.append('bookImg', cheack.current.files[0])

        const data2 = AddBook(formData)

        data2
            .then(() => {
                setData({
                    bookName: "",
                    bookCategory: "",
                    bookTitle: "",
                    bookContent: "",
                    bookAuthor: ""
                })
                setVal("Upload Image")
                toast.promise(data2, {
                    pending: "Promise is pending",
                    success: "Data Saved",
                    error: "error"
                }, {
                    position: toast.POSITION.TOP_CENTER,

                })
            }).catch((er) => {
                console.log(er);
                toast.error("Invalid Value", {
                    position: toast.POSITION.TOP_CENTER
                })
            })

    }

    return (
        <>


            <div className='relative flex max-sm:block   '>
                <Navbar />
                <div className='mx-auto flex min-h-full w-full  justify-center my-20'>

                    <section className="flex w-[30rem] flex-col space-y-10 max-sm:mx-16">


                        <div className="text-center text-4xl font-medium">Add Books</div>

                        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                            <input type="text" placeholder="Book Name" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" onChange={(e) => {
                                setData(prev => {
                                    return { ...prev, bookName: e.target.value }
                                })
                            }}
                                value={data.bookName} />

                        </div>
                        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                            <input type="text" placeholder="category" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" onChange={(e) => {
                                setData(prev => {
                                    return { ...prev, bookCategory: e.target.value }
                                })
                            }}
                                value={data.bookCategory} />

                        </div>
                        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                            <input type="text" placeholder="Author" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" onChange={(e) => {
                                setData(prev => {
                                    return { ...prev, bookAuthor: e.target.value }
                                })
                            }}
                                value={data.bookAuthor} />

                        </div>
                        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                            <input type="text" placeholder="title" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" onChange={(e) => {
                                setData(prev => {
                                    return { ...prev, bookTitle: e.target.value }
                                })
                            }}
                                value={data.bookTitle} />

                        </div>

                        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                            <textarea name="" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none overflow-auto resize-none" placeholder='Topic of Book' id="" cols="56" rows="5" onChange={(e) => {
                                setData(prev => {
                                    return { ...prev, bookContent: e.target.value }
                                })
                            }}
                                value={data.bookContent}></textarea>
                        </div>
                        <div className="w-full transform  bg-transparent text-lg duration-300 ">
                            <div className="overflow-hidden relative w-64 mt-4 mb-4 bg-indigo-600 text-white">
                                <label htmlFor="img">

                                    <div className="bg-blue hover:bg-blue-light  font-bold py-2 px-4 w-full inline-flex items-center">
                                        <svg fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
                                        </svg>
                                        <span className="ml-2">{val}</span>
                                    </div>
                                </label>
                                <input
                                    ref={cheack}
                                    className='hidden'
                                    onChange={(e) => { setVal("Image Uploaded") }}
                                    type="file"
                                    id='img'
                                    name="bookImg"
                                    accept="image"
                                />
                            </div>
                        </div>



                        <button onClick={submitData} type='submit' className=" btn transform rounded-2xl text-white bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400">
                            <span className="btn-text-one">Add</span>
                            <span className="btn-text-two">Book</span>
                        </button>


                    </section>

                </div>
            </div>


        </>
    )
}
