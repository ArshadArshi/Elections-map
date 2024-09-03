import { Chart } from "react-google-charts"


export const data = [
    ["Task", "Hours per Day"],
    ["BJP", 11],
    ["INC", 7],
    ["OTH", 4],
    ["JMK", 7],
  ];

  export const options = {
    is3D: true,
    slices: {
        0: { color: "orange" }, // Color for BJP
        1: { color: "#4DB6E2" }, // Color for INC
        2: { color: "gray" }, // Color for OTH
        3: { color: "green" }, // Color for JMK
    },
    pieSliceText: 'label', // Display slice labels, which might make slices appear "fatter"
    pieStartAngle: 45, 
  };

function PieChart() {

  return (
    <div className="w-[500px]">
      <div className="flex justify-center items-center gap-3">
      <div className="flex flex-col text-xs rounded text-orange-500 justify-center items-center border border-black w-[80px] h-[80px]">
        BJP
        <p>40%</p>
        <p>( +8.91 )</p>
      </div>
      <div className="flex flex-col text-xs rounded text-blue-500 justify-center items-center border border-black w-[80px] h-[80px]">
        INC
        <p>40%</p>
        <p>( +8.91 )</p>
      </div>
      <div className="flex flex-col text-xs rounded text-green-800 justify-center items-center border border-black w-[80px] h-[80px]">
        JMK
        <p>40%</p>
        <p>( +8.91 )</p>
      </div>
      <div className="flex flex-col text-xs rounded text-gray-500 justify-center items-center border border-black w-[80px] h-[80px]">
        OTH
        <p>40%</p>
        <p>( +8.91 )</p>
      </div>
      </div>
    <Chart 
    chartType="PieChart"
    data={data}
    options={options}
    width={"100%"}
    height={"400px"}
    />
    </div>
  )
}

export default PieChart