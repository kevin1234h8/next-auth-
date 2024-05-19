"use client";

import React from "react";
import { LoadScript, GoogleMap } from "@react-google-maps/api";
const GoogleMapView = () => {
  const mapContainerStyle = {
    width: "100%",
    height: "70vh",
  };
  const cordinate = { lat: -0.789275, lng: 113.921327 };
  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.GOOGLE_API_KEY as string}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={cordinate}
          zoom={5}
        ></GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapView;
