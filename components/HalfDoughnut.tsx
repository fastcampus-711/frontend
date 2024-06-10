"use client"

import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { Context } from "chartjs-plugin-datalabels";
import Image from "next/image"

import arrow from "@/public/icon/aptAverageArrow.svg"
import { useEffect, useRef, useState } from "react";

type energy = {
  average_usage_of_same_square: number
  present_usage: number
}
export default function HalfDoughnutGraph({datas, unit}:{datas: number[], unit: string}) {
  
  // const percentageB = (datas[1] / datas[0]) * 100;
  Chart.register(ArcElement);

  // const [canvasWidth, setCanvasWidth] = useState(0)
  // const [canvasHeight, setCanvasHeight] = useState(0)
  const [X, setX] = useState(0)
  const [Y, setY] = useState(0)

  // const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // useEffect(() => {
  //   const canvas = canvasRef.current
  //   if(!canvas) return

  //   const ctx = canvas.getContext("2d");
  //   if (!ctx) {
  //     throw new Error("Canvas rendering context is not available");
  //   }

  // const centerX = canvas.offsetWidth / 2;
  // const centerY = canvas.offsetHeight  / 2;
  // const radius = Math.min(centerX, centerY) - 10;

  // const angleRadians = (percentageB - 90) * (Math.PI / 180);

  // const x = centerX + radius * Math.cos(angleRadians);
  // const y = centerY + radius * Math.sin(angleRadians);

  // console.log("x, y",x, y)

  // setX(x)
  // setY(y)
  // },[])

  const data = {
    datasets: [
      {
        data: [10, 10, 10, 10, 10, 10],
        backgroundColor: function(context: Context) {
          const ctx = context.chart.ctx;
          const canvas = context.chart.canvas;

          const gradient = ctx.createLinearGradient(0, 0, canvas.offsetWidth, 0);
          gradient.addColorStop(1/4, '#0F6F75');
          gradient.addColorStop(1/2, '#F2F2F2');
          gradient.addColorStop(3/4, '#FFCE50');
          gradient.addColorStop(1, '#E6E6E6');

          return gradient;
        },
        display: true,
        borderColor: "white"
      }
    ]
  };
  const option = {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      },
      datalabels: {
         display: false
      }
    },
    rotation: -90,
    circumference: 180,
    cutout: "60%",
    maintainAspectRatio: false,
  }
  return (
    <div className="relative">
      <div className="w-full">
        <Doughnut
          data={data}
          options={option}
        />
      </div>
      <div className="absolute flex flex-row bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-7 h-5 transform -translate-y-4">-60</div>
        <div className="w-7 h-5 transform -translate-y-10">-20</div>
        <div className="w-7 h-5 transform translate-x-2 -translate-y-12">0</div>
        
        <div className="w-7 h-5 transform -translate-y-10">+20</div>
        <div className="w-7 transform transform -translate-y-4">+60</div>
      </div>
      <div className="absolute flex flex-row bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Image
            src={arrow.src}
            alt="아파트 평균 아이콘"
            width={16}
            height={16}
            className="transform -translate-y-20"
        />
        {/* <div className="w-6 h-4 transform translate-x-1 -translate-y-20">▲</div> */}
        <p className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-2 text-sm whitespace-nowrap">
          동일면적평균
        </p>
        <p className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 text-sm whitespace-nowrap">
          {datas !== undefined ? `(${datas[0]}${unit})` : `-${unit}`}
        </p>
      </div>
    </div>
  );
};
