import React from 'react'
import AboutImg from '../../Images/about.png'
import Navbar from './Navbar'
import Foorter from './Foorter'


export default function About() {
    return (
        <>

            <div className="container my-36 px-6 mx-auto">


                <section className="mb-32 text-gray-800 py-20">
                    <div className="block rounded-lg shadow-lg bg-white">
                        <div className="flex flex-wrap items-center">
                            <div className="hidden lg:flex grow-0 shrink-0 basis-auto lg:w-6/12 xl:w-4/12">
                                <img src={AboutImg} alt="Trendy Pants and Shoes"
                                    className="w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg" />
                            </div>
                            <div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12">
                                <div className="px-6 py-12 md:px-12">
                                    <h2 className="text-2xl font-bold mb-4">About Us Library</h2>

                                    <p className="text-gray-500 mb-6 ">
                                        At our library, we are passionate about fostering knowledge, exploration, and community engagement. Whether you're a student, a lifelong learner, or simply an avid reader, we strive to provide a diverse range of resources, services, and programs to cater to your informational and recreational needs.
                                    </p>
                                    <p className="text-gray-500">
                                        We offer a wide array of services and collections designed to cater to the needs of our patrons. Our extensive collection spans various genres, including fiction, non-fiction, children's books, periodicals, reference materials, and digital resources. Additionally, we provide access to e-books, audiobooks, and online databases, ensuring that our patrons have the convenience of accessing information from anywhere, at any time.

                                        Our knowledgeable and friendly staff members are always available to assist you with research inquiries, reference requests, and recommendations for your next great read. We also offer computer and internet access, study spaces, meeting rooms, and community event spaces to foster collaboration and engagement among library users.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </div>

        </>
    )
}
