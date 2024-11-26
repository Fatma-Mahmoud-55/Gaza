"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import gazaSvg from "../../../public/images/gazaSvg.svg";
import { FiFilter } from "react-icons/fi";
import gaza from "../../../public/images/gaza.svg";
import raffah from "../../../public/images/raffah.svg";
import khanYounes from "../../../public/images/khan-younes.svg";
import northernGaza from "../../../public/images/northern-gaza.svg";

const Page = () => {
    const [data, setData] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [mapId, setMapID] = useState(null);
    const [selectedGovernorates, setSelectedGovernorates] = useState([]);
    const mapImages = {
        1: gaza,
        2: khanYounes,
        3: northernGaza,
        4: raffah,
    };

    useEffect(() => {
        const mapId = localStorage.getItem('mapId');
        setMapID(mapId);
        console.log(mapId, "ggggggggggggggguuuuuuuuuuuu");

        // Sample data fetching
        const fetchedData = {
            "count": 117,
            "next": null,
            "previous": "http://127.0.0.1:7000/api/damage-statistic/?page=11",
            "results": [
                {
                    "governorate": { "id": 5, "name": "رفح" },
                    "statistics": [
                        {
                            "id": 229,
                            "category": { "id": 6, "name": "عدد نقاط الرعاية الطبية التي تعمل بشكل جزئي" },
                            "damage_value": "3.00",
                            "damage_value_percentage": null,
                            "photo_icon_url": null,
                            "updated_at": "2024-11-22"
                        },
                        {
                            "id": 230,
                            "category": { "id": 7, "name": "عدد الوحدات السكنية المدمرة" },
                            "damage_value": "23,000.00",
                            "damage_value_percentage": "46.0%",
                            "photo_icon_url": null,
                            "updated_at": "2024-11-22"
                        }
                    ]
                },
                {
                    "governorate": { "id": 3, "name": "غزة" },
                    "statistics": [
                        {
                            "id": 305,
                            "category": { "id": 12, "name": "عدد المدارس المتضررة" },
                            "damage_value": "120",
                            "damage_value_percentage": "20.0%",
                            "photo_icon_url": null,
                            "updated_at": "2024-11-20"
                        }
                    ]
                }
            ],
            "total_damage_value": "47,179,143.00"
        };
        setData(fetchedData);
    }, []);

    const toggleFilter = () => setIsFilterOpen((prev) => !prev);

    const handleGovernorateClick = (governorateName, isChecked) => {
        setSelectedGovernorates((prev) =>
            isChecked
                ? [...prev, governorateName] // Add to selected
                : prev.filter((name) => name !== governorateName) // Remove from selected
        );
    };

    const selectedStatistics = data?.results.filter((item) =>
        selectedGovernorates.includes(item.governorate.name)
    );

    return (
        <div className='my-20' dir='rtl'>
            <div className="w-full items-center" dir="rtl">
                <div className="flex w-full mt-16 flex-col items-center">
                    <Image src={mapImages[mapId] || gazaSvg} alt="Gaza Map" className="lg:w-[60vw] w-[90vw]" />
                </div>
            </div>

            {/* SVG and Filter Header */}
            <div className="w-10/12 mx-auto" dir="rtl">
                <div className="w-10/12 mt-5 flex gap-3" dir="rtl">
                    <div onClick={toggleFilter} className="bg-[#b3e0d4] p-4 w-fit rounded-2xl cursor-pointer">
                        <FiFilter />
                    </div>
                    <div className="bg-[#b3e0d4] p-3 text-xl px-6 w-fit rounded-2xl">Filteration</div>
                </div>

                {/* Filter Section */}
                {isFilterOpen && (
                    <div className="lg:w-4/12 w-12/12 bg-[#b3e0d4] mt-3 p-4 rounded-2xl" dir="rtl">
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">Governorates</h3>
                            <div className="flex w-full flex-col gap-2">
                                {data?.results.map((item) => (
                                    <label key={item.governorate.id} className="flex items-center justify-start p-4 border-b gap-3 bg-white rounded-md cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            onChange={(e) =>
                                                handleGovernorateClick(item.governorate.name, e.target.checked)
                                            }
                                        />
                                        {item.governorate.name}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Display Selected Governorate Statistics */}
            <div className="w-10/12 mx-auto bg-[#b3e0d4] mt-6 p-6 rounded-2xl" dir="rtl">
                {selectedGovernorates.length > 0 ? (
                    selectedStatistics.map((governorate) => (
                        <div key={governorate.governorate.id}>
                            <h3 className="font-bold text-lg">{governorate.governorate.name}</h3>
                            <div className="mt-4 flex gap-4">
                                {governorate.statistics.map((stat) => (
                                    <div key={stat.id} className="bg-white p-4 rounded-lg">
                                        <h4 className="font-semibold">{stat.category.name}</h4>
                                        <p>Damage Value: {stat.damage_value}</p>
                                        {stat.damage_value_percentage && (
                                            <p>Percentage: {stat.damage_value_percentage}</p>
                                        )}
                                        {stat.photo_icon_url && (
                                            <img src={stat.photo_icon_url} alt={stat.category.name} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Select a governorate to see its statistics.</p>
                )}
            </div>
        </div>
    );
};

export default Page;
