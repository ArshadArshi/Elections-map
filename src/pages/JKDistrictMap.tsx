import React, { useRef, useState } from "react";
import { MapContainer, GeoJSON, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geojsonData from "../../j_and_k_assembly_new_borders.json";
import {
  FeatureCollection,
  Feature,
  Geometry,
  GeoJsonProperties,
} from "geojson";
import L from "leaflet";
import { HomeIcon } from "@radix-ui/react-icons";
// import markIcon from '../assets/mapmarker.png'

interface Props {
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

const JKDistrictMap: React.FC<Props> = ({ height, width, zoom }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [marker, setMarker] = useState<{
    position: L.LatLngExpression;
    popupText: string;
  } | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const mapRef = useRef<L.Map>(null); // Reference to the map
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null); // Reference to the GeoJSON layer

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
    const district = layer.feature.properties?.seat_district_en;
    
    // Update selected region
    setSelectedRegion(district);
  
    // Get the map and the bounds of the selected region
    const bounds = layer.getBounds();
  
    // Ensure the mapRef is not null and fit the map to the bounds of the selected region
    if (mapRef.current) {
      mapRef.current.fitBounds(bounds, { maxZoom: 14 }); // Adjust maxZoom as needed
    }
  
    // Disable clicks on all layers once a region is selected
    if (geoJsonLayerRef.current) {
      geoJsonLayerRef.current.eachLayer((layer: any) => {
        layer.off("click");
      });
    }
  };
  // const handleMouseOver = (e: L.LeafletMouseEvent) => {
  //   const layer = e.target;
  //   layer.openTooltip();
  //   layer.setStyle({
  //     fillOpacity: 0.8,
  //   });
  // };

  // const handleMouseOut = (e: L.LeafletMouseEvent) => {
  //   const layer = e.target;
  //   layer.setStyle({
  //     fillOpacity: 1,
  //   });
  // };

  const styleFeature = (feature?: Feature<Geometry, GeoJsonProperties>) => {
    if (!feature) return {};
  
    const district = feature.properties?.seat_district_en;
    let fillColor;
    let borderColor = "#000"; // Default black border
  
    // Define color for each district based on the original district
    fillColor = district === "Kupwara" 
      ? "#FF9900" 
      : district === "Baramulla"
      ? "#4DB6E2"
      : district === "Bandipora"
      ? "#006400"
      : district === "Ganderbal"
      ? "fuchsia"
      : district === "Srinagar"
      ? "yellow"
      : district === "Budgam"
      ? "darkviolet"
      : district === "Pulwama"
      ? "red"
      : district === "Shopian"
      ? "darkblue"
      : district === "Kulgam"
      ? "brown"
      : district === "Anantnag"
      ? "aqua"
      : district === "Kishtwar"
      ? "lightgreen"
      : district === "Doda"
      ? "crimson"
      : district === "Ramban"
      ? "#808000"
      : district === "Reasi"
      ? "#7FFFD4"
      : district === "Udhampur"
      ? "#008080"
      : district === "Kathua"
      ? "#F0E68C"
      : district === "Samba"
      ? "#DAA520"
      : district === "Jammu"
      ? "indigo"
      : district === "Rajouri"
      ? "#FF69B4"
      : district === "Poonch"
      ? "#FFF8DC"
      : "#808080"; // Default color if district not found
  
    if (district === selectedRegion) {
      // When the region is selected, use the same color without changing
      borderColor = "#000"; // Black border for selected region
  
    } else if (selectedRegion !== null) {
      // Hide non-selected regions when a region is selected
      fillColor = "transparent"; // Transparent fill for non-selected regions
      borderColor = "transparent"; // No border for unselected regions
    }
  
    return {
      fillColor: fillColor || "#a9a5a5",
      color: borderColor,
      weight: 0.8, // Adjust border thickness
      fillOpacity: district === hoveredRegion ? 0.3 : 1, // Lower opacity when hovered
      transition: "all 0.3s ease", // Smooth transition
    } as L.PathOptions;
  };
  
  

  const filteredGeojson: FeatureCollection<Geometry, GeoJsonProperties> = {
    type: "FeatureCollection",
    features: geojson.features, // No filtering, always show both regions
  };

  const onEachFeature = (
    feature: Feature<Geometry, GeoJsonProperties>,
    layer: L.Layer
  ) => {
    const district = feature.properties?.seat_district_en
    if (district) {
        layer.bindTooltip(district, {
            permanent: false,
            direction: "top",
          });
      layer.on({
        click: highlightFeature,
        // mouseover:handleMouseOver,
        // mouseout:handleMouseOut,
      });
    }
  };

  const resetMap = () => {
    // Reset the selected region and zoom level
    setSelectedRegion(null);
    
    // Reset the map to its original center and zoom
    if (mapRef.current) {
      mapRef.current.setView([33.7, 75.01], zoom); // Reset to initial center and zoom level
    }
  
    // Re-enable clicks on all layers after resetting
    if (geoJsonLayerRef.current) {
      geoJsonLayerRef.current.eachLayer((layer: any) => {
        layer.on("click", highlightFeature); // Reattach the click handler
      });
    }
  };

    // const markerIcon = new L.Icon({
    //   iconUrl: markIcon,
    //   iconSize: [35, 45],
    //   iconAnchor: [17, 46],
    //   popupAnchor: [0, -46],
    // })

  const Legend = () => (
    <div
      style={{
        position: "absolute",
        bottom: "10px",
        right: "230px",
        // backgroundColor: "white",
        padding: "10px",
        // borderRadius: "5px",
        // boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
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
        height: height,
        width: width,
        position: "relative",
        marginBottom: "10px",
      }}
    >
       <HomeIcon
        onClick={resetMap}
        style={{
          width: '40px',
          height: '40px',
          cursor: 'pointer',
          border: 'none',
          background: '#c6c6c6',
          padding: '6px',
          borderRadius: '2px',
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1000,
        }}
      />
      <MapContainer
        center={[33.7, 75.01]}
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
        doubleClickZoom={false}
        dragging={false}
        attributionControl={false}
      >
        <GeoJSON
           data={filteredGeojson} 
           style={styleFeature} 
           onEachFeature={onEachFeature}
           ref={geoJsonLayerRef} // Attach ref to access the GeoJSON layer
        />
        {marker?.position && (
          <Marker
            position={marker.position}
            // eventHandlers={{ mouseover: handleMouseOver, mouseout: handleMouseOut }}
          >
            <Tooltip permanent opacity={1}>
              <strong>{selected}</strong>
            </Tooltip>
          </Marker>
        )}
      </MapContainer>
      <Legend />
    </div>
  );
};

export default JKDistrictMap;


