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
import MultipleTabs from "./Multipletabs";
import SemiCircleChart from "./SemiCircleChart";
import twostates from '../assets/2states.png'
import news from '../assets/news.png'

const Dashboard: React.FC = () => {
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
      {/* <PageHeader className="flex justify-center items-center font-bold">
        <PageHeaderHeading className="w-[300px]">ELECTIONS RESULTS</PageHeaderHeading>
      </PageHeader> */}
      <div className="flex w-[100%] justify-between items-center mb-10">
      <div className="w-[33.3%] flex flex-col justify-center items-center">
        <SemiCircleChart />
        <ProgressBar />
      </div>
      <div className="w-[33.3%]">
      <div className="flex flex-col mt-[-10px]">
      <Tabs defaultValue="ENGLISH" className="w-[400px]">
        <TabsList className="bg-hidden grid grid-cols-2 text-white font-bold gap-1">
          <TabsTrigger style={{fontSize:'30px',color:'white',padding:'15px'}} value="ENGLISH">ENGLISH</TabsTrigger>
          <TabsTrigger style={{fontSize:'30px',color:'white',padding:'15px'}} value="HINDI">HINDI</TabsTrigger>
        </TabsList>
      </Tabs>
     <div className="relative top-[17px]">
        <img src={twostates} alt="" />
        <div className="live-blog-container absolute top-[165px] left-[50px]">
  <span className="live-text">| LIVE</span> <span className="blog-text">BLOG </span>
  <span className="live-dot"> </span> <span className="live-text">|</span> 
  </div>
  </div>
  <img className="mt-10" src={news} alt="" />
</div>
      
      </div>
      <div className="w-[33.3%] flex flex-col justify-enter items-center">
        <SemiCircleChart />
        <ProgressBar />
      </div>
      </div>
        <MultipleTabs />
      {/* <div>
          <ProgressBar/>
        </div> */}
      <div className="flex justify-between mb-10 z-0">
      <div className="font-bold text-black">MAP
        <JammuMap height="350px" width="350px" zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} />
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
      {/* <div style={{display:'flex',width:'100%',justifyContent:'space-between',marginBottom:'30px'}}>
       <div style={{display:'flex',justifyContent:'center',alignItems:'center', zIndex:0}}> <JammuMap setSelectedConstituency={setSelectedConstituency} height="350px" width="350px" zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} /> </div>
        <TableData selectedConstituency={selectedConstituency} />
      </div> */}
      {/* <div style={{display:'flex',width:'100%',justifyContent:'space-between',marginBottom:'30px'}}>
       <div style={{display:'flex',justifyContent:'center',alignItems:'center', zIndex:0}}> <JammuMap setSelectedConstituency={setSelectedConstituency} height="350px" width="350px" zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0}  /> </div>
        <TableData selectedConstituency={selectedConstituency} />
      </div> */}
      {/* <div style={{display:'flex',width:'100%',justifyContent:'space-between',marginBottom:'30px'}}>
       <div style={{display:'flex',justifyContent:'center',alignItems:'center',zIndex:0}}> <JammuMap setSelectedConstituency={setSelectedConstituency} height="350px" width="350px" zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} /> </div>
        <TableData selectedConstituency={selectedConstituency} />
      </div> */}
      
    </>
  );
}

export default Dashboard
