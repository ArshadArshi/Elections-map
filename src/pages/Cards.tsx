import { Card, CardContent } from "@/components/ui/card";

function Cards() {
  const cardData = [
    {
      id: 1,
      partyName: "BJP | JAMMU",
      imageUrl:
        "https://3state-results.my.canva.site/jammu-kashmir-haryana-election-2024-m/images/f007febc23ba11ab723fe2e8255a23eb.jpg",
      status: "WIN",
    },
    {
      id: 2,
      partyName: "BJP | JAMMU",
      imageUrl:
        "https://3state-results.my.canva.site/jammu-kashmir-haryana-election-2024-m/images/8b982b948c48540fae65ceba89ed3c24.jpg",
        status: "WIN",
    },
    {
      id: 3,
      partyName: "INC | JAMMU",
      imageUrl:
        "https://3state-results.my.canva.site/jammu-kashmir-haryana-election-2024-m/images/e488202322403ad180121e2a682a9dbe.png",
        status: "LOSS",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-3 font-bold text-black">
        KEY CANDIDATES
        {cardData.map((party) => (
          <Card
            key={party.id}
            className="w-[420px] h-[110px] rounded-lg bg-gray-200 z-6"
          >
            <CardContent className="flex justify-between items-center mt-2">
              <img
                className="w-[93px] h-[94px] rounded-full"
                src={party.imageUrl}
                alt="profile"
              />
              <div>
                <div className="font-bold text-customGrey">JAMMU & KASHMIR</div>
                <div className="text-xs flex justify-center items-center">
                  {" "}
                  {party.partyName}{" "}
                </div>
                <div
                className={`flex justify-center items-center w-1/2 ml-10 mt-1 font-bold px-2 py-1 text-white border ${
                  party.status === "WIN" ? "bg-customGreen text-white border-customGreen" : "bg-customRed text-white border-customRed"
                }`}
              >
                {party.status}
              </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Cards;
