import { MapContainer, GeoJSON, Marker, Tooltip } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import geojsonData from '../../Haryana2019.json'
import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import { useState } from "react";
import L from 'leaflet'
import "./Main.css"

interface Props {
  height: string;
  width: string;
  zoom: number;
}

const geojson : FeatureCollection<Geometry, GeoJsonProperties> = geojsonData as FeatureCollection<Geometry, GeoJsonProperties>

const HaryanaHistoryMap: React.FC<Props> = ({ height, width, zoom }) => {
const [selected, setSelected] = useState<string | null>(null);
const [marker, setMarker] = useState<{
    position: L.LatLngExpression;
    popupText: string;
  } | null>(null);

 

  const highlightFeature = (e: L.LeafletMouseEvent) => {
    const layer = e.target;
    const district = layer.feature?.properties?.AC_NAME;

    setSelected(district || ""); // Set the selected district
    setMarker({
      position: e.latlng as L.LatLngExpression,
      popupText: district || "",
    });
  };

  const handleMouseOver = (e: L.LeafletMouseEvent) => {
    const layer = e.target;
    layer.openTooltip()
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
    } else if (party === "HaLP") {
      fillColor = "lightgreen";
    }else if (party === "INLD") {
        fillColor = "green";
      } else if (party === "IND") {
        fillColor = "#808080";
      } else if (party === "JNJP") {
        fillColor = "yellow";
      }  
   

    return {
      fillColor: fillColor || "#a9a5a5",
      color: "#000",
      weight: 0.5,
      fillOpacity: 1,
      transition: "all 0.3s ease",
    } as L.PathOptions;
  };

  // Function to define custom behavior for each feature
  const onEachFeature = (feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer) => {
    if (feature.properties && feature.properties.AC_NAME) {
      layer.bindTooltip(feature.properties.AC_NAME, {
        permanent: false,
        direction: "top",
        className: "custom-tooltip",
      });
      
      layer.on({
        click:highlightFeature,
        mouseover:handleMouseOver,
        mouseout:handleMouseOut,
      }); // Popup with the feature name
    }
  };

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
      {/* <h4>NDA</h4> */}
      <div className="legend-text">
        <span
          style={{
            backgroundColor: "#FF9900",
            width: "15px",
            height: "15px",
            display: "inline-block",
          }}
        ></span>
        <span>BJP</span>
      </div>
      {/* <h4>UPA</h4> */}
      <div className="legend-text">
        <span
          style={{
            backgroundColor: "#4DB6E2",
            width: "15px",
            height: "15px",
            display: "inline-block",
          }}
        ></span>
        <span>INC</span>
      </div>
      {/* <h4>OTHERS</h4> */}
      <div className="legend-text">
        <span
          style={{
            backgroundColor: "green",
            width: "15px",
            height: "15px",
            display: "inline-block",
          }}
        ></span>
        <span>INLD</span>
      </div>
      <div className="legend-text">
        <span
          style={{
            backgroundColor: "lightgreen",
            width: "15px",
            height: "15px",
            display: "inline-block",
          }}
        ></span>
        <span>HaLP</span>
      </div>
      <div className="legend-text">
        <span
          style={{
            backgroundColor: "yellow",
            width: "15px",
            height: "15px",
            display: "inline-block",
          }}
        ></span>
        <span>JNJP</span>
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
        <span>IND</span>
      </div>
    </div>
  );

  return (
    <div style={{height:height,width:width,position:'relative'}}>
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
      >
        <GeoJSON data={geojson} style={styleFeature} onEachFeature={onEachFeature} />
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
  )
}

export default HaryanaHistoryMap