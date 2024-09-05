import { Tabs, TabsList } from "@/components/ui/tabs"
import { TabsContent, TabsTrigger } from "@/components/ui/tabs"
import JammuMap from "./JammuMap"
import { SetStateAction } from "react"
import PieChart from "./PieChart"
import Haryanamap from "./Haryanamap"
import TableData from "./TableData"

function MultipleTabs() {
 

  function setSelectedConstituency(_value: SetStateAction<string | undefined>): void {
    throw new Error("Function not implemented.")
  }

  return (
    <div className="flex justify-center items-center mb-5">
      <Tabs defaultValue="JAMMU & KASHMIR" className="w-full">
        <TabsList className="gird w-full h-full grid-cols-2 mb-4 bg-customGrey text-white font-md">
          <TabsTrigger className="w-full bg-customRed" value="JAMMU & KASHMIR">JAMMU & KASHMIR</TabsTrigger>
          <TabsTrigger className="w-full bg-customRed" value="HARYANA">HARYANA</TabsTrigger>
        </TabsList>
        <TabsContent value="JAMMU & KASHMIR">
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
          <div className="flex justify-around items-center">
          <div className="w-1/2">
          <JammuMap setSelectedConstituency={setSelectedConstituency} height={"350px"} width={"350px"} zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} />
          </div>
          <div className="w-[700px]">
            <TableData />
          </div>
          </div>
        </TabsContent>
        <TabsContent value="Voter Turnout">
          <div className="w-1/2">
          <JammuMap setSelectedConstituency={setSelectedConstituency} height={"350px"} width={"350px"} zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} />
          </div>
        </TabsContent>
        <TabsContent value="Constituency">
          <div className="flex justify-between items-center mt-4">
          <div className="w-1/2">
          <JammuMap setSelectedConstituency={setSelectedConstituency} height={"350px"} width={"350px"} zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} />
          </div>
          <div className="w-1/2">
            <PieChart/>
          </div>
          </div>
        </TabsContent>
        <TabsContent value="Loksabha Wise">
          <div className="w-1/2">
          <JammuMap setSelectedConstituency={setSelectedConstituency} height={"350px"} width={"350px"} zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} />
          </div>
        </TabsContent>
        <TabsContent value="District Wise">
          <div className="w-1/2">
          <JammuMap setSelectedConstituency={setSelectedConstituency} height={"350px"} width={"350px"} zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} />
          </div>
        </TabsContent>
        <TabsContent value="Region Wise">
          <div className="w-1/2">
          <JammuMap setSelectedConstituency={setSelectedConstituency} height={"350px"} width={"350px"} zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} />
          </div>
        </TabsContent>
        <TabsContent value="Comparision">
          <div className="w-1/2">
          <JammuMap setSelectedConstituency={setSelectedConstituency} height={"350px"} width={"350px"} zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} />
          </div>
        </TabsContent>
        <TabsContent value="VIP">
          <div className="w-1/2">
          <JammuMap setSelectedConstituency={setSelectedConstituency} height={"350px"} width={"350px"} zoom={7} bjpCount={0} incCount={0} congressCount={0} otherCount={0} />
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
          <div className="w-1/2">
          <Haryanamap height={"400px"} width={"350px"} zoom={7} bjpHCount={0} incHCount={0} congressHCount={0} otherHCount={0} />
          </div>
        </TabsContent>
        <TabsContent value="Voter Turnout">
          <div className="w-1/2">
          <Haryanamap height={"400px"} width={"350px"} zoom={7} bjpHCount={0} incHCount={0} congressHCount={0} otherHCount={0} />
          </div>
        </TabsContent>
        <TabsContent value="Constituency">
          <div className="flex justify-between items-center mt-4">
          <div className="w-1/2">
          <Haryanamap height={"400px"} width={"350px"} zoom={7} bjpHCount={0} incHCount={0} congressHCount={0} otherHCount={0} />
          </div>
          <div className="w-1/2">
            <PieChart/>
          </div>
          </div>
        </TabsContent>
        <TabsContent value="Loksabha Wise">
          <div className="w-1/2">
          <Haryanamap height={"400px"} width={"350px"} zoom={7} bjpHCount={0} incHCount={0} congressHCount={0} otherHCount={0} />
          </div>
        </TabsContent>
        <TabsContent value="District Wise">
          <div className="w-1/2">
          <Haryanamap height={"400px"} width={"350px"} zoom={7} bjpHCount={0} incHCount={0} congressHCount={0} otherHCount={0} />
          </div>
        </TabsContent>
        <TabsContent value="Region Wise">
          <div className="w-1/2">
          <Haryanamap height={"400px"} width={"350px"} zoom={7} bjpHCount={0} incHCount={0} congressHCount={0} otherHCount={0} />
          </div>
        </TabsContent>
        <TabsContent value="Comparision">
          <div className="w-1/2">
          <Haryanamap height={"400px"} width={"350px"} zoom={7} bjpHCount={0} incHCount={0} congressHCount={0} otherHCount={0} />
          </div>
        </TabsContent>
        <TabsContent value="VIP">
          <div className="w-1/2">
          <Haryanamap height={"400px"} width={"350px"} zoom={7} bjpHCount={0} incHCount={0} congressHCount={0} otherHCount={0} />
          </div>
        </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default MultipleTabs