import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import PartyDetailsCard from "./PartyDetailsCard";
import { CarouselCard } from "./CarousalCard";

const SemiCircleChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const data = [
        { value: 40, name: 'BJP' },
        { value: 31, name: 'INC' },
        { value: 14, name: 'JMK' },
        { value: 5, name: 'OTH' }
      ];

      const sum = data.reduce((sum, cur) => sum + cur.value, 0);

      const defaultPalette = ['#fc5d1a', '#5271ff', '#008d0a', '#a6a6a6'];

      const radius = ['35%', '80%'];

      const parliamentSeries = (() => {
        let angles = [];
        let startAngle = Math.PI;
        let curAngle = startAngle;
        data.forEach(item => {
          angles.push(curAngle);
          curAngle += (item.value / sum) * Math.PI;
        });
        angles.push(startAngle + Math.PI);

        function parliamentLayout(startAngle: number, endAngle: number, totalAngle: number, r0: number, _r1: number, size: number) {
          let rowsCount = 5;
          let points = [];
          let r = r0;
          for (let i = 0; i < rowsCount; i++) {
            let totalRingSeatsNumber = Math.round((totalAngle * r) / size);
            let newSize = (totalAngle * r) / totalRingSeatsNumber;
            for (let k = Math.floor((startAngle * r) / newSize) * newSize + 8;
              k < Math.floor((endAngle * r) / newSize) * newSize - 1e-6;
              k += newSize) {
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
            const r0 = ((parseFloat(radius[0]) / 100) * viewSize) / 1.2;
            const r1 = ((parseFloat(radius[1]) / 100) * viewSize) / 1.6;
            const cx = api.getWidth() * 0.5;
            const cy = api.getHeight() * 1;
            const size = viewSize / 28;
            const points = parliamentLayout(angles[idx], angles[idx + 1], Math.PI, r0, r1, size + 8);
            return {
              type: 'group',
              children: points.map(pt => ({
                type: 'circle',
                autoBatch: true,
                shape: {
                  cx: cx + pt[0],
                  cy: cy + pt[1],
                  r: size / 1.6
                },
                style: {
                  fill: defaultPalette[idx % defaultPalette.length]
                }
              }))
            };
          }
        };
      })();

      const option = {
        title: {
          show: true,
          text: sum,
          bottom: '-1%',
          left: '45%',
          textStyle: { fontSize: 25, color:'red' }
        },
        series: parliamentSeries
      };

      chart.setOption(option);

      return () => {
        chart.dispose();
      };
    }
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center font-bold" style={{ fontSize: '30px', textAlign: 'center' }}>
        REQUIRED TO WIN
        <div ref={chartRef} className="w-[400px] h-[200px]" />
        {/* Arrow styling */}
        <div className="flex justify-center relative items-center">
          <div
            style={{
              fontSize: '200px', // Adjust height by changing font size
              color: '#323232',
              zIndex: 1,
              position: 'absolute',
              top: '-170px',
              transform: 'scaleX(0.2)', // Adjust width by scaling X to make it slimmer
              lineHeight: '100px', // Control the vertical spacing
              opacity:'0.8',
            }}
          >
            ↑
          </div>
        </div>
        {/* Jammu & Kashmir Label */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            background: '#323232',
            color: 'white'
          }}
        >
          <div
            className="text-lg font-bold"
            style={{
              display: 'flex',
              padding: '10px 0',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'red',
              width: '300px',
              textTransform: 'uppercase',
              fontSize: '30px'
            }}
          >
            Jammu & Kashmir
          </div>
        </div>
        <div
          className="flex justify-center text-xs mb-10"
          style={{ fontSize: '13px', color: '#323232', textTransform: 'uppercase', letterSpacing: '6px' }}
        >
          Assembly Election 2024
        </div>
      </div>

      <div className="m-4">
        <PartyDetailsCard />
      </div>
      <div>
        <CarouselCard />
      </div>
    </>
  );
};

export default SemiCircleChart;
