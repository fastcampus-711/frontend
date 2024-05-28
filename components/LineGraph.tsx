"use client"

import { CategoryScale, Chart, LinearScale,PointElement, LineElement, Tooltip, layouts } from "chart.js"
import {  Line  } from "react-chartjs-2"


export default function LineGraph() {
    Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)
    const labels = ["first", "second", "third"]
    const values = [33333, 22222, 44444]
    const data = {
        labels: labels,
        datasets: [{
            data: values,
            borderColor: "rgba(13, 120, 122, 1)"
        }],
        
    }
    const options = {
        layout: {
            padding: {
                left: 10,
                right:10
            }
        },
        maintainAspectRatio: false,
        plugins: { 
            legend: {
                display: false
            },
            tooltip: {
                enabled: true,
                bodyColor: "#F9F9F9",
            }
        },
        scales: {
            x: {
                display: false,
                ticks: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    display: false,
                    autoSkip: true,
                    maxTicksLimit: 5
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