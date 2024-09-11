import React, { useState } from "react";
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

    setSelected(district || ""); // Set the selected district
    setMarker({
      position: e.latlng as L.LatLngExpression,
      popupText: district || "",
    });
  };

  const handleMouseOver = (e: L.LeafletMouseEvent) => {
    const layer = e.target;
    layer.openTooltip();
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

    const district = feature.properties?.seat_district_en;
    let fillColor;
    if (district === "Kupwara") {
      fillColor = "#FF9900";
    } else if (district === "Baramulla") {
      fillColor = "#4DB6E2";
    } else if (district === "Bandipora") {
      fillColor = "#006400";
    } else if (district === "Ganderbal") {
        fillColor = "fuchsia";
      } else if (district === "Srinagar") {
        fillColor = "yellow";
      } else if (district === "Budgam") {
        fillColor = "darkviolet";
      } else if (district === "Pulwama") {
        fillColor = "red";
      } else if (district === "Shopian") {
        fillColor = "darkblue";
      } else if (district === "Kulgam") {
        fillColor = "brown";
      } else if (district === "Anantnag") {
        fillColor = "aqua";
      } else if (district === "Kishtwar") {
        fillColor = "lightgreen";
      } else if (district === "Doda") {
        fillColor = "crimson";
      } else if (district === "Ramban") {
        fillColor = "#808000";
      } else if (district === "Reasi") {
        fillColor = "#7FFFD4";
      } else if (district === "Udhampur") {
        fillColor = "#008080";
      } else if (district === "Kathua") {
        fillColor = "#F0E68C";
      } else if (district === "Samba") {
        fillColor = "#DAA520";
      } else if (district === "Jammu") {
        fillColor = "indigo";
      } else if (district === "Rajouri") {
        fillColor = "#FF69B4";
      } else if (district === "Poonch") {
        fillColor = "#FFF8DC";
      } 
    else {
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
        layer.bindTooltip(feature.properties.seat_district_en, {
            permanent: false,
            direction: "top",
          });
      layer.on({
        click: highlightFeature,
        mouseover:handleMouseOver,
        mouseout:handleMouseOut,
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
          data={geojson}
          style={styleFeature}
          onEachFeature={onEachFeature}
        />
        {marker?.position && (
          <Marker
            position={marker.position}
            eventHandlers={{ mouseover: handleMouseOver, mouseout: handleMouseOut }}
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


