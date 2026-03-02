import React, {useEffect, useRef, useState} from "react";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";


const Map = () => {
    const mapRef = useRef(null);
    const [poles, setPoles] = useState([]);

    useEffect(()=> {
        axios.get('http://localhost:8080/poles').then((response) => {
            //this console.log will be in our frontend console
            setPoles( response.data );
        })
    }, [])
    return (
        // Make sure you set the height and width of the map container otherwise the map won't show
        <MapContainer
            center={[42.32, -71.21]}
            zoom={16}
            ref={mapRef}
            style={{ height: '100vh', width: '100vw'}}
        >
            {poles.map( pole => (
                <Marker position={[ pole.longitude, pole.latitude]}/>
            ))}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Additional map layers or components can be added here */}
        </MapContainer>
    );
};

export default Map;