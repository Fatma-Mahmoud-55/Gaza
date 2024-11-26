"use client"

import React from 'react';
// import gaza from "../../../public/images/gaza.svg";
// import raffah from "../../../public/images/raffah.svg";
// import khanYounes from "../../../public/images/khan-younes.svg";
// import northernGaza from "../../../public/images/northern-gaza.svg";
// import { useRouter } from "next/navigation";


import { useEffect, useState } from 'react';
import Image from "next/image";
import gazaSvg from "../../../public/images/gazaSvg.svg";

import icon from '../../../public/images/iconn.svg'
import { FiFilter } from "react-icons/fi";

const Page = () => {
    const [data, setData] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);  // State to toggle filter visibility

    useEffect(() => {
        // Retrieve data from localStorage
        const storedData = localStorage.getItem('dataToSend');
        if (storedData) {
            setData(JSON.parse(storedData));  // Parse the JSON data
            console.log('data',data)
        }
    }, []);

    const toggleFilter = () => {
        setIsFilterOpen(prevState => !prevState);  // Toggle the filter section visibility
    };

    return (
        <div>
            <div className="w-full items-center">
                {/* Top Display Area */}
                <div className="flex w-full mt-16 flex-col items-center">
                    <Image
                        src={gazaSvg}
                        alt="Selected"
                        className="lg:w-[60vw]  w-[90vw]"
                    />
                </div>
            </div>

            {/* Filter Header with Toggle */}
            <div className="w-10/12 mx-auto mt-5 flex gap-3 ">
                <div
                    onClick={toggleFilter}  // Toggle filter on icon click
                    className="bg-[#b3e0d4] p-4 w-fit rounded-2xl cursor-pointer"
                >
                    <FiFilter/>
                </div>
                <div className="bg-[#b3e0d4] p-3 text-xl px-6 w-fit rounded-2xl">
                    Filteration
                </div>
            </div>

            {/* Conditionally Render Filter Options */}
            <div className='w-10/12 mx-auto'>
                {isFilterOpen && (
                    <div className="bg-[#b3e0d4] mt-3 lg:w-3/12 w-7/12  rounded-2xl p-3">
                        {/* Filter Section */}
                        <div className=" bg-[#b3e0d4] p-3 rounded-2xl w-full">
                            {/* Damages Section */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">Damages</h3>
                                <div className="flex flex-col gap-2">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="m-2"/> Damage X
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="m-2"/> Damage y
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="m-2"/> Damage z
                                    </label>
                                </div>
                            </div>

                            {/* Governments Section */}
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Governments</h3>
                                <div className="flex flex-col gap-2">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="m-2"/> Northern Gaza
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="m-2"/> Gaza City
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="m-2"/> Central
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="m-2"/> Khan Yunis
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="m-2"/> Raffah
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>


            {/* Optional white card */}
            <div className="bg-[#b3e0d4] mt-6 w-10/12 mx-auto rounded-2xl lg:flex flex-wrap gap-4 p-6">
                <div className="lg:w-3/12 w-12/12 bg-white mt-4 flex justify-center gap-3 items-center rounded-2xl p-3">
                    <div className="w-full flex flex-col justify-start" dir="ltr">
                        <h3>Heading : ffff</h3>
                        <p>ssss sssss ssssssss ssssssssssss ssss</p>
                    </div>
                    <Image
                        src={icon}
                        alt="Selected"
                        className="rounded-full w-[60px] h-[60px]"
                    />
                </div>
                <div className="lg:w-3/12 w-12/12 bg-white mt-4 flex justify-center gap-3 items-center rounded-2xl p-3">
                    <div className="w-full flex flex-col justify-start" dir="ltr">
                        <h3>Heading : ffff</h3>
                        <p>ssss sssss ssssssss ssssssssssss ssss</p>
                    </div>
                    <Image
                        src={icon}
                        alt="Selected"
                        className="rounded-full w-[60px] h-[60px]"
                    />
                </div>

                <div className="lg:w-3/12 w-12/12 bg-white mt-4 flex justify-center gap-3 items-center rounded-2xl p-3">
                    <div className="w-full flex flex-col justify-start" dir="ltr">
                        <h3>Heading : ffff</h3>
                        <p>ssss sssss ssssssss ssssssssssss ssss</p>
                    </div>
                    <Image
                        src={icon}
                        alt="Selected"
                        className="rounded-full w-[60px] h-[60px]"
                    />
                </div>

            </div>
        </div>
    );
};

export default Page;