import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Avatar from '../../Images/cj.png'
export default function Readbook() {
    const { id } = useParams()
    const [value, setdata] = useState([])
    const getData = async () => {
        try {
            const { data } = await axios.get(`/api/singledata/${id}`)
            console.log(data);
            setdata(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <section className="text-gray-700  ">
                <div className="container  py-24 ">
                    <div className="lg:w-4/5 mx-auto flex justify-around flex-wrap">
                        <img className="aspect-auto w-72 h-full   rounded-2xl object-cover object-center max-sm:h-auto" src={`http://localhost:3000/${value.bookImg}`} />
                        <div className="lg:w-1/2 w-full lg:py-6 mt-6 lg:mt-0 max-sm:px-10">
                            <nav className="flex max-sm:pt-4" aria-label="Breadcrumb">
                                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                    <li className="inline-flex items-center">
                                        <Link to={'/books'} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 ">
                                            <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                            Books
                                        </Link>
                                    </li>
                                    <li>
                                        <div className="flex items-center">
                                            <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                            <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 ">{value.bookName}</a>
                                        </div>
                                    </li>

                                </ol>
                            </nav>
                            <div >
                                <p className='my-8 text-md text-gray'>Author : {value.bookAuthor}</p>
                                <h2 className="text-sm title-font text-gray-500 tracking-widest my-2">{value.bookCategory}</h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{value.bookName}</h1>
                                <p className="leading-relaxed mt-10">{value.bookTitle}</p>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='px-48'>
                    <h1 className='text-center text-4xl'>Book Content </h1>
                    <p className='text-xl p-10'>{value.bookContent}</p>
                </div>
            </section>
        </>
    )
}
