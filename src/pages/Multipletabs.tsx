import { Tabs, TabsList } from "@/components/ui/tabs"
import { TabsContent, TabsTrigger } from "@/components/ui/tabs"
import JammuMap from "./JammuMap"
import PieChart from "./PieChart"
import Haryanamap from "./Haryanamap"
import TableData from "./TableData"
import Cards from "./Cards"
import HaryanaMapWise from "./HaryanaMapWise"
import JammuMapWise from "./JammuMapWise"

function MultipleTabs() {
 
  return (
    <div className="flex justify-center items-center mb-5">
      <Tabs defaultValue="JAMMU & KASHMIR" className="w-full">
        <TabsList className="gird w-full h-full grid-cols-2 mb-4 text-white font-md gap-1">
          <TabsTrigger style={{fontSize:'30px',color:'white'}} className="w-full bg-customRed" value="JAMMU & KASHMIR">JAMMU & KASHMIR</TabsTrigger>
          <TabsTrigger style={{fontSize:'30px',color:'white'}} className="w-full bg-customRed" value="HARYANA">HARYANA</TabsTrigger>
        </TabsList>
        <TabsContent value="JAMMU & KASHMIR">
        <Tabs defaultValue="Phase Wise">
          <TabsList className="gird w-full grid-cols-2 gap-1">
          <TabsTrigger className="w-full h-full" value="Phase Wise">Phase Wise</TabsTrigger>
          <TabsTrigger className="w-full" value="Voter Turnout">Voter Turnout</TabsTrigger>
          <TabsTrigger className="w-full" value="Constituency">Constituency</TabsTrigger>
          <TabsTrigger className="w-full" value="Loksabha Wise">Loksabha Wise</TabsTrigger>
          <TabsTrigger className="w-full" value="District Wise">District Wise</TabsTrigger>
          <TabsTrigger className="w-full" value="Region Wise">Region Wise</TabsTrigger>
          <TabsTrigger className="w-full" value="Comparision">Comparison</TabsTrigger>
          <TabsTrigger className="w-full" value="VIP">VIP</TabsTrigger>
        </TabsList>
        <TabsContent value="Phase Wise">
          <div className="flex justify-between items-center">
          <div className="w-1/2 z-0">
          <JammuMap height={"350px"} width={"350px"} zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} />
          </div>
          <div className="w-[700px]">
            <TableData />
          </div>
          </div>
        </TabsContent>
        <TabsContent value="Voter Turnout">
        <div className="flex justify-between items-center mt-4">
          <div className="w-1/2 z-0">
          <JammuMap  height={"350px"} width={"350px"} zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} />
          </div>
          </div>
        </TabsContent>
        <TabsContent value="Constituency">
          <div className="flex justify-between items-center mt-4">
          <div className="w-1/2 z-0">
          <JammuMap  height={"350px"} width={"350px"} zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} />
          </div>
          <div className="w-1/2">
            <PieChart/>
          </div>
          </div>
        </TabsContent>
        <TabsContent value="Loksabha Wise">
        <div className="flex justify-between items-center mt-4">
          <div className="w-1/2 z-0">
          <JammuMap  height={"350px"} width={"350px"} zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} />
          </div>
          </div>
        </TabsContent>
        <TabsContent value="District Wise">
        <div className="flex justify-between items-center mt-4">
          <div className="w-1/2 z-0">
          <JammuMap  height={"350px"} width={"350px"} zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} />
          </div>
          </div>
        </TabsContent>
        <TabsContent value="Region Wise">
          <div className="w-1/2 z-0">
          <JammuMap  height={"350px"} width={"350px"} zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} />
          </div>
        </TabsContent>
        <TabsContent value="Comparision">
        <div className="flex justify-between items-center mt-4">
          <div className="w-full z-0 flex justify-between ">
          <JammuMapWise  height={"350px"} width={"350px"} zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} />
          <JammuMapWise  height={"350px"} width={"350px"} zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} />
          <JammuMapWise  height={"350px"} width={"350px"} zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} />
          </div>
          </div>
        </TabsContent>
        <TabsContent value="VIP">
        <div className="flex justify-between items-center mt-4">
          <div className="w-1/2 z-0">
          <JammuMap height={"350px"} width={"350px"} zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} />
          </div>
          <div>
            <Cards />
          </div>
          </div>
        </TabsContent>
          </Tabs>
        </TabsContent>
        <TabsContent value="HARYANA">
        <Tabs defaultValue="Phase Wise">
          <TabsList className="gird w-full grid-cols-2">
          <TabsTrigger className="w-full h-full" value="Phase Wise">Phase Wise</TabsTrigger>
          <TabsTrigger className="w-full" value="Voter Turnout">Voter Turnout</TabsTrigger>
          <TabsTrigger className="w-full" value="Constituency">Constituency</TabsTrigger>
          <TabsTrigger className="w-full" value="Loksabha Wise">Loksabha Wise</TabsTrigger>
          <TabsTrigger className="w-full" value="District Wise">District Wise</TabsTrigger>
          <TabsTrigger className="w-full" value="Region Wise">Region Wise</TabsTrigger>
          <TabsTrigger className="w-full" value="Comparision">Comparison</TabsTrigger>
          <TabsTrigger className="w-full" value="VIP">VIP</TabsTrigger>
        </TabsList>
        <TabsContent value="Phase Wise">
        <div className="flex justify-between items-center mt-4">
          <div className="w-1/2 z-0">
          <HaryanaMapWise height={"400px"} width={"350px"} zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} />
          </div>
          </div>
        </TabsContent>
        <TabsContent value="Voter Turnout">
        <div className="flex justify-between items-center mt-4">
          <div className="w-1/2 z-0">
          <Haryanamap height={"400px"} width={"350px"} zoom={7} bjpHCount={0} incHCount={0} congressHCount={0} otherHCount={0} />
          </div>
          </div>
        </TabsContent>
        <TabsContent value="Constituency">
          <div className="flex justify-between items-center mt-4">
          <div className="w-1/2 z-0">
          <Haryanamap height={"400px"} width={"350px"} zoom={7} bjpHCount={0} incHCount={0} congressHCount={0} otherHCount={0} />
          </div>
          <div className="w-1/2">
            <PieChart/>
          </div>
          </div>
        </TabsContent>
        <TabsContent value="Loksabha Wise">
        <div className="flex justify-between items-center mt-4">
          <div className="w-1/2 z-0">
          <Haryanamap height={"400px"} width={"350px"} zoom={7} bjpHCount={0} incHCount={0} congressHCount={0} otherHCount={0} />
          </div>
          </div>
        </TabsContent>
        <TabsContent value="District Wise">
        <div className="flex justify-between items-center mt-4">
          <div className="w-1/2 z-0">
          <Haryanamap height={"400px"} width={"350px"} zoom={7} bjpHCount={0} incHCount={0} congressHCount={0} otherHCount={0} />
          </div>
          </div>
        </TabsContent>
        <TabsContent value="Region Wise">
        <div className="flex justify-between items-center mt-4">
          <div className="w-1/2 z-0">
          <Haryanamap height={"400px"} width={"350px"} zoom={7} bjpHCount={0} incHCount={0} congressHCount={0} otherHCount={0} />
          </div>
          </div>
        </TabsContent>
        <TabsContent value="Comparision">
        <div className="flex justify-between items-center mt-4">
          <div className="w-full z-0 flex justify-between">
          <Haryanamap height={"400px"} width={"350px"} zoom={7} bjpHCount={0} incHCount={0} congressHCount={0} otherHCount={0} />
          <Haryanamap height={"400px"} width={"350px"} zoom={7} bjpHCount={0} incHCount={0} congressHCount={0} otherHCount={0} />
          <Haryanamap height={"400px"} width={"350px"} zoom={7} bjpHCount={0} incHCount={0} congressHCount={0} otherHCount={0} />
          </div>
          </div>
        </TabsContent>
        <TabsContent value="VIP">
        <div className="flex justify-between items-center mt-4">
          <div className="w-1/2 z-0">
          <Haryanamap height={"400px"} width={"350px"} zoom={7} bjpHCount={0} incHCount={0} congressHCount={0} otherHCount={0} />
          </div>
          </div>
        </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default MultipleTabs