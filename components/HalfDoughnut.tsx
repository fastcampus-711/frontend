"use client"

import { Chart, ArcElement, Tooltip, Legend, plugins } from "chart.js"
import { useEffect, useState } from "react"
import {  Doughnut  } from "react-chartjs-2"

type circular_chart_data = {
  rank_first_column_name: string
  rank_first_column_value: number
  rank_second_column_name: string
  rank_second_column_value: number
  rank_third_column_name: string
  rank_third_column_value: number
  rank_fourth_column_name: string
  rank_fourth_column_value: number
  rank_fifth_column_name: string
  rank_fifth_column_value: number
  etc: string
  etc_value: number
}

export default function HalfDoughnutGraph({year, month, datas} : {year:number, month:number, datas:any}) {
  const [labels, setLabels] = useState<string[]>([])

  const data = {
    labels: labels,
    datasets: [{
      data: [50, 50],
      backgroundColor: (context: any) => {
        const chart = context.chart
        const {ctx, chartArea} = chart
        if(!chartArea) {
            return null;
        }
        if(context.dataIndex === 0) {
            return getGradient(chart, "rgba(15, 111, 117, 1)", "rgba(242, 242, 242, 1)")
        } else if(context.dataIndex === 1) {
            return getGradient(chart,  "rgba(255, 206, 80, 1)", "rgba(230, 230, 230, 1)" )
        }
      },
      hoverOffset:10
    }]
  }

  function getGradient(chart: any, color1: string, color2: string) {
    const {ctx, chartArea: {top, bottom, left, right}} = chart
    const gradientSegment = ctx.createLinearGradient(left, 0, right, 0)
    gradientSegment.addColorStop(0, color1)
    gradientSegment.addColorStop(0.5, color2)
    return gradientSegment
  }


  useEffect(() => {
    // circularFetch()
  },[])

  Chart.register(ArcElement, Tooltip, Legend);

  const options = {
    rotation: -90,
    circumference: 180,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "bottom" as const, //그냥 "bottom"은 에러남
        labels: {
          usePointStyle: true,
          boxWidth: 5,
          boxHeight: 5,
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        enabled: false
      },
      datalabels: { 
        align: "start" as const, //as const 없으면 오류
        display: true,
        backgroundColor: function() {
            return "rgba(249, 249, 249, 1)";
        },
        borderColor: function() {
            return "rgba(234, 234, 234, 1)";
        },
        borderWidth: 1,
        color: function() {
            return "rgba(25, 25, 25, 1)"
        },
        font: {
            size: 16,
            weight: "bold" as "bold",
        },
        formatter: function(value:any, context:any) {
            if(context.active){
                return value.toLocaleString('ko-KR') + "원"
            }
        },
        offset: 8,
        padding: 12,
        textAlign: "center" as "center",
    },
    },
  }
  return (
    <div>
      <Doughnut data={data} options={options}/>
    </div>
  )
}