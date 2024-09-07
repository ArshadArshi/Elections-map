import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import bjp from '../assets/bjp.jpg'
import inc from '../assets/inc.jpg'
import jmk from '../assets/jmk.png'

function PartyDetailsCard() {

const partyData = [
    {party: "BJP", leads: 20, win: 40, total: 60, symbol: bjp},
    {party: "INC", leads: 30, win: 30, total: 60, symbol: inc},
    {party: "JMK", leads: 10, win: 20, total: 30, symbol: jmk},
    {party: "OTH", leads: 20, win: 10, total: 30, symbol: jmk},
]

  return (
    <div>
         <Card className="w-[400px] rounded-none shadow-[0px_4px_10px_rgba(0,0,0,0.3)]">
            <div style={{fontSize:'21px'}} className="flex justify-around items-center ml-10"><CardTitle>PARTY</CardTitle>
      <CardHeader>
        <CardTitle className="flex gap-5"> <div style={{color:'red'}}>LEADS</div> | <div style={{color:'green',marginRight:'4px',marginLeft:'4px'}}>WIN</div> | <div className="text-black">TOTAL</div></CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      </div>
      
        {partyData.map(party=>(
        <div style={{background:'#ededed'}}>
       <div className="flex justify-around items-center"> <div style={{fontSize:'15px'}} className="flex justify-center items-center gap-1"> <img className="w-4 h-4" src={party.symbol} alt="BJP" /> | {party.party} </div>
       <div className="flex gap-10"> <div>{party.leads}</div> | <div>{party.win}</div> | <div>{party.total}</div> </div></div>
        </div>
        ))}
        <div style={{background:'#ededed'}} className="flex justify-end text-xs pr-7 pt-2">Total Seats : 90/90 </div>

      </Card>
    </div>
  )
}

export default PartyDetailsCard