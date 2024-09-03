import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"


interface ProgressData {
  party: string;
  progress: number;
  color: string;
  avatar: string;
  assemblyChair: string;
}

function ProgressBar() {

const progressData : ProgressData[] = [
  {
    party: "BJP",
    progress: 66,
    color: "#ff6347",
    avatar: "path/to/bjp-avatar.png",
    assemblyChair: "path/to/assembly-chair.png"
  },
  {
    party: "INC",
    progress: 45,
    color: "#4682b4",
    avatar: "path/to/inc-avatar.png",
    assemblyChair: "path/to/assembly-chair.png"
  },
  {
    party: "JMK",
    progress: 30,
    color: "#32cd32",
    avatar: "path/to/jmk-avatar.png",
    assemblyChair: "path/to/assembly-chair.png"
  },
  {
    party: "OTH",
    progress: 25,
    color: "#808080",
    avatar: "path/to/oth-avatar.png",
    assemblyChair: "path/to/assembly-chair.png"
  }
];
    const [progress, setProgress] = useState<ProgressData[]>([]);
    
    useEffect(() => {
      const timer = setTimeout(() => setProgress(progressData), 500)
      return () => clearTimeout(timer)
    }, [])


  return (
    <div>
    {progress.map((item,index)=>(
       <div key={index} className="flex items-center mb-4">
        <Progress value={item.progress} className="w-[25%]" style={{background:item.color}} />
        </div>
        ))}
    </div>
  )
}

export default ProgressBar