import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import PartyDetailsCard from "./PartyDetailsCard";
import { CarouselCard } from "./CarousalCard";
import ProgressBar from "./ProgressBar";

const SemiCircleChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      // Example dataset
      const data = [
        { value: 100, name: 'BJP' },
        { value: 0, name: 'INC' },
        { value: 0, name: 'JMK' },
        { value: 0, name: 'OTH' },
        // { value: 7, name: 'E' },
        // { value: 3, name: 'F' },
        // { value: 18, name: 'G' },
        // { value: 31, name: 'H' },
        // { value: 59, name: 'I' }
      ];

      // Calculate sum
      const sum = data.reduce((sum, cur) => sum + cur.value, 0);

      // Color palette
      const defaultPalette = [
        'orange', 'skyblue', 'green', 'grey',
        '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'
      ];

      // Radius of chart
      const radius = ['30%', '80%'];

      // Series data
      const parliamentSeries = (() => {
        let angles = [];
        let startAngle = Math.PI;
        let curAngle = startAngle;
        data.forEach(item => {
          angles.push(curAngle);
          curAngle += (item.value / sum) * Math.PI;
        });
        angles.push(startAngle + Math.PI);

        function parliamentLayout(startAngle: number, endAngle: number, totalAngle: number, r0: number, r1: number, size: number) {
          let rowsCount = Math.ceil((r1 - r0) / size);
          let points = [];
          let r = r0;
          for (let i = 0; i < rowsCount; i++) {
            let totalRingSeatsNumber = Math.round((totalAngle * r) / size);
            let newSize = (totalAngle * r) / totalRingSeatsNumber;
            for (
              let k = Math.floor((startAngle * r) / newSize) * newSize + 22;
              k < Math.floor((endAngle * r) / newSize) * newSize - 1e-6;
              k += newSize
            ) {
              let angle = k / r;
              let x = Math.cos(angle) * r;
              let y = Math.sin(angle) * r;
              points.push([x, y]);
            }
            r += size;
          }
          return points;
        }

        return {
          type: 'custom',
          id: 'distribution',
          data: data,
          coordinateSystem: undefined,
          universalTransition: true,
          animationDurationUpdate: 1000,
          renderItem: function (params: { dataIndex: any; }, api: { getWidth: () => number; getHeight: () => number; }) {
            const idx = params.dataIndex;
            const viewSize = Math.min(api.getWidth(), api.getHeight());
            const r0 = ((parseFloat(radius[0]) / 100) * viewSize) / 2.6;
            const r1 = ((parseFloat(radius[1]) / 100) * viewSize) / 1.6;
            const cx = api.getWidth() * 0.5;
            const cy = api.getHeight() * 0.7;
            const size = viewSize / 28;
            const points = parliamentLayout(
              angles[idx],
              angles[idx + 1],
              Math.PI,
              r0,
              r1,
              size + 3
            );
            return {
              type: 'group',
              children: points.map(pt => ({
                type: 'circle',
                autoBatch: true,
                shape: {
                  cx: cx + pt[0],
                  cy: cy + pt[1],
                  r: size / 2
                },
                style: {
                  fill: defaultPalette[idx % defaultPalette.length]
                }
              }))
            };
          }
        };
      })();

      // Chart options
      const option = {
        title: {
          show: true,
        //   text: sum, // <-- here can give value to text of middle
          bottom: '28%',
          left: '37%',
          textStyle: { fontSize: 20 }
        },
        series: parliamentSeries
      };

      // Set options
      chart.setOption(option);

      // Cleanup the chart instance on component unmount
      return () => {
        chart.dispose();
      };
    }
  }, []);

  return (
  <>
  <div ref={chartRef} className="w-[200px] h-[200px]" />
  <div style={{width:'100%',display:'flex',justifyContent:'center', border:'none',background:'#323232',color:'white'}}><div className="text-lg font-bold" style={{display:'flex',padding:'10px 0px 10px 0px',justifyContent:'center',alignItems:'center',background:'red',width:'300px',textTransform:'uppercase',fontSize:'30px'}}>Jammu & Kashmir</div></div>
  <div className="flex justify-center text-s mb-10 font-bold" style={{textTransform:'uppercase',letterSpacing:'6px'}}>Assembly Election 2024</div>
  <div>
    <PartyDetailsCard />
  </div>
  <div>
    <CarouselCard />
  </div>
  {/* <div>
    <ProgressBar />
  </div> */}
  </>
  )
};

export default SemiCircleChart;
