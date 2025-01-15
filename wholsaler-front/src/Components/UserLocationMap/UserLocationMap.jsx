import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import { MdOutlineGpsFixed } from "react-icons/md";

const markerIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapComponent = ({ userPosition , setUserPosition  , submitHandler }) => {
    const [position, setPosition] = useState([36.4064, 54.9763]); // مختصات شاهرود
    const [markerPosition, setMarkerPosition] = useState(userPosition);
    const mapRef = useRef();
    // console.log(userPosition)
    const handleMapClick = (e) => {
        setMarkerPosition([e.latlng.lat, e.latlng.lng]);
        setUserPosition([e.latlng.lat, e.latlng.lng])
    };

    const goToCurrentLocation = () => {
        const map = mapRef.current;
        if (map) {
            map.locate().on('locationfound', (e) => {
                const newPosition = [e.latlng.lat, e.latlng.lng];
                setPosition(newPosition);
                setUserPosition(newPosition)
                setMarkerPosition(newPosition);
                map.flyTo(e.latlng, map.getZoom());
            });
        }
    };

    const LocationMarker = () => {
        useMapEvents({
            click: handleMapClick
        });

        return <Marker position={markerPosition} icon={markerIcon}></Marker>;
    };


    const submitFunc = () =>{
        submitHandler();
    }

    return (
        <div className='h-[200px] flex justify-center items-center' style={{ position: 'relative', width: '100%' }}>
            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }} ref={mapRef}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker />
            </MapContainer>
            <div className='flex justify-center items-center' style={{ position: 'absolute', bottom: '0px', right: '10px', zIndex: 1000  }}>
                <button onClick={goToCurrentLocation} style={{ backgroundColor: 'blue', color: 'white', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
                    <MdOutlineGpsFixed size="18" />
                </button>
                <button  onClick={() => submitFunc()} style={{ backgroundColor: 'green'  ,transform:"translatey(-5px)" ,marginRight: '10px' , color: 'white', padding: '9px', borderRadius: '5px' }}>
                    ثبت موقعیت
                </button>
            </div>
        </div>
    );
};

export default MapComponent;