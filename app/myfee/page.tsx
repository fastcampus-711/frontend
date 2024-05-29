"use client"

import DoughnutGraph from "@/components/Doughnut";
import LineGraph from "@/components/LineGraph";
import ProgressBar from "@/components/ProgressBar";
import BoardSubMenuBar from "@/components/submenu/SubMenuBar";
import { useEffect, useState } from "react";
import Image from "next/image"

import detailBtn from "@/public/icon/fee_detailBtn_arrow.svg"
import feeIncrease from "@/public/icon/fee_increase.svg"
import feeDecrease from "@/public/icon/fee_decrease.svg"
import inequality_left from "@/public/icon/inequality_left.svg"
import inequality_right from "@/public/icon/inequality_right.svg"

type fee = {
    ontime: number,
    discount: number,
    notPay: number,
    afterPay: number
}

export default function MyFeeContent() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; //왜 4월로 나오지...?

    const [year, setYear] = useState(currentYear)
    const [month, setMonth] = useState(currentMonth)
    const [startMonth, setStartMonth] = useState(1)
    const [endMonth, setEndMonth] = useState(12)

    const address = "패스트아파트 101동 1001호"

    const feeLabels = ["온수", "전기","난방","일반관리비","수도","기타"]
    const feeValues = [88888, 77777, 66666, 55555, 44444, 33333]
    
    //관리비 (납기 내 금액, 감면 금액, 미납 금액, 납기 후 금액)
    const fees : fee = {ontime: 432100, discount: 15000, notPay: 0, afterPay: 432100 }

    //입주 년도 & 월
    const MoveInYear : number = 2015
    const MoveInMonth = 5

    const totalFee = 432100

    const compareArea = [
        {label: "최소", value: "228,390"},
        {label: "평균", value: "367,030"},
        {label: "최대", value: "560,970"},
    ]

    //전월 대비 관리비 사용 금액 비교
    const compareMonthFee = 38222

    //전년동월과 당월 관리비 비교
    const lastYearFee = 342000
    const currentYearFee = 432100

    useEffect(() => {
        if(year === currentYear) {
            setMonth(currentMonth)
            setEndMonth(currentMonth)
            setStartMonth(1)
        } else if(year === MoveInYear) {
            setMonth(12)
            setEndMonth(12)
            setStartMonth(MoveInMonth)
        }
        else {
            setMonth(12) 
            setEndMonth(12)
            setStartMonth(1)
        }
    }, [year])

    const handleSelectYearChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
        const selectedYear = parseInt(event.target.value)
        setYear(selectedYear)
    }
    const handleSelectMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMonth = parseInt(event.target.value)
        setMonth(selectedMonth)
    }


    return (
        <div className="flex flex-col gap-8 max-w-[1200px] m-auto pb-10">
            <div className="relative">
                <p className="text-grey_900 text-[32px] font-semibold">
                    관리비조회
                </p>
            </div>
            <BoardSubMenuBar option="fee" category="myfee" />
            
            <div className="max-w-[1200px] m-auto pb-40">
                <div className="flex justify-start items-start gap-6">
                    {/* 우리집 관리비 왼쪽 */}
                    <div className="w-[637px] h-[1050px] pb-6 rounded-2xl border border-grey_200 flex-col justify-start items-center gap-6 inline-flex">
                        {/* 월 관리비, 주소 */}
                        <div className="h-[88px] flex flex-col w-full py-5 bg-grey_50 border-b border-grey_200 rounded-tl-2xl rounded-tr-2xl justify-center items-center gap-3">
                            <div className="self-stretch flex-col justify-center items-center gap-2 flex">
                                <p className="text-center text-xl font-semibold font-['Pretendard']">
                                    {month}월 관리비
                                </p>
                                <p className="text-center text-grey_600 text-lg font-normal font-['Pretendard']">
                                    {address}
                                </p>
                            </div>
                        </div>

                        {/* 도넛 그래프 */}
                        <div className="w-full flex flex-col justify-start items-center">
                            <DoughnutGraph labels={feeLabels} values={feeValues}/>
                        </div>
                        
                        {/* 연도, 월, 금액 */}
                        <div className="gap-4 font-semibold font-['Pretendard']">
                            <div className="flex gap-8">
                                <select className="text-gray-600 h-10 pl-5 pr-10 bg-white hover:cursor-pointer focus:outline-none appearance-auto"
                                        value={year}
                                        onChange={handleSelectYearChange}>
                                    {Array.from({length: currentYear - MoveInYear + 1}, (_, index) => (
                                        <option key={currentYear - index} value={currentYear - index}>{currentYear - index}년</option>
                                    ))}
                                </select>
                                <select className="text-gray-600 h-10 pl-5 pr-10 bg-white hover:cursor-pointer focus:outline-none appearance-auto"
                                        value={month}
                                        onChange={handleSelectMonthChange}>
                                    {Array.from({length: endMonth - startMonth + 1}, (_, index) => (
                                        <option key={endMonth - index} value={endMonth - index}>{endMonth - index}월</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-center items-center text-[40px]">
                                {totalFee.toLocaleString('ko-KR')}원
                            </div>
                        </div>
                        
                        {/* 납기내금액, 감면금액, 미납금액, 사용기간, 납부기한, 관리비 납부 은행*/}
                        <div className="inline-flex flex-col w-[582.50px] h-[327px] justify-start items-center gap-6">
                            {/* 납기내금액, 감면금액, 미납금액, */}
                            <div className="flex w-full justify-between px-6">
                                <div className="w-1/2 flex flex-col gap-6 text-left text-grey_400 font-normal">
                                    <span className="flex justify-between">
                                        <p>납기내금액</p>
                                        <div className="border-r-2 border-grey_200"></div>
                                    </span>
                                    <span className="flex justify-between">
                                        <p>감면금액</p>
                                        <button className="flex flex-nowrap items-center rounded bg-main_color text-white text-sm px-2 py-1 gap-2">
                                            <p>상세내역 확인</p>
                                            <Image
                                                src={detailBtn.src}
                                                alt="상세내역 아이콘"
                                                width={10}
                                                height={6}
                                            />
                                        </button>
                                        <div className="border-r-2 border-grey_200"></div>
                                    </span>
                                    <span className="flex justify-between">
                                        <p>미납금액</p>
                                        <div className="border-r-2 border-grey_200"></div>
                                    </span>
                                    <span className="flex justify-between">
                                        <p>납기후금액</p>
                                        <div className="border-r-2 border-grey_200"></div>
                                        <div className="w-5 h-[0px] rotate-90 origin-top-left border border-grey_200"></div>
                                    </span>
                                </div>
                                <div className="flex flex-col gap-6 text-right font-semibold">
                                    {/* {arr.map((item) => (
                                        <p>{item.fee}원</p>
                                    ))} */}
                                    <p>{fees.ontime.toLocaleString('ko-KR')}원</p>
                                    <p>{fees.discount.toLocaleString('ko-KR')}원</p>
                                    <p>{fees.notPay.toLocaleString('ko-KR')}원</p>
                                    <p>{fees.afterPay.toLocaleString('ko-KR')}원</p>
                                </div>
                            </div>
                            {/* 사용기간, 납부기한 */}
                            <div className="flex flex-col w-full h-[147px] justify-start items-center gap-4">
                                <div className="inline-flex flex-col self-stretch p-4 bg-grey_25 rounded-lg justify-center items-center gap-2
                                                text-grey_400 text-base text-center font-['Pretendard']">
                                    <div className="font-normal">사용기간 : {year}.{month}.01~{year}.{month}.30</div>
                                    <div className="font-semibold">납부기한 : {(month + 1 === 13) ? (year + 1) : year}년 {(month + 1 === 13) ? 1 : month+1}월 30일까지</div>
                                </div>
                            </div>
                            {/* 관리비 납부 은행 */}
                            <button className="inline-flex self-stretch p-4 bg-main_color text-white rounded-lg justify-center items-center gap-2.5">관리비 납부 은행</button>
                        </div>
                    </div>

                    {/* 우리집 관리비 오른쪽 */}
                    <div className="flex flex-col w-[539px] h-[1050px] justify-between items-center font-['Pretendard']">
                        <div className="w-full flex flex-col rounded-2xl border border-grey_200 gap-6 ">
                            <div className="px-6 py-4 bg-grey_50 rounded-tl-2xl rounded-tr-2xl border-b border-grey_200">
                                <p className="text-lg font-medium">전월 대비 관리비 사용 금액 비교</p>
                            </div>
                            
                            <div className="flex flex-col justify-start px-6 pb-6">
                                <div className="inline-flex p-2 justify-start items-center gap-1 text-base font-medium">
                                    <span>
                                        전월 대비{" "}
                                    </span>
                                    <span className={`flex flex-nowrap gap-1 ${(compareMonthFee > 0) ? "text-red-500" : "text-sky-500"}`}>
                                        {(compareMonthFee > 0) ? `+${compareMonthFee.toLocaleString('ko-KR')}원` : `-${compareMonthFee.toLocaleString('ko-KR')}원`}
                                        <Image
                                            src={(compareMonthFee > 0) ? feeIncrease.src : feeDecrease.src}
                                            alt="전월대비 아이콘"
                                            width={16}
                                            height={16}
                                        />
                                    </span>
                                </div>
                                <div>
                                    <LineGraph />
                                </div>
                                <div className="w-full px-4 py-2 inline-flex justify-between items-center">
                                    <p className="text-grey_300 font-normal">{(month == 2) ? 12 : ((month == 1) ? 11 : (month-2))}월</p>
                                    <p className="text-grey_300 font-normal">{(month == 1) ? 12 : (month-1)}월</p>
                                    <p className="font-medium">{month}월</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="w-full flex flex-col rounded-2xl border border-grey_200 gap-6">
                            <div className="px-6 py-4 bg-grey_50 rounded-tl-2xl rounded-tr-2xl border-b border-grey_200">
                                <p className="text-lg font-medium">전년동월과 당월 관리비 비교</p>
                            </div>
                            
                            <div className="flex flex-col justify-start px-6 pb-6">
                                <div className="inline-flex p-2 justify-start items-center gap-1 text-base font-medium">
                                    <span>
                                        전년 동월 대비{" "}
                                    </span>
                                    <span className={`flex flex-nowrap gap-1 ${(compareMonthFee > 0) ? "text-red-500" : "text-sky-500"}`}>
                                        {(compareMonthFee > 0) ? `+${compareMonthFee.toLocaleString('ko-KR')}원` : `-${compareMonthFee.toLocaleString('ko-KR')}원`}
                                        <Image
                                            src={(compareMonthFee > 0) ? feeIncrease.src : feeDecrease.src}
                                            alt="전년 동월 대비 아이콘"
                                            width={16}
                                            height={16}
                                        />
                                    </span>
                                </div>
                                <div className="px-12 py-6 bg-grey_25 rounded-lg justify-between items-center inline-flex">
                                    <span className="flex-col justify-start items-center gap-3 inline-flex">
                                        <p className={`${lastYearFee > currentYearFee ? "text-xl" : "text-grey_400 text-base"} font-medium`}>{year-1}년 {month}월</p>
                                        <p className={`${lastYearFee > currentYearFee ? "text-2xl" : "text-grey_400 text-xl"} font-semibold`}>{lastYearFee.toLocaleString('ko-KR')}원</p>
                                    </span>
                                    <Image
                                        src={(lastYearFee > currentYearFee) ? inequality_left.src : inequality_right.src}
                                        alt="전년 동월 대비 아이콘"
                                        width={10}
                                        height={10}
                                    />
                                    <span className="flex-col justify-start items-center gap-3 inline-flex">
                                        <p className={`${lastYearFee < currentYearFee ? "text-xl" : "text-grey_400 text-base"} font-medium`}>{year}년 {month}월</p>
                                        <p className={`${lastYearFee < currentYearFee ? "text-2xl" : "text-grey_400 text-xl"} font-semibold`}>{currentYearFee.toLocaleString('ko-KR')}원</p>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-col rounded-2xl border border-grey_200 gap-6">
                            <div className="px-6 py-4 bg-grey_50 rounded-tl-2xl rounded-tr-2xl border-b border-grey_200">
                                <p className="text-lg font-medium">동일면적 관리비 비교</p>
                            </div>
                            
                            <div className="flex flex-col justify-start px-6 py-6">
                                <div className="flex flex-col h-[172px] gap-4 items-end">
                                    <ProgressBar progress={65} />
                                    <div className="w-full flex justify-between text-center">
                                        <span>
                                            <p className="text-sm font-medium">최소</p>
                                            <p className="text-base font-medium">228,390</p>
                                        </span>
                                        <span>
                                            <p className="text-sm font-medium">평균</p>
                                            <p className="text-base font-medium">367,030</p>
                                        </span>
                                        <span>
                                            <p className="text-sm font-medium">최대</p>
                                            <p className="text-base font-medium">560,970</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full  h-[100px] px-6 py-4 bg-grey_25 rounded-2xl border border-grey_200 justify-between items-start inline-flex">
                            <div className="flex-col justify-center items-start gap-2 inline-flex">
                                <p>광고</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }