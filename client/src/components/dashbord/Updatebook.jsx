import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { validateYupSchema } from 'formik';

export default function Updatebook() {
    const [query, setSearch] = useState('')
    const [values, setValue] = useState(null)
    const [Img, setImg] = useState('')
    const FindData = async () => {
        try {
            const { data } = await axios.get(`/api/dashbord/searchdata?query=${query}`)
            setValue(data)
            setImg(data[0].bookImg)
        } catch (er) {
            console.log(er);
        }
    }
    useEffect(() => {

    }, [FindData])
    return (
        <>
            <div className='relative flex max-sm:block'>
                <Navbar />
                <div className='mx-auto flex min-h-full w-full  justify-center my-16'>


                    <section className="flex w-[30rem] flex-col space-y-10 max-sm:mx-16">

                        <div className="text-center text-4xl font-medium font-sans">Update Books</div>
                        <div className='my-4 mx-8' >
                            <div className="relative text-gray-600">
                                <input type="search" name="serch" placeholder="Search BookName" className="bg-white h-10 px-5 pr-10 rounded-full text-md focus:outline-none" onChange={e => { setSearch(e.target.value) }} value={query} />
                                {/* <button type="submit" className="absolute left-52 top-0 mt-3 mr-4">
                                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style={{ enableBackground: "new 0 0 56.966 56.966" }} xmlSpace="preserve" width="512px" height="512px">
                                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                                </svg>
                            </button> */}
                                <span className='absolute top-2 left-52 cursor-pointer' onClick={FindData}>
                                    <SearchIcon />
                                </span>
                            </div>
                        </div>

                        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                            <input type="text" placeholder="Book Name" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" value={values ? values[0].bookName : null} />

                        </div>
                        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                            <input type="text" placeholder="category" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" value={values ? values[0].bookCategory : null} />

                        </div>
                        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                            <input type="text" placeholder="Author" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" value={values ? values[0].bookAuthor : null} />

                        </div>
                        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                            <input type="text" placeholder="title" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" value={values ? values[0].bookTitle : null} />

                        </div>

                        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
                            <textarea name="" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none overflow-auto resize-none" placeholder='Topic of Book' id="" cols="56" rows="5"
                                value={values ? values[0].bookContent : null}></textarea>
                        </div>
                        <div className="w-full flex justify-stretch transform  bg-transparent text-lg duration-300 ">
                            <div className="overflow-hidden relative w-64 mt-4 mb-4 bg-indigo-600 text-white">
                                <label htmlFor="img">

                                    <div className="bg-blue hover:bg-blue-light  font-bold py-2 px-4 w-full inline-flex items-center">
                                        <svg fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
                                        </svg>
                                        <span className="ml-2">Change</span>
                                    </div>
                                </label>
                                <input
                                    className='hidden'
                                    type="file"
                                    id='img'
                                    name="bookImg"
                                    accept="image"
                                />
                            </div>
                        </div>
                        {values ? <>
                            <div className='absolute bottom-28 right-1/3'>
                                <img src={`http://localhost:3000/${Img}`} width={100} height={100} alt="" />
                            </div>
                        </> : null}



                        <button type='submit' className=" btn transform rounded-2xl text-white bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400">
                            <span className="btn-text-one">Update</span>
                            <span className="btn-text-two">Book</span>
                        </button>


                    </section>

                </div >
            </div >
        </>
    )
}
