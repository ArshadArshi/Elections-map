import React, { useEffect, useState } from "react";
import { MapContainer, GeoJSON, Marker, Tooltip, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geojsonData from "../../j_and_k_assembly_new_borders.json";
import {
  FeatureCollection,
  Feature,
  Geometry,
  GeoJsonProperties,
} from "geojson";
import L from "leaflet";

interface Props {
  height: string;
  width: string;
  zoom: number;
  bjpCount: number;
  incCount: number;
  congressCount: number;
  otherCount: number;
}

type DistrictKeys = {
  dist: string;
  party: string;
  color: string;
  opacity?: number;
};

const geojson: FeatureCollection<Geometry, GeoJsonProperties> =
  geojsonData as FeatureCollection<Geometry, GeoJsonProperties>;

const JammuMap: React.FC<Props> = ({ height, width, zoom }) => {
  const [color, setColor] = useState<DistrictKeys[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [marker, setMarker] = useState<{
    position: L.LatLngExpression;
    popupText: string;
    country: string;
    imageUrl: string;
  } | null>(null);

  useEffect(() => {
    setColor((prev) => {
      prev.map((item) => (item.opacity = 0.5));
      return prev;
    });
  }, []);

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
    const district = layer.feature?.properties?.seat_district_en;
    const country = layer.feature?.properties?.country;
    const imageUrl = layer.feature?.properties?.imageUrl;

    setColor((prev) => {
      prev.map((item) => {
        if (item.party === district) item.opacity = 1;
        else item.opacity = 0.5;
      });
      return prev;
    });
    setSelected(district || ""); // Set the selected district
    setMarker({
      position: e.latlng as L.LatLngExpression,
      popupText: district || "",
      country: country,
      imageUrl: imageUrl,
    });
  };

  const handleMouseOver = (e: L.LeafletMouseEvent) => {
    const layer = e.target;
    layer.setStyle({
      fillOpacity: 0.8,
    });
  };

  const handleMouseOut = (e: L.LeafletMouseEvent) => {
    const layer = e.target;
    layer.setStyle({
      fillOpacity: 1,
    });
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

    return {
      fillColor: fillColor || "#a9a5a5",
      color: "#000",
      weight: 0.5,
      fillOpacity: 1,
      transition: "all 0.3s ease",
    } as L.PathOptions;
  };

  const onEachFeature = (
    feature: Feature<Geometry, GeoJsonProperties>,
    layer: L.Layer
  ) => {
    if (feature.properties && feature.properties.seat_district_en) {
      layer.on({
        click: highlightFeature,
        mouseover: handleMouseOver,
        mouseout: handleMouseOut,
      });
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
        height: height,
        width: width,
        position: "relative",
        marginBottom: "10px",
      }}
    >
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
        attributionControl={false}
        doubleClickZoom={false}
        dragging={false}
      >
        <GeoJSON
          data={geojson}
          style={styleFeature}
          onEachFeature={onEachFeature}
        />
        {marker?.position && (
          <Marker
            position={marker.position}
          >
            <Tooltip permanent opacity={1}>
              <strong>{selected}</strong>
            </Tooltip>
            <Popup>
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
            </Popup>
          </Marker>
        )}
      </MapContainer>
      <Legend />
    </div>
  );
};

export default JammuMap;
