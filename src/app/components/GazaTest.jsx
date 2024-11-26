"use client"
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

// Static Data
const data = {
    results: [
        {
            country: {
                id: 1,
                name: "Egypt",
                latitude: 2.155,
                longitude: 3.66,
            },
            projects: [
                {
                    id: 1,
                    needs: "food",
                    number_of_needs: 2000,
                    target_number: 1000,
                    unit_cost: "3000.00",
                    total_cost: "10000.00",
                    details:
                        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form...",
                    updated_at: "2024-11-22",
                },
                {
                    id: 3,
                    needs: "Fooooooooooooood",
                    number_of_needs: 100,
                    target_number: 500,
                    unit_cost: "900.00",
                    total_cost: "500.00",
                    details:
                        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature...",
                    updated_at: "2024-11-22",
                },
            ],
        },
        {
            country: {
                id: 2,
                name: "US",
                latitude: 12.36925,
                longitude: 13.65823,
            },
            projects: [
                {
                    id: 2,
                    needs: "drink",
                    number_of_needs: 6587685,
                    target_number: 222,
                    unit_cost: "22355.00",
                    total_cost: "3254534.00",
                    details:
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text...",
                    updated_at: "2024-11-22",
                },
            ],
        },
    ],
    total_cost: "3,265,034.00",
};
const redIcon = new Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
});

const MapComponent = () => {
    const [expandedCountry, setExpandedCountry] = useState(new Map());
    const [selectedProjects, setSelectedProjects] = useState({});
    const [isClient, setIsClient] = useState(false); // Track if we are on the client side

    useEffect(() => {
        setIsClient(true); // Set to true after the component mounts, ensuring it's on the client
    }, []);

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

    if (!isClient) {
        return null; // Render nothing on the server-side
    }

    return (
        <>
            {/* Your component JSX */}
            <div className="flex">
                {/* Map */}
                <div className="w-3/4">
                    <MapContainer
                        center={[10, 10]}
                        zoom={2}
                        style={{ width: "100%", height: "500px" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {data.results.map((item) => (
                            <Marker
                                key={item.country.id}
                                position={[item.country.latitude, item.country.longitude]}
                                icon={redIcon}
                            >
                                {selectedProjects[item.country.id]?.length > 0 && (
                                    <Tooltip direction="top" permanent>
                                        <div className="flex flex-wrap space-y-2">
                                            <h3 className="font-bold">{item.country.name}</h3>
                                            <div className="flex flex-row">
                                                {selectedProjects[item.country.id].map((project) => (
                                                    <div
                                                        key={project.id}
                                                        className="bg-[#00994D25] p-4 rounded-md w-44 m-2"
                                                    >
                                                        <strong className="text-xl">{project.needs}</strong>
                                                        <p>
                                                            <strong>Number of Needs:</strong> {project.number_of_needs}
                                                        </p>
                                                        <p>
                                                            <strong>Target Number:</strong> {project.target_number}
                                                        </p>
                                                        <p>
                                                            <strong>Unit Cost:</strong> {project.unit_cost}
                                                        </p>
                                                        <p>
                                                            <strong>Total Cost:</strong> {project.total_cost}
                                                        </p>
                                                        <p>
                                                            <strong>Updated At:</strong> {project.updated_at}
                                                        </p>
                                                        <p className="whitespace-break-spaces">
                                                            <strong>Details:</strong> {project.details}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </Tooltip>
                                )}
                            </Marker>
                        ))}
                    </MapContainer>
                </div>

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
                    <input className="w-full rounded-md px-4 py-3 mb-5" placeholder="Search..." />
                    {data.results.map((item) => (
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
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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

export default MapComponent;
