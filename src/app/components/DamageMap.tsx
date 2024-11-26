"use client";

import { useState } from "react";
import gaza from "../../../public/images/gaza.svg";
import raffah from "../../../public/images/raffah.svg";
import khanYounes from "../../../public/images/khan-younes.svg";
import northernGaza from "../../../public/images/northern-gaza.svg";
import { useRouter } from "next/navigation";

const DamageMap: React.FC = () => {
    const router = useRouter();

    // Static image list with titles
    const imageList = [
        { src: gaza.src, title: "Gaza City",id:1 },
        { src: khanYounes.src, title: "Khan Younes",id:2 },
        { src: northernGaza.src, title: "Northern Gaza",id:3 },
        { src: raffah.src, title: "Rafah",id:4 },
    ];




    // State for the selected image
    const [selectedImage, setSelectedImage] = useState<string>(imageList[0].src);
    const [mapId, setMapId] = useState<string>(imageList[0].title);

    // Handle image click
    const handleImageClick = (image: string) => {
        console.log(`Image clicked: ${image.id}`);
        setMapId(image.id)
        setSelectedImage(image.src);
    };
    const handleNavigate = () => {
        console.log(selectedImage,"selectedImageName")
        // Store data in localStorage
        localStorage.setItem('mapId', JSON.stringify(mapId));

        // Navigate to Page B
        router.push('/damage_map_details');
    };
    return (
        <>

            <div className="w-full  ">
                {/* Top Display Area */}
                <div className="w-full flex justify-center items-center  ">
                    <img
                        src={selectedImage}
                        alt="Selected"
                        className="lg:w-[60vw]  w-[90vw]"
                    />
                </div>

                {/* Bottom Slider */}
                <div className="slider lg:flex justify-center items-center gap-6 overflow-x-auto p-4 w-full">
                    {imageList.map((image, index) => (
                        <div key={index} className="flex w-full flex-col items-center">
                            <img
                                src={image.src}
                                alt={`Thumbnail ${index}`}
                                className={`lg:w-full w-7/12 object-cover cursor-pointer rounded-lg transition-transform duration-300 p-5 ${
                                    selectedImage === image.src
                                        ? "scale-105 border-blue-500"
                                        : "border-gray-300"
                                }`}
                                onClick={() => handleImageClick(image)}
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
