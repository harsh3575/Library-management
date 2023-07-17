import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import TableValue from './TableValue'
import DeleteIcon from '@mui/icons-material/Delete';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { toast } from 'react-toastify';
import fs from "fs"
import { useNavigate } from 'react-router-dom';

export default function RemoveBooks() {
    const History = useNavigate()
    const currentPage = useRef(1)
    const [limitPage, setLimitpage] = useState(10)
    const [countPage, setCountPage] = useState(1)
    const [Data, setvalue] = useState([])
    const [userinfo, setUserInfo] = useState({
        languages: [],
        response: [],
    });

    const handleChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;
        const { languages } = userinfo;

        // Case 1 : The user checks the box
        if (checked) {
            setUserInfo({
                languages: [...languages, value],
                response: [...languages, value],
            });
        }

        // Case 2  : The user unchecks the box
        else {
            setUserInfo({
                languages: languages.filter((e) => e !== value),
                response: languages.filter((e) => e !== value),
            });
        }
    };
    const handlepage = (e) => {
        currentPage.current = e.selected + 1
        getDataFromApi()
    }
    const getDataFromApi = () => {
        fetch(`http://localhost:3000/api/dashbord/getbook?page=${currentPage.current}&limit=${limitPage}`)
            .then(val => val.json())
            .then(response => {

                setCountPage(response.pagecount)
                setvalue(response.results)
            })
    }
    const RemoveData = async () => {
        try {
            const data = userinfo.response
            if (data.length > 0) {
                console.log("nbjknds");
                let sendData = await axios.delete('/api/dashbord/deletebook', { data })
                toast.success("Book Delete Successfully", {
                    position: "top-left"
                })
                History('/dashbord/removebook')
            }
        } catch (error) {
        }
    }
    const SearchData = async (val) => {
        try {
            let { data } = await axios.get(`/api/dashbord/searchdata?query=${val}`)
            setvalue(data)
        } catch (err) {
            toast.error("Something Wrong", {
                position: "top-center"
            })
        }
    }
    useEffect(() => {
        currentPage.current
        getDataFromApi()
    }, [])
    return (
        <>
            <div className='relative flex max-sm:block   '>

                <Navbar />
                <div className="w-full mx-auto">
                    <div className='text-center my-16  text-4xl font-bold '>
                        <h1 className='underline'>Removing Books </h1>
                    </div>
                    {/*Serach Bar  */}
                    <div className='my-8 mx-8' >
                        <div className="relative text-gray-600">
                            <input type="search" name="serch" placeholder="Search BookName" className="bg-white h-10 px-5 pr-10 rounded-full text-md focus:outline-none" onChange={(e) => { SearchData(e.target.value) }} />
                            {/* <button type="submit" className="absolute left-52 top-0 mt-3 mr-4">
                                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style={{ enableBackground: "new 0 0 56.966 56.966" }} xmlSpace="preserve" width="512px" height="512px">
                                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                                </svg>
                            </button> */}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="overflow-x-auto shadow-md sm:">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden space-x-4 ">
                                    <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                        <thead className="bg-gray-100 dark:bg-gray-700">
                                            <tr>
                                                <th scope="col" className="p-4">
                                                    <span className='cursor-pointer text-red-400 rounded-3xl bg-transparent pb-1 px-1 hover:bg-gray-600' onClick={RemoveData}>
                                                        <DeleteIcon />
                                                    </span>
                                                </th>
                                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                    Book Name
                                                </th>
                                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                    Book Author
                                                </th>
                                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                    Book Category
                                                </th>
                                                <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                    Book Title
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                            {Data.map((val, index) => {
                                                return <TableValue key={index} data={val} fun={handleChange} />
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="pageSetting">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlepage}
                            pageRangeDisplayed={limitPage}
                            pageCount={countPage}
                            marginPagesDisplayed={2}
                            containerClassName="pagination justify-content-center"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            activeClassName="active"
                            forcePage={currentPage.current - 1}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
