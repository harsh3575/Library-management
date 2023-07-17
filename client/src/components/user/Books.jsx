import React, { useEffect, useState } from 'react'
import Card2 from './Card2'
import axios from 'axios'
import Loader from '../dashbord/Loader'
import Navbar from './Navbar'


export default function Books() {
    const [Data, setData] = useState([])
    const [load, setLoad] = useState(false)
    const [value, setValue] = useState("")
    const getData = async (Query) => {
        try {
            const { data } = await axios.get(`/api/dashbord/searchdata?query=${Query}`)
            setData(data)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetch('http://localhost:3000/api/getdata')
            .then(value => value.json())
            .then(response => {
                setData(response)
            })
        setInterval(() => {
            setLoad(true)
        }, 1000)
    }, [])
    return (
        <>

            <div className='flex my-5'>
                <div className="pt-2 relative mx-auto text-gray-600">
                    <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                        type="search" name="search" placeholder="Search"
                        onChange={(e) => {
                            setValue(e.target.value)
                            getData(e.target.value)
                        }}
                        value={value}
                    />
                    <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
                        <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                            viewBox="0 0 56.966 56.966" style={{ enableBackground: "new 0 0 56.966 56.966" }} xmlSpace="preserve"
                            width="512px" height="512px">
                            <path
                                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                        </svg>
                    </button>
                </div>
            </div>
            {(Data.length == 0) ?
                <>
                    <div className='flex justify-center items-center'>
                        <h1 className='text-4xl text-gray-500 my-10'>Book Not Found</h1>
                    </div>
                </> :
                <>
                    <div className="ml-16 p-10 flex flex-wrap max-sm:ml-0 max-sm:p-16 ">
                        {load ?
                            <>
                                {Data.map((value) => {
                                    return <Card2 key={value._id} {...value} />
                                })}
                            </>
                            : <>
                                <Loader />
                            </>
                        }
                    </div>
                </>}


        </>
    )
}
