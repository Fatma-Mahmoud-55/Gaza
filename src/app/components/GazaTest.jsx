"use client";


import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";


import 'leaflet/dist/leaflet.css';



// Custom Marker Icon

const GazaTest = () => {

    const [expandedCountry, setExpandedCountry] = useState(new Map());
    const [selectedProjects, setSelectedProjects] = useState({});

    const projectsData = {
        "results": [
            {
                "country": {
                    "id": 1,
                    "name": "Egypt",
                    "latitude": 2.155,
                    "longitude": 3.66
                },
                "projects": [
                    {
                        "id": 1,
                        "needs": "food",
                        "number_of_needs": 2000,
                        "target_number": 1000,
                        "unit_cost": "3000.00",
                        "total_cost": "10000.00",
                        "details": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
                        "updated_at": "2024-11-22"
                    },
                    {
                        "id": 3,
                        "needs": "Fooooooooooooood",
                        "number_of_needs": 100,
                        "target_number": 500,
                        "unit_cost": "900.00",
                        "total_cost": "500.00",
                        "details": "Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
                        "updated_at": "2024-11-22"
                    }
                ]
            },
            {
                "country": {
                    "id": 2,
                    "name": "US",
                    "latitude": 12.36925,
                    "longitude": 13.65823
                },
                "projects": [
                    {
                        "id": 2,
                        "needs": "drink",
                        "number_of_needs": 6587685,
                        "target_number": 222,
                        "unit_cost": "22355.00",
                        "total_cost": "3254534.00",
                        "details": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                        "updated_at": "2024-11-22"
                    }
                ]
            }
        ],
        "total_cost": "3,265,034.00"
    };

    const toggleCountry = (countryId) => {
        setExpandedCountry((prev) => {
            const newExpandedCountry = new Map(prev);
            const isOpen = newExpandedCountry.get(countryId);
            newExpandedCountry.set(countryId, !isOpen);
            return newExpandedCountry;
        });
    };

    const handleProjectSelect = (project, country) => {
        setSelectedProjects((prev) => {
            const countryId = country.id;
            const existingProjects = prev[countryId] || [];
            const isSelected = existingProjects.some((p) => p.id === project.id);

            if (isSelected) {
                return {
                    ...prev,
                    [countryId]: existingProjects.filter((p) => p.id !== project.id),
                };
            } else {
                return {
                    ...prev,
                    [countryId]: [...existingProjects, project],
                };
            }
        });
    };

    return (
        <>
            <h1 className="w-fit text-center font-semibold text-2xl p-3 bg-[#00997180] rounded-xl mx-auto my-10">
                Countries serving the Gaza Strip
            </h1>
            <div className="flex">
                {/* Map */}
                <MapContainer center={[51.505, -0.09]} zoom={13} style={{ width: '100%', height: '400px' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]}>
                        <Popup>
                            A sample marker.
                        </Popup>
                    </Marker>
                </MapContainer>

                {/* Sidebar */}
                <div
                    style={{
                        width: "25%",
                        backgroundColor: "#d6f2e1",
                        padding: "15px",
                        borderLeft: "1px solid #ccc",
                        overflowY: "auto",
                    }}
                >
                    <h2 className="text-2xl font-semibold text-center my-3">Gaza Strip</h2>
                    <input
                        className="w-full rounded-md px-4 py-3 mb-5"
                        placeholder="Search..."
                    />
                    {projectsData.results.map((item) => (
                        <div key={item.country.id} dir="ltr" style={{ marginBottom: "20px" }}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    cursor: "pointer",
                                }}
                                onClick={() => toggleCountry(item.country.id)}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <h3 style={{ margin: 0 }}>{item.country.name}</h3>
                                </div>
                                <span
                                    style={{
                                        transform: expandedCountry.get(item.country.id)
                                            ? "rotate(180deg)"
                                            : "rotate(0deg)",
                                        transition: "transform 0.2s",
                                    }}
                                >
                  <MdOutlineKeyboardArrowDown />
                </span>
                            </div>
                            {expandedCountry.get(item.country.id) && (
                                <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                                    {item.projects.map((project) => (
                                        <div
                                            key={project.id}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                marginBottom: "5px",
                                                gap: "10px",
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedProjects[item.country.id]?.some(
                                                    (p) => p.id === project.id
                                                )}
                                                onChange={() => handleProjectSelect(project, item.country)}
                                            />
                                            <span>{project.needs}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <hr style={{ border: "0.5px solid #ccc", margin: "15px 0" }} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default GazaTest;
