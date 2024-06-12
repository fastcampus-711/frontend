"use client"

import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement} from "chart.js";
import { Context } from "chartjs-plugin-datalabels";
import Image from "next/image"

import arrow from "@/public/icon/aptAverageArrow.svg"
import React, { useEffect, useRef, useState } from "react";
import MoveArrow from "./MoveArrow";

type energy = {
  average_usage_of_same_square: number
  present_usage: number
}
export default function HalfDoughnutGraph({datas, unit}:{datas: number[], unit: string}) {
  
  const percentageB = datas && datas.length >= 1 ? Math.round(((datas[1] - datas[0])/ datas[1]) * 100) : 0;

  Chart.register(ArcElement);

  const chartRef = useRef<any>(null)

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

        borderwidth: 1,
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
    cutout: "55%",
    responsive: false
    // maintainAspectRatio: false,
  }
  const degreeToRadian = (degree: number) => {
    return degree * (Math.PI / 180);
  }

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [rotate, setRotate] = useState(0)

  useEffect(() => {
    const x = Math.round(Math.sin(degreeToRadian(Math.abs(percentageB)))*180)
    const y = Math.abs(percentageB)

    if(percentageB < 0) {
      setX(-x-10)
      setRotate(270)
    } else {
      setX(x)
      setRotate(90)
    }
    setY(y)

  },[percentageB])

  return (
      <div className="flex items-center relative w-[300px] h-[150px]">
          <Doughnut ref={chartRef}
            data={data}
            options={option}
          />
          {percentageB >= 100 || percentageB <= -100 ? "" : <MoveArrow x={x} y={y} rotate={rotate} />}
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