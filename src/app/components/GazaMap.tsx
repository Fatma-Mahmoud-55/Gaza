"use client"
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

interface Project {
    id: number;
    needs: string;
    number_of_needs: number;
    target_number: number;
    unit_cost: string;
    total_cost: string;
    details: string;
    updated_at: string;
}

interface Country {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

const redIcon = new Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
});

const MapComponent: React.FC = () => {
    const [expandedCountry, setExpandedCountry] = useState<Map<number, boolean>>(new Map());
    const [selectedProjects, setSelectedProjects] = useState<Record<number, Project[]>>({});
    const [searchTerm, setSearchTerm] = useState<string>("");

    const projectsData = {
        results: [
            {
                country: { id: 1, name: "Egypt", latitude: 2.155, longitude: 3.66 },
                projects: [
                    {
                        id: 1,
                        needs: "food",
                        number_of_needs: 2000,
                        target_number: 1000,
                        unit_cost: "3000.00",
                        total_cost: "10000.00",
                        details: "Details about food needs in Egypt",
                        updated_at: "2024-11-22",
                    },
                ],
            },
            {
                country: { id: 2, name: "US", latitude: 12.36925, longitude: 13.65823 },
                projects: [
                    {
                        id: 2,
                        needs: "drink",
                        number_of_needs: 6587685,
                        target_number: 222,
                        unit_cost: "22355.00",
                        total_cost: "3254534.00",
                        details: "Details about drink needs in the US",
                        updated_at: "2024-11-22",
                    },
                ],
            },
        ],
    };

    const toggleCountry = (countryId: number) => {
        setExpandedCountry((prev) => {
            const newExpandedCountry = new Map(prev);
            const isOpen = newExpandedCountry.get(countryId);
            newExpandedCountry.set(countryId, !isOpen);
            return newExpandedCountry;
        });
    };

    const handleProjectSelect = (project: Project, country: Country) => {
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
                        {projectsData.results.map((item) => (
                            <Marker
                                key={item.country.id}
                                position={[item.country.latitude, item.country.longitude]}
                                icon={redIcon}
                            >
                                {selectedProjects[item.country.id]?.length > 0 && (
                                    <Tooltip direction="top" permanent>
                                        <div>
                                            <h3>{item.country.name}</h3>
                                            {selectedProjects[item.country.id].map((project) => (
                                                <div key={project.id}>
                                                    <strong>{project.needs}</strong>
                                                    <p>Number of Needs: {project.number_of_needs}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </Tooltip>
                                )}
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {projectsData.results.map((item) => (
                        <div key={item.country.id} style={{ marginBottom: "20px" }}>
                            <div onClick={() => toggleCountry(item.country.id)}>
                                <h3>{item.country.name}</h3>
                            </div>
                            {expandedCountry.get(item.country.id) && (
                                <div>
                                    {item.projects.map((project) => (
                                        <div key={project.id}>
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
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MapComponent;
