"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";


// Define types



// Custom Marker Icon
const redIcon = new Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
});

const Fatma: React.FC = () => {
    // const [projectsData, setProjectsData] = useState<ApiResponse | null>(null);


    const selectedProjects= {
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
                        "details": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lor",
                        "updated_at": "2024-11-22"
                    },
                    {
                        "id": 3,
                        "needs": "Fooooooooooooood",
                        "number_of_needs": 100,
                        "target_number": 500,
                        "unit_cost": "900.00",
                        "total_cost": "500.00",
                        "details": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise",
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
                        "details": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                        "updated_at": "2024-11-22"
                    }
                ]
            }
        ],
        "total_cost": "3,265,034.00"
    }







    return (
        <>
            <h1 className="w-fit text-center font-semibold text-2xl p-3 bg-[#00997180] rounded-xl mx-auto my-10">
                Countries serving the Gaza Strip
            </h1>
            <div className="w-3/4">
                <MapContainer
                    center={[10, 10]} // Still pass the center here
                    zoom={2}            // Still pass the zoom level here
                    style={{width: "100%", height: "500px"}}
                    scrollWheelZoom={false} // Optionally disable zoom with the mouse wheel
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {selectedProjects.results.map((item) => (
                        <Marker
                            key={item.country.id}
                            position={[item.country.latitude, item.country.longitude]}
                            icon={redIcon}
                        >
                            {selectedProjects[item.country.id]?.length > 0 && (
                                <Tooltip direction="top" permanent>
                                    <div className="flex flex-wrap space-y-2">
                                        <h3 className="font-bold">{item.country.name}</h3>
                                        <div className="flex flex-row ">
                                            {selectedProjects[item.country.id].map((project) => (
                                                <div
                                                    key={project.id}
                                                    className="bg-[#00994D25] p-4 rounded-md w-44 m-2"
                                                >
                                                    <strong className="text-xl">{project.needs}</strong>
                                                    <p>
                                                        <strong>Number of Needs:</strong>{" "}
                                                        {project.number_of_needs}
                                                    </p>
                                                    <p>
                                                        <strong>Target Number:</strong>{" "}
                                                        {project.target_number}
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
        </>
    );
};

export default Fatma;
