import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import bjp from "../assets/bjp.jpg";
import inc from "../assets/inc.jpg";
import jmk from "../assets/jmk.png";
import chair from "../assets/assemblychari.png";
import man from "../assets/man.png";

interface ProgressData {
  party: string;
  progress: number;
  color: string;
  avatar: string;
  assemblyChair: string;
}

function ProgressBar() {
  const initialProgressData: ProgressData[] = [
    {
      party: "BJP",
      progress: 45,
      color: "#ff6347",
      avatar: bjp,
      assemblyChair: chair,
    },
    {
      party: "INC",
      progress: 66,
      color: "skyblue",
      avatar: inc,
      assemblyChair: chair,
    },
    {
      party: "JMK",
      progress: 30,
      color: "#32cd32",
      avatar: jmk,
      assemblyChair: chair,
    },
    {
      party: "OTH",
      progress: 25,
      color: "#808080",
      avatar: inc,
      assemblyChair: chair,
    },
  ];

  const [progressData, setProgressData] = useState<ProgressData[]>(initialProgressData);

  // Simulating live vote updates every 5 seconds (replace with actual API calls or WebSocket updates)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgressData((prevData) =>
        prevData.map((item) => ({
          ...item,
          progress: Math.min(item.progress + Math.floor(Math.random() * 5), 100), // Increment votes randomly
        }))
      );
    }, 5000); // Simulate every 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div style={{ width: '100%', marginTop: '20px' }}>
      {progressData.map((item, index) => (
        <div key={index} className="flex mb-4 gap-2 relative">
          {/* Avatar of the party */}
          <Avatar className="mt-[-10px] mb-2 rounded-full">
            <AvatarImage className="w-7 h-7" src={item.avatar} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          {/* Progress Bar with Assembly Chair Image */}
          <div className="relative w-[60%]">
            <div className="h-4 bg-gray-300 overflow-hidden rounded-full">
              <div className="h-4" style={{ width: `${item.progress}%`, backgroundColor: item.color }} />
            </div>
            {/* Assembly chair image placed at the end of the progress */}
            <img
              src={man}
              alt="assembly chair"
              className="absolute top-[-5px] w-[20px] h-[20px]"
              style={{ left: `calc(${item.progress}% - 10px)` }} // Dynamically position at the end of progress
            />
          </div>
          <Avatar className="mt-[-10px] mb-2 rounded">
            <AvatarImage className="w-7 h-7" src={chair} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* Displaying percentage */}
          <b className="ml-4">{item.progress}%</b>
        </div>
      ))}
    </div>
  );
}

export default ProgressBar;
