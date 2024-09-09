import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import one from '../assets/person1.jpg';
import two from '../assets/person2.jpg';

// Define content as an array of objects
const cardContents = [
  {
    candidateImg: one,
    name: "Omar Abdulla",
    status: "Lead",
    party: "JMK",
    constituency: "Jammu Rural",
  },
  {
    candidateImg: two,
    name: "Gian Chand Gupta",
    status: "Won",
    party: "INC",
    constituency: "Panchkula",
  },
  {
    candidateImg: one,
    name: "Prasad Babu Chavala",
    status: "Lead",
    party: "JMK",
    constituency: "Jammu",
  },
  {
    candidateImg: two,
    name: "Omar",
    status: "Lead",
    party: "BJP",
    constituency: "Srinagar",
  },
  {
    candidateImg: one,
    name: "Chand",
    status: "Lead",
    party: "INC",
    constituency: "Doda",
  },
  {
    candidateImg: two,
    name: "Gupta",
    status: "Lead",
    party: "BJP",
    constituency: "Kathua",
  },
  {
    candidateImg: one,
    name: "Chaturvedi",
    status: "Lead",
    party: "JMK",
    constituency: "Ramban",
  },
];

export function CarouselCard() {
  const [currentPage, setCurrentPage] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const totalItems = cardContents.length;

  useEffect(() => {
    // Start auto-pagination
    intervalRef.current = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalItems);
    }, 3000); // Change slide every 3 seconds

    // Cleanup interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [totalItems]);

  return (
    <div className="relative shadow-[0px_4px_10px_rgba(0,0,0,0.3)] mb-8">
      <Carousel className="w-[400px]">
        <CarouselContent>
          <CarouselItem>
            <div>
              <Card className="rounded-none" style={{background:'#ededed'}}>
                <CardContent className="m-1 p-0 flex aspect-rectangle items-center justify-between">
                  {/* Left side: Image */}
                  
                    <img
                      src={cardContents[currentPage].candidateImg}
                      alt={cardContents[currentPage].name}
                      className="w-[150px] h-[120px] object-cover"
                    />
                  

                  {/* Right side: Candidate details */}
                  <div className="flex w-full flex-col">
                    <div style={{fontSize:'25px'}} className="flex justify-center items-center text-gray-600 text-lg">
                      {cardContents[currentPage].name}
                    </div>
                    <div style={{fontSize:'25px'}} className="flex justify-center items-center font-bold text-lg text-gray-600">
                     {cardContents[currentPage].party}
                    </div>
                    <div style={{fontSize:'25px'}} className="flex justify-center items-center text-lg font-bold text-center text-green-600">
                    {cardContents[currentPage].status}
                    </div>
                    <div style={{fontSize:'15px'}} className="flex font-bold items-center justify-center text-center text-sm text-gray-600">
                     {cardContents[currentPage].constituency}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      {/* Pagination dots */}
      <div className="flex justify-center items-center absolute mt-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {cardContents.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`w-${currentPage === index ? '4' : '2'} h-${currentPage === index ? '4' : '2'} rounded-full ${
                currentPage === index ? "bg-gray-600" : "bg-gray-300"
              }`}
          />
        ))}
      </div>
    </div>
  );
}
