"use client";

import { useState } from "react";
import gaza from "../../../public/images/gaza.svg";
import raffah from "../../../public/images/raffah.svg";
import khanYounes from "../../../public/images/khan-younes.svg";
import northernGaza from "../../../public/images/northern-gaza.svg";
import { useRouter } from 'next/navigation'

const DamageMap: React.FC = () => {

    // Static image list with titles
    const imageList = [
        { src: gaza.src, title: "Gaza City" },
        { src: khanYounes.src, title: "Khan Younes" },
        { src: northernGaza.src, title: "Northern Gaza" },
        { src: raffah.src, title: "Rafah" },
    ];




    // State for the selected image
    const [selectedImage, setSelectedImage] = useState<string>(imageList[0].src);
    const [selectedImageName, setSelectedImageName] = useState<string>(imageList[0].title);

    // Handle image click
    const handleImageClick = (image: string) => {
        setSelectedImage(image);
        setSelectedImageName(image);
    };
    const handleNavigate = () => {
        console.log(selectedImage,"selectedImageName")
        // Store data in localStorage
        localStorage.setItem('dataToSend', JSON.stringify(selectedImageName));

        // Navigate to Page B
        // router.push('/damage_map_details');
    };
    return (
        <>

            <div className="w-full items-center">
                {/* Top Display Area */}
                <div className="flex w-full flex-col items-center">
                    <img
                        src={selectedImage}
                        alt="Selected"
                        className="!w-[60vw] px-10   "
                    />
                </div>

                {/* Bottom Slider */}
                <div className="slider flex justify-center items-center gap-6 overflow-x-auto p-4 w-full">
                    {imageList.map((image, index) => (
                        <div key={index} className="flex w-full flex-col items-center">
                            <img
                                src={image.src}
                                alt={`Thumbnail ${index}`}
                                className={`w-full object-cover cursor-pointer rounded-lg transition-transform duration-300 p-5 ${
                                    selectedImage === image.src
                                        ? "scale-105 border-blue-500"
                                        : "border-gray-300"
                                }`}
                                onClick={() => handleImageClick(image.src)}
                            />
                            <span className="text-sm mt-2 text-center">{image.title}</span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center items-center">
                    <button className="bg-[#009971] mx-auto px-10 py-3 rounded-xl text-white mt-10"
                            onClick={handleNavigate}
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </>
    );
};

export default DamageMap;
