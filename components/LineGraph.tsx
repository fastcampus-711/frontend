"use client"

import { CategoryScale, Chart, LinearScale,PointElement, LineElement, Tooltip, TooltipItem, BarElement} from "chart.js"
import ChartDataLabels from "chartjs-plugin-datalabels"
import { useEffect, useRef, useState } from "react"
import {  Line } from "react-chartjs-2"

export default function LineGraph({year, month, datas} : {year:number, month:number, datas:any}) {
    const [labels, setLabels] = useState<string[]>([])
    
    useEffect(() => {
        setLabels([`${month-2}월`,`${month-1}월`,`${month}월`])
    },[month])

    Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, ChartDataLabels )

    const data = {
        labels: labels,
        datasets: [{
            data: datas,
            borderColor: "rgba(13, 120, 122, 1)",
            pointBackgroundColor: "rgba(13, 120, 122, 1)",
            pointRadius: 6, //포인터 반경 범위 
        }],
        
    }
    const options = {
        maintainAspectRatio: false,
        plugins: { 
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            },
            datalabels: { 
                align: "start" as const, //as const 없으면 오류
                anchor: "start" as const, //as const 없으면 오류
                display: function(context: any) {
                    // if(context.dataIndex === 2) return true
                    return context.active ? true : false
                },
                listeners: {
                    enter: function(context : any, event : any) {
                        if(context.dataIndex === 2) {
                            console.log(context)
                            context.display = false
                        }
                        context.hovered = true
                        context.chart.data.datasets
                        return true
                    },
                    leave: function(context : any, event : any) {
                        context.hovered = false
                        return false
                    },
                },
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
        scales: {
            x: {
                display: false,
                offset: true,
                ticks: {
                    display: false
                }
            },
            y: {
                // min: 0,
                // suggestedMax: 300000,
                beginAtZero: true,
                ticks: {
                    display: false,
                    autoSkip: true,
                    maxTicksLimit: 5,
                }
            }
        }
    }

    
    return (
        <>
        <Line data={data} options={options}/>
        </>
    );
}
