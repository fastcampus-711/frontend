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

export default function DoughnutGraph({year, month, getData, getLabel} : {year:number, month:number, getData:number[], getLabel:string[]}) {
  Chart.register(ArcElement, Tooltip, Legend);

  const [datas, setDatas] = useState<number[]>(getData)
  const [backgroundColor, setBackgroundColor] = useState<string[]>(["rgba(13, 120, 122, 1)"])

  useEffect(() => {
    const set = () => {
      getData.map((item) => {
        if(item === undefined) {
          setDatas([100])
          setBackgroundColor(["rgba(13, 120, 122, 1)"])
        } else {
          setDatas(getData)
          setBackgroundColor([
            "rgba(0, 168, 255, 1)",
            "rgba(116, 79, 250, 1)",
            "rgba(115, 61, 164, 1)",
            "rgba(91, 80, 127, 1)",
            "rgba(18, 197, 161, 1)",
            "rgba(64, 212, 164, 1)"
          ])
        } 
      })
    }

    set()
    
  },[getData])

  const options = {
    maintainAspectRatio: false,
    plugins: {
        legend: {
          display: true,
          position: "bottom" as const, //그냥 "bottom"은 에러남
          labels: {
            usePointStyle: true,
            boxWidth: 5,
            boxHeight: 5,
            font: {
              size: 15
            }
          }
        },
        tooltip: {
          enabled: datas.length === 1 ? false: true
        }
      }
  }

  const data = {
    labels: datas.length === 1 ? [] : getLabel,
    datasets: [{
      data: datas,
      backgroundColor: backgroundColor,
      hoverOffset:10,
      datalabels: {
        display: datas.length === 1 ? false : true,
        labels: {
            name: {
              align: "center" as const,
              font: {size: 15},
              formatter: function(value: any, ctx: any) {
                return ctx.chart.data.labels[ctx.dataIndex];
              }
            },
        },
        color: "white"
      }
    }]
  }

  return (
    // <div>
      <Doughnut data={data} options={options} />
    // </div>
  )
}