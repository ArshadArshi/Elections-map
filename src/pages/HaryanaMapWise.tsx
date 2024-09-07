import React, { useState, useRef } from "react";
import { MapContainer, GeoJSON, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geojsonData from "../../Haryana_AC.json";
import {
  FeatureCollection,
  Feature,
  Geometry,
  GeoJsonProperties,
} from "geojson";
import L from "leaflet";
import { HomeIcon } from "@radix-ui/react-icons";

interface Props {
  // setSelectedConstituency: React.Dispatch<React.SetStateAction<string | undefined>>;
  height: string;
  width: string;
  zoom: number;
  bjpCount: number;
  incCount: number;
  congressCount: number;
  otherCount: number;
}

const geojson: FeatureCollection<Geometry, GeoJsonProperties> =
  geojsonData as FeatureCollection<Geometry, GeoJsonProperties>;

const HaryanaMapWise: React.FC<Props> = ({ height, width, zoom }) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(null);
  const [mapSize, setMapSize] = useState({ height: height, width: width });
  const [marker, setMarker] = useState<{
    position: L.LatLngExpression;
    popupText: string;
  } | null>(null);
  const mapRef = useRef<L.Map>(null); // Reference to the map

  const countParties = () => {
    const counts = { BJP: 0, INC: 0, CONGRESS: 0, OTHERS: 0 };

    geojson.features.forEach((feature: any) => {
      const party = feature.properties.party;
      if (party === "BJP") counts.BJP++;
      else if (party === "INC") counts.INC++;
      else if (party === "CONGRESS") counts.CONGRESS++;
      else counts.OTHERS++;
    });

    return counts;
  };

  const partyCounts = countParties();

  const highlightFeature = (e: L.LeafletMouseEvent) => {
    const layer = e.target;
    const districtId = layer.feature?.properties?.AC_CODE;
    const district = layer.feature?.properties?.AC_NAME;

    setSelectedDistrictId(districtId || "")
    setSelectedDistrict(district || ""); // Set the selected district
    // setSelectedConstituency(district || "")
    setMarker({
      position: e.latlng as L.LatLngExpression,
      popupText: district || null,
    });

    // Zoom into the selected district
    const bounds = layer.getBounds();
    mapRef.current?.fitBounds(bounds, { maxZoom: 14 }); // Adjust maxZoom as needed
  };

  const handleMouseOver = (e: L.LeafletMouseEvent) => {
   
    const layer = e.target;
    layer.openTooltip();
    // layer.setStyle({
    //   fillOpacity: 0.8,
    // });
  
  };

  const handleMouseOut = (e: L.LeafletMouseEvent) => {
    if(!selectedDistrictId){
    const layer = e.target;
    layer.setStyle({
      fillOpacity: 1,
    });
  }
  };

  const styleFeature = (feature?: Feature<Geometry, GeoJsonProperties>) => {
    if (!feature) return {};

    const party = feature.properties?.party;
    let fillColor;
    if (party === "BJP") {
      fillColor = "#FF9900";
    } else if (party === "INC") {
      fillColor = "#4DB6E2";
    } else if (party === "CONGRESS") {
      fillColor = "#006400";
    } else {
      fillColor = "#808080";
    }

    const districtId = feature.properties?.AC_CODE;
    // const district = feature.properties?.seat_district_en;
    const fillOpacity = selectedDistrictId && districtId !== selectedDistrictId ? 0 : 1;
    const borderColor = selectedDistrictId && districtId !== selectedDistrictId ? "transparent" : "#000";

    // Hide non-selected districts by setting fillOpacity to 0
    return {
      fillColor: fillColor || "#a9a5a5",
      color: borderColor,
      weight: 0.8,
      fillOpacity: fillOpacity,
      interactive: !selectedDistrictId || districtId === selectedDistrictId,
      transition: "all 0.3s ease",
    } as L.PathOptions;
  };

  const onEachFeature = (
    feature: Feature<Geometry, GeoJsonProperties>,
    layer: L.Layer
  ) => {
    if (feature.properties && feature.properties.AC_NAME) {
      layer.bindTooltip(feature.properties.AC_NAME, {
        permanent: false,
        direction: "top",
        className: "custom-tooltip",
      });
      layer.on({
        click: highlightFeature,
        mouseover: handleMouseOver,
        // mouseout: handleMouseOut,
      });
    }
  };

  const resetMap = () => {
    setSelectedDistrictId(null);  // Reset the selected district
    setSelectedDistrict(null)
    setMarker(null);  // Clear the marker
    setMapSize({ height: height, width: width });  // Reset the map size
    

    // Reset the map view to the initial center and zoom level
    if (mapRef.current) {
      mapRef.current.setView([29.06, 76.04], zoom);
    }
  };

  const Legend = () => (
    <div
      style={{
        position: "absolute",
        bottom: "10px",
        right: "230px",
        padding: "10px",
        zIndex: 10,
        fontSize: "10px",
      }}
    >
      <h4>NDA</h4>
      <div className="legend-text">
        <span
          style={{
            backgroundColor: "#FF9900",
            width: "15px",
            height: "15px",
            display: "inline-block",
          }}
        ></span>
        <span>BJP ({partyCounts.BJP})</span>
      </div>
      <h4>UPA</h4>
      <div className="legend-text">
        <span
          style={{
            backgroundColor: "#4DB6E2",
            width: "15px",
            height: "15px",
            display: "inline-block",
          }}
        ></span>
        <span>INC ({partyCounts.INC})</span>
      </div>
      <h4>OTHERS</h4>
      <div className="legend-text">
        <span
          style={{
            backgroundColor: "#006400",
            width: "15px",
            height: "15px",
            display: "inline-block",
          }}
        ></span>
        <span>CONGRESS ({partyCounts.CONGRESS})</span>
      </div>
      <div className="legend-text">
        <span
          style={{
            backgroundColor: "#808080",
            width: "15px",
            height: "15px",
            display: "inline-block",
          }}
        ></span>
        <span>OTHERS ({partyCounts.OTHERS})</span>
      </div>
    </div>
  );

  return (
    <div
      style={{
        height: mapSize.height,
        width: mapSize.width,
        position: "relative",
        marginBottom: "10px",
      }}
    >
      <HomeIcon onClick={resetMap} style={{width:'40px',height:'40px',cursor:'pointer', border:'none', background:'#c6c6c6',padding:'6px',borderRadius:'2px', position: "absolute", top: "10px", left: "10px", zIndex: 1000 }} />
      <MapContainer
        center={[29.06, 76.04]}
        zoom={zoom}
        style={{
          height: "100%",
          width: "100%",
          background: "none",
          marginLeft: "50px",
        }}
        scrollWheelZoom={false}
        keyboard={false}
        zoomControl={false}
        attributionControl={false}
        doubleClickZoom={false}
        dragging={false}
        ref={mapRef} // Attach the mapRef
      >
        <GeoJSON
          data={geojson}
          style={styleFeature}
          onEachFeature={onEachFeature}
        />
        {marker?.position && (
          <Marker position={marker.position}>
            <Tooltip permanent opacity={1}>
              <strong>{selectedDistrict}</strong>
            </Tooltip>
            {/* <Popup>
              <div>
                <img
                  src={marker.imageUrl}
                  alt={marker.popupText}
                  style={{ width: "100px", height: "auto" }}
                />
                <br />
                <strong>{marker.popupText}</strong>
                <br />
                Country: {marker.country}
              </div>
            </Popup> */}
          </Marker>
        )}
      </MapContainer>
      <Legend />
    </div>
  );
};

export default HaryanaMapWise;
