"use client"

import { useEffect, useState } from "react";
import Image from "next/image"
// import icon from "@/public/icon/fee_samearea.svg"

export default function Progressbar({progress}: {progress:number}){
    const [rate, setRate] = useState(0);
    const [toolTip, setToolTip] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setRate((prev) => prev < progress ? prev + 10 : prev)
        }, 50);
    
        return () => clearInterval(interval);
      }, []);
    
    const handleClickIcon = () => {
        setToolTip(!toolTip)
    }

    return (
        <div className="w-full flex flex-col justify-between gap-4">
            <span className={`${toolTip ? "hidden" : "h-14 py-2"}`}></span>
            <div className={`${!toolTip ? "hidden" : ""} flex`}>
                <span className="w-full transition-width duration-200 ease-in-out"
                      style={{width: `${rate}%`}}></span>
                <div className="w-[93px] h-14 px-4 py-2 bg-grey_50 rounded flex-col justify-center items-center gap-1 inline-flex">
                    <div className="text-center text-teal-700 text-sm font-medium font-['Pretendard']">우리집</div>
                    <div className="text-center text-teal-700 text-base font-semibold font-['Pretendard']">432,100</div>
                </div>
            </div>
            
            <div className="w-full bg-grey_100 rounded-full h-2.5 dark:bg-gray-700">
                <div className={`relative bg-main_color h-2.5 rounded-full transition-width duration-200 ease-in-out`}
                    style={{width: `${rate}%`}}>
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 hover:cursor-pointer"
                        onClick={handleClickIcon}>
                        {/* <Image
                            src={icon.src}
                            alt="전년 동월 대비 아이콘"
                            width={30}
                            height={30}
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}