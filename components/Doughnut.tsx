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

export default function DoughnutGraph({year, month} : {year:number, month:number}) {
  const [labels, setLabels] = useState<string[]>([])
  const [datas, setDatas] = useState<number[]>([])

  const circularFetch = async () => {
    try {
        let url = `https://711.ha-ving.store/maintenance-bills/circular-chart?year=${year}&month=${month}`

        const response = await fetch(url,{ cache: "no-store" })

        if (response.ok) {
            const circular_data = await response.json()
            const data : circular_chart_data = circular_data.data

            // const top5Labels = [data.rank_first_column_name, data.rank_second_column_name,
            //   data.rank_third_column_name, data.rank_fourth_column_name, data.rank_fifth_column_name,
            //   data.etc
            // ]
            const top5Labels = ["온수", "전기", "난방", "일반관리비", "수도", "기타"]
            const top5Values = [data.rank_first_column_value, data.rank_second_column_value,
              data.rank_third_column_value, data.rank_fourth_column_value, data.rank_fifth_column_value,
              data.etc_value
            ]
            setLabels(top5Labels)
            setDatas(top5Values)
        }
    } catch (error) {
      console.error("도넛 차트 에러 발생:", error)
    }
  }

  useEffect(() => {
    circularFetch()
  },[])

  Chart.register(ArcElement, Tooltip, Legend);

  const options = {
    // responsive: true,
    maintainAspectRatio: false,
    // cutoutPercentage: 50,
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
        }
      },
      tooltip: {
        enabled: true
      },
      
    }

  const data = {
    labels: labels,
    datasets: [{
      data: datas,
      backgroundColor: [
        'rgba(0, 168, 255, 1)',
        'rgba(116, 79, 250, 1)',
        'rgba(115, 61, 164, 1)',
        'rgba(91, 80, 127, 1)',
        'rgba(18, 197, 161, 1)',
        'rgba(64, 212, 164, 1)'
      ],
      hoverOffset:10,
      datalabels: {
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
      <Doughnut data={data} options={options}/>
    // </div>
  )
}