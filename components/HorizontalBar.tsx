"use client"

import { CategoryScale, Chart, LinearScale,PointElement, LineElement, Tooltip,BarElement, TooltipItem} from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"
import { useEffect, useRef, useState } from "react"
import {  Bar, Line } from "react-chartjs-2"

export default function HorizontalBar({year, month, getData} : {year:number, month:number, getData:number[]}) {
    Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, ChartDataLabels )
    
    const [labels, setLabels] = useState<string[]>([])
    const [datas, setDatas] = useState<number[]>(getData)

    useEffect(() => {
        setLabels([`${year-1}년 ${month}월`,`${year}년 ${month}월`])
    },[year, month])

    const data = {
        labels: labels,
        datasets: [{
            data: getData,
            backgroundColor: ["rgba(211, 211, 211, 1)", "rgba(15, 115, 117, 1)"],
        }],
        
    }
    const options = {
        maintainAspectRatio: false,
        indexAxis: "y" as const,
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Chart.js Horizontal Bar Chart'
            },
            datalabels: {
                display: false
            }
        },
        scales: {
            x: {
                ticks: {
                    display: false
                }
            },
        }
    }

    
    return (
        <>
        <Bar data={data} options={options}/>
        </>
    );
}