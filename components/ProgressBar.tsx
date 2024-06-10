"use client"

import { useEffect, useState } from "react";
import Image from "next/image"
import icon from "@/public/icon/fee_samearea.svg"
import { Tooltip } from "chart.js";

export default function Progressbar({progress, myfee}: {progress:number, myfee:number}){
    const [rate, setRate] = useState(0);
    const [toolTip, setToolTip] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setRate((prev) => prev < progress ? prev + 5 : prev)
        }, 30);
        if(myfee === undefined)
            setRate(0)
        return () => clearInterval(interval);
      }, [myfee]);
    
    return (
        <div className="w-full flex flex-col justify-between gap-4">
            <span className={`${toolTip ? "hidden" : "h-14 py-8"}`}></span>
            <div className={`${!toolTip ? "hidden" : ""} ${myfee === undefined ? "invisible" : "visible"} w-full relative transition-width duration-500 ease-in-out py-8`}
                 style={{width: `calc(${rate}% + 30px)`}} >
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 bg-grey_50 rounded h-14">
                        <p className="text-center text-main_color text-sm font-medium">우리집</p>
                        <p className={`text-center text-main_color text-base font-semibold `}>{myfee && myfee.toLocaleString('ko-KR')}</p>
                    </div>
            </div>
            <div className="w-full bg-grey_100 rounded-full h-2.5 dark:bg-gray-700">
                <div className={`relative bg-main_color h-2.5 rounded-full transition-width duration-500 ease-in-out`}
                    style={{width: `${rate}%`}}>
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 hover:cursor-pointer"
                        onClick={(() => setToolTip(!toolTip))}>
                        <Image
                            src={icon.src}
                            alt="전년 동월 대비 아이콘"
                            width={30}
                            height={30}
                        />
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}