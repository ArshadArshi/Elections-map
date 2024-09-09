import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import bjp from "../assets/bjp.jpg";
import inc from "../assets/inc.jpg";
import jmk from "../assets/jmk.png";

function PartyDetailsCard() {
  const partyData = [
    { party: "BJP", leads: 20, win: 40, total: 60, symbol: bjp, color: "#FF9900" }, // BJP - Orange
    { party: "INC", leads: 30, win: 30, total: 60, symbol: inc, color: "#4DB6E2" }, // INC - Blue
    { party: "JMK", leads: 10, win: 20, total: 30, symbol: jmk, color: "#006400" }, // JMK - Green
    { party: "OTH", leads: 20, win: 10, total: 30, symbol: jmk, color: "#808080" }, // OTH - Grey
  ];

  return (
    <div>
      <Card className="w-[400px] rounded-none shadow-[0px_4px_10px_rgba(0,0,0,0.3)]">
        <div
          style={{ fontSize: "21px" }}
          className="flex justify-around items-center ml-10"
        >
          <CardTitle className="h-[10px]">PARTY</CardTitle>
          <CardHeader>
            <CardTitle className="flex gap-5 h-[10px]">
              <div style={{ color: "red" }}>LEADS</div> |{" "}
              <div style={{ color: "green", marginRight: "4px", marginLeft: "4px" }}>
                WIN
              </div>{" "}
              | <div className="text-black">TOTAL</div>
            </CardTitle>
          </CardHeader>
        </div>

        {/* Map over party data */}
        {partyData.map((party) => (
          <div key={party.party} style={{ background: "#ededed" }}>
            <div className="flex justify-around items-center">
              {/* Style the symbol and party name based on the party color */}
              <div
                style={{ fontSize: "20px", color: party.color }}
                className="flex justify-center items-center gap-1"
              >
                <img className="w-4 h-4" src={party.symbol} alt={party.party} /> | {party.party}
              </div>

              {/* The leads, win, and total values */}
              <div className="flex gap-10">
                <div>{party.leads}</div> | <div>{party.win}</div> | <div>{party.total}</div>
              </div>
            </div>
          </div>
        ))}

        {/* Footer displaying total seats */}
        <div style={{ background: "#ededed" }} className="flex justify-end text-xs pr-7 pt-2">
          Total Seats: 90/90
        </div>
      </Card>
    </div>
  );
}

export default PartyDetailsCard;
