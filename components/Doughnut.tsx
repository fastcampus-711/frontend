"use client"

import { Chart, ArcElement, Tooltip, Legend, plugins } from "chart.js"
import {  Doughnut  } from "react-chartjs-2"

type userFee = {
  label: string,
  value: number
}[]

export default function DoughnutGraph({labels, values} : {labels: string[], values: number[]}) {
  Chart.register(ArcElement, Tooltip, Legend);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
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
        enabled: true
      }
    },
  }

  const data = {
    labels: labels,
    datasets: [{
      data: values,
      backgroundColor: [
        'rgba(0, 168, 255, 1)',
        'rgba(116, 79, 250, 1)',
        'rgba(115, 61, 164, 1)',
        'rgba(91, 80, 127, 1)',
        'rgba(18, 197, 161, 1)',
        'rgba(64, 212, 164, 1)'
      ],
      hoverOffset: 6
    }]
  }
  return (
    <div>
      <Doughnut data={data} options={options}/>
    </div>
  )
}