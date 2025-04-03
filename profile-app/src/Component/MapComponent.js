import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapComponent = ({ coordinates }) => {
  return (
    <MapContainer center={coordinates} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={coordinates}>
        <Popup>Selected Profile Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;












































