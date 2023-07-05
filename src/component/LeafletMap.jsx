import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import locationIcon from "../assets/pngtree-flat-red-location-sign-png-image_8927579.png";

const CovidMap = () => {
  const [countriesData, setCountriesData] = useState([]);
  const customIcon = L.divIcon({
    className: "custom-icon",
    html: `<img src="${locationIcon}" alt="Location Icon" style={{width:"1em"}} />`,
    iconSize: [24, 24], // Adjust the size of the icon as needed
  });
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((res) => res.json())
      .then((res) => {
        console.log("Country Wise Data", res);
        setCountriesData(res);
      });
  }, []);

  return (
    <div className="leaflet-map">
      <h2>A React Leaflet map</h2>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {countriesData.map((country, index) => (
          <Marker
            key={index}
            position={[country.countryInfo.lat, country.countryInfo.long]}
            icon={customIcon} // Use the custom icon
          >
            <Popup>
              <div>
                <h2>{country.country}</h2>
                <p>Total Active Cases: {country.active}</p>
                <p>Total Recovered: {country.recovered}</p>
                <p>Total Deaths: {country.deaths}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CovidMap;
