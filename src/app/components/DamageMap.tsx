"use client";

import { useState } from "react";
import gaza from "../../../public/images/gaza.svg";
import raffah from "../../../public/images/raffah.svg";
import khanYounes from "../../../public/images/khan-younes.svg";
import northernGaza from "../../../public/images/northern-gaza.svg";

const DamageMap = () => {
    const [mapId, setMapId] = useState<string | null>(null);

    const mapImages = {
        1: gaza,
        2: khanYounes,
        3: northernGaza,
        4: raffah,
    };

    const handleImageClick = (image: string) => {
        console.log(`Image clicked: ${image}`,mapId);
        setMapId(image);
        localStorage.setItem("mapId", image);
    };

    return (
        <div>
            <div onClick={() => handleImageClick("1")}>
                <img src={mapImages[1]} alt="Gaza" />
            </div>
            <div onClick={() => handleImageClick("2")}>
                <img src={mapImages[2]} alt="Khan Younes" />
            </div>
            <div onClick={() => handleImageClick("3")}>
                <img src={mapImages[3]} alt="Northern Gaza" />
            </div>
            <div onClick={() => handleImageClick("4")}>
                <img src={mapImages[4]} alt="Raffah" />
            </div>
        </div>
    );
};

export default DamageMap;
