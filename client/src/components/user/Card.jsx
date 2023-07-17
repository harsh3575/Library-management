import React from 'react'
import {
    Ripple,
    initTE,
} from "tw-elements";
import Books from './Books';
import { Link } from 'react-router-dom';

initTE({ Ripple });

export default function Card({ data }) {
    const { bookName, bookImg } = data
    return (
        <>
            <section className=' transition-all hover:scale-105'>
                <div className="mx-12 my-8 flex w-auto  justify-center bg-white rounded-2xl shadow-xl shadow-gray-400/20 max-sm:flex-col">
                    <Link className='w-full' to={'/books'}>
                        <img className="aspect-auto w-52 h-52 cursor-pointer rounded-2xl object-cover object-center max-sm:h-auto" src={`http://localhost:3000/${bookImg}`} />
                    </Link>
                    <div className="p-6">
                        <h1 className="text-2xl font-medium text-gray-700 pb-2">{bookName}</h1>
                        <p className="text text-gray-500 leading-6">Set in a poverty-stricken Glasgow in the early 1980s, Douglas Stuart’s Booker Prize-winning debut is a heartbreaking story which lays bare the ruthlessness of poverty and the limits of love </p>
                    </div>
                </div>
            </section>
        </>
    )
}
