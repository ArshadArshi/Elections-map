import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import JammuMap from "./JammuMap";
import "./Main.css";
import { useEffect, useState } from "react";
import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import geojsonData from "../../j_and_k_assembly_new_borders.json";
import TableData from "./TableData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Cards from "./Cards";
import PieChart from "./PieChart";
import ProgressBar from "./ProgressBar";
import JammuMapWise from "./JammuMapWise";
import Haryanamap from "./Haryanamap";
import geojsonItem from "../../Haryana_AC.json"

export default function Dashboard() {
  const [bjpCount, setBjpCount] = useState(0);
  const [incCount, setIncCount] = useState(0);
  const [congressCount, setCongressCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);
  const[selectedConstituency,setSelectedConstituency] =  useState<string | undefined>(undefined);
  const geojson: FeatureCollection<Geometry, GeoJsonProperties> =
    geojsonData as FeatureCollection<Geometry, GeoJsonProperties>;


    const [bjpHCount, setBjpHCount] = useState(0);
  const [incHCount, setIncHCount] = useState(0);
  const [congressHCount, setCongressHCount] = useState(0);
  const [otherHCount, setOtherHCount] = useState(0);
  const geojsonitem : FeatureCollection<Geometry,GeoJsonProperties> = geojsonItem as FeatureCollection<Geometry,GeoJsonProperties>

  useEffect(() => {
    // Count the number of features for each party
    const bjpHCount = geojsonitem.features.filter(
      (feature) => feature.properties?.party === "BJP"
    ).length;

    const incHCount = geojsonitem.features.filter(
      (feature) => feature.properties?.party === "INC"
    ).length;

    // const congressCount = geojson.features.filter(
    //   (feature) => feature.properties?.party === "CONGRESS" && ""
    // ).length;

    const otherHCount =
      geojsonitem.features.filter((feature) => feature.properties?.party === "")
        .length +
      geojson.features.filter(
        (feature) => feature.properties?.party === "CONGRESS"
      ).length;

    setBjpHCount(bjpHCount);
    setIncHCount(incHCount);
    setCongressHCount(congressHCount);
    setOtherHCount(otherHCount);
  }, [setBjpHCount, setIncHCount, setCongressHCount, setOtherHCount]);

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
      <div>
          <ProgressBar/>
        </div>
      <div className="flex justify-between mb-10 z-0">
      <div className="font-bold text-black">MAP
        <JammuMapWise height="350px" width="350px" zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} />
      </div>
        <div className="font-bold text-black">VOTE SHARE
        <PieChart />
        </div>
     <Cards />
      </div>
      {/* <div className="flex justify-between mb-10 z-0">
        <div className="font-bold text-black">MAP
        <JammuMap setSelectedConstituency={setSelectedConstituency} height="350px" width="350px" zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} />
        </div>
        <div className="font-bold text-black">VOTE SHARE
        
        </div>
      </div> */}
      <div style={{display:'flex',width:'100%',justifyContent:'space-between',marginBottom:'30px'}}>
       <div style={{display:'flex',justifyContent:'center',alignItems:'center', zIndex:0}}> <JammuMap setSelectedConstituency={setSelectedConstituency} height="350px" width="350px" zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} /> </div>
        <TableData selectedConstituency={selectedConstituency} />
      </div>
      <div style={{display:'flex',width:'100%',justifyContent:'space-between',marginBottom:'30px'}}>
       <div style={{display:'flex',justifyContent:'center',alignItems:'center', zIndex:0}}> <JammuMap setSelectedConstituency={setSelectedConstituency} height="350px" width="350px" zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0}  /> </div>
        <TableData selectedConstituency={selectedConstituency} />
      </div>
      <div style={{display:'flex',width:'100%',justifyContent:'space-between',marginBottom:'30px'}}>
       <div style={{display:'flex',justifyContent:'center',alignItems:'center',zIndex:0}}> <JammuMap setSelectedConstituency={setSelectedConstituency} height="350px" width="350px" zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} /> </div>
        <TableData selectedConstituency={selectedConstituency} />
      </div>
      <div className="flex justify-start items-center mb-5">
      <Tabs defaultValue="JAMMU & KASHMIR" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="JAMMU & KASHMIR">JAMMU & KASHMIR</TabsTrigger>
        <TabsTrigger value="HARYANA">HARYANA</TabsTrigger>
      </TabsList>
      <TabsContent value="JAMMU & KASHMIR">
      <div style={{ display: "flex", justifyContent:"space-around" }}>
        <div className="flex flex-col mr-[75px]">
          <div className="w-3/4 h-6 text-white flex items-center justify-center" style={{background:'#4c4c4d',fontWeight:'bold'}}>Legislative Assembly Map</div>
          <div className="w-1/2 flex justify-start items-center text-xs mt-5">J&K Legislative Assembly Election 2024</div>
          <JammuMapWise
            height="350px"
            width="350px"
            zoom={7}
            bjpCount={0}
            incCount={0}
            congressCount={0}
            otherCount={0} />
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
        <div className="flex flex-col mr-[75px]">
        <div className="w-1/2 h-6 text-white flex items-center justify-center" style={{background:'#4c4c4d',fontWeight:'bold'}}>District Map</div>
        <div className="w-1/2 flex justify-start items-center text-xs mt-5">J&K Legislative Assembly Election 2024</div>
          <JammuMapWise
            height="350px"
            width="350px"
            zoom={7}
            bjpCount={0}
            incCount={0}
            congressCount={0}
            otherCount={0} />
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
        <div>
        <div className="w-1/2 h-6 text-white flex items-center justify-center" style={{background:'#4c4c4d',fontWeight:'bold'}}>Regional Map</div>
        <div className="w-1/2 flex justify-start items-center text-xs mt-5">J&K Legislative Assembly Election 2024</div>
          <JammuMapWise
            height="350px"
            width="350px"
            zoom={7}
            bjpCount={0}
            incCount={0}
            congressCount={0}
            otherCount={0} />
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
      </div>
      </TabsContent>
      <TabsContent value="HARYANA">
        <div style={{ display: "flex", justifyContent:"space-around" }}>
      <div className="flex flex-col mr-[75px]">
      <div className="w-3/4 h-6 text-white flex items-center justify-center" style={{background:'#4c4c4d',fontWeight:'bold'}}>Legislative Assembly Map</div>
        <div className="w-1/2 flex justify-start items-center text-xs mt-5">Haryana Legislative Assembly Election 2024</div>
        <Haryanamap height="400px" width="350px" zoom={7} bjpHCount={0} incHCount={0} congressHCount={0} otherHCount={0} />
        <div className="count">
            <div className="countone">
              <div className="bjp">BJP</div>
              <div className="bjp-count">{bjpHCount}</div>
            </div>
            <div className="counttwo">
              <div className="inc">INC</div>
              <div className="inc-count">{incHCount}</div>
            </div>
            {/* <div className="countothers">
      <div className="other">CONGRESS</div>
      <div className="other-count">{congressCount}</div>
      </div> */}
            <div className="countothers">
              <div className="other">OTHERS</div>
              <div className="other-count">{otherHCount}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mr-[75px]">
        <div className="w-1/2 h-6 text-white flex items-center justify-center" style={{background:'#4c4c4d',fontWeight:'bold'}}>District Map</div>
        <div className="w-1/2 flex justify-start items-center text-xs mt-5">Haryana Legislative Assembly Election 2024</div>
          <Haryanamap
            height="400px"
            width="350px"
            zoom={7}
            bjpHCount={0}
            incHCount={0}
            congressHCount={0}
            otherHCount={0} />
          <div className="count">
            <div className="countone">
              <div className="bjp">BJP</div>
              <div className="bjp-count">{bjpHCount}</div>
            </div>
            <div className="counttwo">
              <div className="inc">INC</div>
              <div className="inc-count">{incHCount}</div>
            </div>
            {/* <div className="countothers">
      <div className="other">CONGRESS</div>
      <div className="other-count">{congressCount}</div>
      </div> */}
            <div className="countothers">
              <div className="other">OTHERS</div>
              <div className="other-count">{otherHCount}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mr-[75px]">
        <div className="w-1/2 h-6 text-white flex items-center justify-center" style={{background:'#4c4c4d',fontWeight:'bold'}}>Regional Map</div>
        <div className="w-1/2 flex justify-start items-center text-xs mt-5">Haryana Legislative Assembly Election 2024</div>
          <Haryanamap
            height="400px"
            width="350px"
            zoom={7}
            bjpHCount={0}
            incHCount={0}
            congressHCount={0}
            otherHCount={0} />
          <div className="count">
            <div className="countone">
              <div className="bjp">BJP</div>
              <div className="bjp-count">{bjpHCount}</div>
            </div>
            <div className="counttwo">
              <div className="inc">INC</div>
              <div className="inc-count">{incHCount}</div>
            </div>
            {/* <div className="countothers">
      <div className="other">CONGRESS</div>
      <div className="other-count">{congressCount}</div>
      </div> */}
            <div className="countothers">
              <div className="other">OTHERS</div>
              <div className="other-count">{otherHCount}</div>
            </div>
          </div>
        </div>
        </div>
      </TabsContent>
      </Tabs>
      </div>
    </>
  );
}
