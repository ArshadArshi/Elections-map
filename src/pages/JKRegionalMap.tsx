import React, { useState, useRef } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geojsonData from "../../j_and_k_assembly_new_borders.json";
import L from "leaflet";
import {
  FeatureCollection,
  Feature,
  Geometry,
  GeoJsonProperties,
} from "geojson";
import { HomeIcon } from "@radix-ui/react-icons"; // Import the HomeIcon or any icon you prefer

interface Props {
  height: string;
  width: string;
  zoom: number;
}

const geojson: FeatureCollection<Geometry, GeoJsonProperties> =
  geojsonData as FeatureCollection<Geometry, GeoJsonProperties>;

const JKRegionalMap: React.FC<Props> = ({ height, width, zoom }) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const mapRef = useRef<L.Map>(null); // Reference to the map
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null); // Reference to the GeoJSON layer

  const highlightFeature = (e: L.LeafletMouseEvent) => {
    const layer = e.target;
    const region = layer.feature.properties?.region;
  
    setSelectedRegion(region);

    const bounds = layer.getBounds();
    mapRef.current?.fitBounds(bounds, { maxZoom: 7 }); // Adjust maxZoom as needed

     // Disable clicks on all layers once a region is selected
     if (geoJsonLayerRef.current) {
      geoJsonLayerRef.current.eachLayer((layer: any) => {
        layer.off("click");
      });
    }
  };

  // Style based on selected region
  const styleFeature = (feature?: Feature<Geometry, GeoJsonProperties>) => {
    if (!feature) return {};

    const region = feature.properties?.region;
    let fillColor;
    let borderColor = "#000"; // Default black border

    if (selectedRegion === null) {
      // Default colors for all regions with a black border
      fillColor =
        region === "Jammu" ? "#FF9900" : region === "Kashmir" ? "#4DB6E2" : "#808080";
    } else if (region === selectedRegion) {
      // Highlight selected region with a color
      fillColor = region === "Jammu" ? "#FF9900" : "#4DB6E2";
      borderColor = "#000"; // Keep black border for selected region
    } else {
      // Hide non-selected regions (transparent)
      fillColor = "transparent";
      borderColor = "transparent"; // No border for unselected regions
    }

    return {
      fillColor: fillColor || "#a9a5a5",
      color: borderColor,
      weight: 0.8,
      fillOpacity: region === hoveredRegion ? 0.3 : 1,
    } as L.PathOptions;
  };

  // Filter features based on the selected region
  const filteredGeojson: FeatureCollection<Geometry, GeoJsonProperties> = {
    type: "FeatureCollection",
    features: geojson.features, // No filtering, always show both regions
  };

  const onEachFeature = (
    feature: Feature<Geometry, GeoJsonProperties>,
    layer: L.Layer
  ) => {
    const region = feature.properties?.region
    if (region) {
        layer.bindTooltip(region, {
            permanent: false,
            direction: "top",
          });
      layer.on({
        click: highlightFeature,
      });
    }
  };

  const resetMap = () => {
    setSelectedRegion(null); // Reset the selected region
    if (mapRef.current) {
      mapRef.current.setView([33.7, 75.01], zoom); // Reset to initial center and zoom level
    }
     // Re-enable clicks on all layers after resetting
     if (geoJsonLayerRef.current) {
      geoJsonLayerRef.current.eachLayer((layer: any) => {
        layer.on("click", highlightFeature);
      });
    }
  };

  return (
    <div style={{ position: "relative" }}>
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
      <div style={{ width: width, height: height }}>
        <MapContainer
          zoom={zoom}
          center={[33.7, 75.01]}
          style={{ height: "100%", width: "100%", background: 'none' }}
          scrollWheelZoom={false}
          keyboard={false}
          zoomControl={false}
          attributionControl={false}
          doubleClickZoom={false}
          dragging={false}
          ref={mapRef} // Attach the mapRef
        >
          <GeoJSON 
            data={filteredGeojson} 
            style={styleFeature} 
            onEachFeature={onEachFeature}
            ref={geoJsonLayerRef} // Attach ref to access the GeoJSON layer
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default JKRegionalMap;
