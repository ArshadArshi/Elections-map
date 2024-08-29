import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import JammuMap from "./JammuMap";
import "./Main.css";
import { useEffect, useState } from "react";
import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import geojsonData from "../../j_and_k_assembly_new_borders.json";

export default function Dashboard() {
  const [bjpCount, setBjpCount] = useState(0);
  const [incCount, setIncCount] = useState(0);
  const [congressCount, setCongressCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);

  const geojson: FeatureCollection<Geometry, GeoJsonProperties> =
    geojsonData as FeatureCollection<Geometry, GeoJsonProperties>;

  useEffect(() => {
    // Count the number of features for each party
    const bjpCount = geojson.features.filter(
      (feature) => feature.properties?.party === "BJP"
    ).length;

    const incCount = geojson.features.filter(
      (feature) => feature.properties?.party === "INC"
    ).length;

    // const congressCount = geojson.features.filter(
    //   (feature) => feature.properties?.party === "CONGRESS" && ""
    // ).length;

    const otherCount =
      geojson.features.filter((feature) => feature.properties?.party === "")
        .length +
      geojson.features.filter(
        (feature) => feature.properties?.party === "CONGRESS"
      ).length;

    setBjpCount(bjpCount);
    setIncCount(incCount);
    setCongressCount(congressCount);
    setOtherCount(otherCount);
  }, [setBjpCount, setIncCount, setCongressCount, setOtherCount]);

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Articles</PageHeaderHeading>
      </PageHeader>
      <div style={{ display: "flex", zIndex: "5" }}>
        <div>
          <JammuMap
            height="350px"
            width="350px"
            zoom={7}
            bjpCount={0}
            incCount={0}
            congressCount={0}
            otherCount={0}
          />
          <div className="count">
            <div className="countone">
              <div className="bjp">BJP</div>
              <div className="bjp-count">{bjpCount}</div>
            </div>
            <div className="counttwo">
              <div className="inc">INC</div>
              <div className="inc-count">{incCount}</div>
            </div>
            {/* <div className="countothers">
      <div className="other">CONGRESS</div>
      <div className="other-count">{congressCount}</div>
      </div> */}
            <div className="countothers">
              <div className="other">OTHERS</div>
              <div className="other-count">{otherCount}</div>
            </div>
          </div>
        </div>
        {/* <JammuMap height="350px" width="350px" zoom={7} /> */}
        {/* <JammuMap height="350px" width="350px" zoom={7} /> */}
      </div>
      <div
        style={{
          position: "fixed",
          right: "20px",
          top: "25%",
          width: "200px",
          height: "200px",
          backgroundColor: "#9DBDFF",
        }}
      >
        <p
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: "20px",
            color: "black",
          }}
        >
          hi there
        </p>
      </div>
    </>
  );
}
