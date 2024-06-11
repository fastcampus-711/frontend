"use client"

import DoughnutGraph from "@/components/Doughnut";
import LineGraph from "@/components/LineGraph";
import ProgressBar from "@/components/ProgressBar";
import BoardSubMenuBar from "@/components/submenu/SubMenuBar";
import { useEffect, useState } from "react";
import Image from "next/image"


import feeAd from "@/public/img/feeAd.png"
import detailBtn from "@/public/icon/fee_detailBtn_arrow.svg"
import feeIncrease from "@/public/icon/fee_increase.svg"
import feeDecrease from "@/public/icon/fee_decrease.svg"
import inequality_left from "@/public/icon/inequality_left.svg"
import inequality_right from "@/public/icon/inequality_right.svg"
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Confirm from "./modal/confirm";
import Modal from "./modal/Modal";
import DiscountModal from "./modal/DiscountModal";

type circular = {
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

type summary = {
    before_deadline_fee: number
    fare_collection_discount: {
        maintenance_discount: number
        hiring_discount: number
        summer_electricity_discount: number
        parking_fee_discount: number
        voucher_discount: number
        electricity_discount: number
        water_discount: number
    }
    unpaid_fee: number
    after_deadline_fee: number
}

type month_on_month = {
    maintenance_fee_of_present: number
    maintenance_fee_of_last_month: number
    maintenance_fee_of_two_months_ago: number
}

type year_on_year = {
    maintenance_fee_of_present: number,
    maintenance_fee_of_last_year: number
}

type square_on_square = {
    maintenance_fee_of_present: number,
    min_maintenance_fee_of_same_squares: number,
    max_maintenance_fee_of_same_squares: number
}

type id = {
    house_id: number
    imposition_date: string
}
  
type detailFee = {
    id: id
    payment_due_date: string
    start_service_date: string
    end_service_date: string
    before_deadline_fee: number
    after_deadline_fee: number
    current_month_fee: number
    sub_maintenance_fee: any //not use
    fare_collection_fee: any //not use
    energy_usage: any //not use
    unpaid_fee: number
    late_fee: number
    after_deadline_late_fee: number
  }



type props = {
    year: number
    month: number
    circular: any
    summary: any
    month_on_month: any
    year_on_year: any
    square_on_square: any
    details: any
}

export default function MyFeeContent({
        year, 
        month,
        circular, 
        summary, 
        month_on_month, 
        year_on_year, 
        square_on_square, 
        details } : props ) {
    
        const [selectedYear, setSelectedYear] = useState(year)
        const [selectedMonth, setSelectedMonth] = useState(month)

        //circular
        const circulars : circular = circular.data
        //summary
        const summaries : summary = summary.data
        const values = summaries && Object.values(summaries.fare_collection_discount)
        const discountInformation = summaries && summaries.fare_collection_discount
        const discountFee = summaries && values.reduce((acc, curr) => acc + curr, 0)
        //month-on-month
        const months: month_on_month = month_on_month.data
        //year-on-year
        const years: year_on_year = year_on_year.data
        //square-on-square
        const square: square_on_square = square_on_square.data
        //details
        const detail: detailFee = details.data

        //입주 년도 & 월
        const MoveInYear : number = 2017
        const MoveInMonth : number = 10
        const address = "패스트아파트 101동 1001호"

        //납부기한
        const [dueDate, setDueDate] = useState(20)

        //전월 대비 관리비 사용 금액 비교
        const [compareMonthFee, setCompareMonthFee] = useState("-원")
        const [compareMonthState, setCompareMonthState] = useState("none")
        //전년 대비 관리비 사용 금액 비교
        const [compareYearFee, setCompareYearFee] = useState("-원")
        const [compareYearState, setCompareYearState] = useState("none")

        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1; //왜 4월로 나오지...?
     
        const [startMonth, setStartMonth] = useState(1)
        const [endMonth, setEndMonth] = useState(currentMonth)

        const router = useRouter()

        // useEffect(()=> {
        //     // router.push(`/fee/my?year=${selectedYear}&month=${selectedMonth}`)

            
        //         setDate()
        //         compareMonth()
        //         compareYear()
            
            
        // },[selectedYear, selectedMonth])

        // useEffect(() => {
            
        //     setDate()         
        // }, [selectedYear, selectedMonth])

        useEffect(() => {
            compareMonth()
            compareYear()
            setDate()
        }, [usePathname(), useSearchParams()])
    
        const compareMonth = () => {
            if(months && months.maintenance_fee_of_present - months.maintenance_fee_of_last_month >= 0) {
                setCompareMonthFee(`+${(months.maintenance_fee_of_present - months.maintenance_fee_of_last_month).toLocaleString('ko-KR')}원`)
                setCompareMonthState("positive")
            } else if (months && months.maintenance_fee_of_present - months.maintenance_fee_of_last_month < 0) {
                setCompareMonthFee(`${(months.maintenance_fee_of_present - months.maintenance_fee_of_last_month).toLocaleString('ko-KR')}원`)
                setCompareMonthState("negative")
            } else {
                setCompareMonthFee("-원")
                setCompareMonthState("none")
            }
        }
        const compareYear = () => {
            if(years && years.maintenance_fee_of_present - years.maintenance_fee_of_last_year >= 0){
                setCompareYearFee(`+${(years.maintenance_fee_of_present - years.maintenance_fee_of_last_year).toLocaleString('ko-KR')}원`)
                setCompareYearState("positive")
            } else if (years && years.maintenance_fee_of_present - years.maintenance_fee_of_last_year < 0) {
                setCompareYearFee(`${(years.maintenance_fee_of_present - years.maintenance_fee_of_last_year).toLocaleString('ko-KR')}원`)
                setCompareYearState("negative")
            } else {
                setCompareYearFee("-원")
                setCompareYearState("none")
            }
        }
        
        const setDate = () => {
            if(selectedYear === currentYear) {
                setEndMonth(currentMonth)
                setStartMonth(1)
            } else if(selectedYear === MoveInYear) {
                setEndMonth(12)
                setStartMonth(MoveInMonth)
            }
            else {
                setEndMonth(12)
                setStartMonth(1)
            }
        }

        const handleSelectYearChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
            const select = parseInt(event.target.value)
            setSelectedYear(select)
            router.push(`/fee/my?year=${select}&month=${selectedMonth}`)
        }
        const handleSelectMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const select = parseInt(event.target.value)
            setSelectedMonth(select)
            router.push(`/fee/my?year=${selectedYear}&month=${select}`)
        }

        // const handleSelectYearChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
        //     const select = parseInt(event.target.value)
        //     setSelectedYear(select)
        // }
        // const handleSelectMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        //     const select = parseInt(event.target.value)
        //     setSelectedMonth(select)
        // }
    
        function addLeadingZero(number: number): string {
            const numberString = number.toString();
            if (numberString.length < 2) {
                return '0' + numberString;
            }
            return numberString;
        }


        const [isModalOpen, setIsModalOpen] = useState(false)
        const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false)

        const handleOpenModal = () => {
            setIsModalOpen(true)
        }
        const handleCloseModal = () => {
            setIsModalOpen(false)
        }
        const handleOpenDiscountModal = () => {
            setIsDiscountModalOpen(true)
        }
        const handleDiscountModal = () => {
            setIsDiscountModalOpen(false)
        }


        return (
            <div className="flex flex-col gap-8 max-w-[1200px] m-auto pb-10">
                <div className="relative">
                    <p className="text-grey_900 text-[32px] font-semibold">
                        관리비조회
                    </p>
                </div>
                <div className="w-[250px]">
                    <BoardSubMenuBar option="fee" category="my" />
                </div>
                
                
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
                            <div className="w-full h-[380px] flex flex-col items-center">
                                <DoughnutGraph year={year} month={month} getData={[
                                    circulars && circulars.rank_first_column_value,
                                    circulars && circulars.rank_second_column_value,
                                    circulars && circulars.rank_third_column_value,
                                    circulars && circulars.rank_fourth_column_value,
                                    circulars && circulars.rank_fifth_column_value,
                                    circulars && circulars.etc_value
                                ]} getLabel = {[
                                    "온수", "전기", "난방", "일반관리비", "수도", "기타"
                                ]}/>
                            </div>


                            {/* 연도, 월, 금액 */}
                            <div className="gap-4 font-semibold font-['Pretendard']">
                                <div className="flex gap-8">
                                    <select className="text-gray-600 h-10 pl-5 pr-10 bg-white hover:cursor-pointer focus:outline-none appearance-auto"
                                            value={selectedYear}
                                            onChange={handleSelectYearChange}>
                                        {Array.from({length: currentYear - MoveInYear + 1}, (_, index) => (
                                            <option key={currentYear - index} value={currentYear - index}>{currentYear - index}년</option>
                                        ))}
                                    </select>
                                    <select className="text-gray-600 h-10 pl-5 pr-10 bg-white hover:cursor-pointer focus:outline-none appearance-auto"
                                            value={selectedMonth}
                                            onChange={handleSelectMonthChange}>
                                        {Array.from({length: endMonth - startMonth + 1}, (_, index) => (
                                            <option key={endMonth - index} value={endMonth - index}>{endMonth-index}월</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex justify-center items-center text-[40px]">
                                    {summaries === undefined ? "-" : summaries.before_deadline_fee.toLocaleString('ko-KR')}원
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
                                            <span className="inline-flex gap-2">
                                                <p>감면금액</p>
                                                <button className="flex flex-nowrap items-center rounded bg-main_color text-white text-sm px-2 py-1 gap-2"
                                                        onClick={handleOpenDiscountModal}>
                                                    <p>상세내역 확인</p>
                                                    <Image
                                                        src={detailBtn.src}
                                                        alt="상세내역 아이콘"
                                                        width={10}
                                                        height={6}
                                                    />
                                                    
                                                </button>
                                                <DiscountModal isOpen={isDiscountModalOpen} onClose={handleDiscountModal} data={discountInformation}/>
                                            </span>
                                            <div className="border-r-2 border-grey_200"></div>
                                        </span>
                                        <span className="flex justify-between">
                                            <p>미납금액</p>
                                            <div className="border-r-2 border-grey_200"></div>
                                        </span>
                                        <span className="flex justify-between">
                                            <p>납기후금액</p>
                                            <div className="border-r-2 border-grey_200"></div>
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-6 text-right font-semibold">
                                        <p>{summaries === undefined ? "-" : summaries.before_deadline_fee.toLocaleString('ko-KR')}원</p>
                                        <p>{summaries === undefined ? "-" :  discountFee.toLocaleString('ko-KR')}원</p>
                                        <p>{summaries === undefined ? "-" :  summaries.unpaid_fee.toLocaleString('ko-KR')}원</p>
                                        <p>{summaries === undefined ? "-" :  summaries.after_deadline_fee.toLocaleString('ko-KR')}원</p>
                                    </div>
                                </div>
                                {/* 사용기간, 납부기한 */}
                                <div className="flex flex-col w-full h-[147px] justify-start items-center gap-4">
                                    <div className="inline-flex flex-col self-stretch p-4 bg-grey_25 rounded-lg justify-center items-center gap-2
                                                    text-grey_400 text-base text-center font-['Pretendard']">
                                        <div className="font-normal">사용기간 : {selectedYear}.{addLeadingZero(selectedMonth)}.01~{selectedYear}.{addLeadingZero(selectedMonth)}.30</div>
                                        {/* <div className="font-semibold">납부기한 : {(selectedMonth + 1 === 13) ? (selectedYear + 1) : selectedYear}년 {(selectedMonth + 1 == 13) ? addLeadingZero(1) : (selectedMonth + 1)}월 30일까지</div> */}
                                        {/* <div className="font-semibold">납부기한 : {dueYear}년 {addLeadingZero(dueMonth)}월 {addLeadingZero(dueDate)}일까지</div> */}
                                        <div className="font-semibold">납부기한 : {
                                            (selectedMonth + 1 === 13) 
                                            ? (Number(selectedYear) + Number(1)) 
                                            : selectedYear}년 {
                                                (selectedMonth + 1 == 13) 
                                                ? addLeadingZero(1) 
                                                : (Number(selectedMonth) + Number(1))}월 {dueDate}일까지</div>
                                    </div>
                                </div>
                                {/* 관리비 납부 은행 */}
                                <button className="inline-flex self-stretch p-4 bg-main_color text-white rounded-lg justify-center items-center gap-2.5"
                                        onClick={handleOpenModal}>관리비 납부 은행</button>
                                {/* <Modal isOpen={isModalOpen} onClose={handleCloseModal}/> */}
                                <Modal isOpen={isModalOpen} onClose={handleCloseModal} content={true} />
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
                                        <span className={`flex flex-nowrap gap-1 
                                            ${(compareMonthState === "positive") 
                                            ? "text-increase_color" 
                                            : (compareMonthState === "negative" ? "text-decrease_color" : "text-grey_500")}`}>
                                            {compareMonthFee}
                                            <Image
                                                 hidden={compareMonthState === "none"}
                                                 src={(compareMonthState === "positive") 
                                                     ? feeIncrease.src 
                                                     : feeDecrease.src}
                                                alt="전월대비 아이콘"
                                                width={16}
                                                height={16}
                                            />
                                        </span>
                                    </div>
                                    <div>
                                        <LineGraph year={year} month={month} getData={[
                                            months && months.maintenance_fee_of_two_months_ago,
                                            months && months.maintenance_fee_of_last_month,
                                            months && months.maintenance_fee_of_present
                                        ]}/>
                                    </div>
                                    <div className="w-full px-4 py-2 inline-flex justify-around items-center">
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
                                        <span className={`flex flex-nowrap gap-1 
                                            ${(compareYearState === "positive") 
                                                ? "text-increase_color" 
                                                : (compareYearState === "negative" ? "text-decrease_color" : "text-grey_500")}`}>
                                                {compareYearFee}
                                            <Image
                                                hidden={compareYearState === "none"}
                                                src={(compareYearState === "positive") 
                                                    ? feeIncrease.src 
                                                    : feeDecrease.src}
                                                alt="전년 동월 대비 아이콘"
                                                width={16}
                                                height={16}
                                            />
                                        </span>
                                    </div>
                                    <div className="px-12 py-6 bg-grey_25 rounded-lg justify-between items-center inline-flex">
                                        <span className="flex-col justify-start items-center gap-3 inline-flex">
                                            <p className={`${(compareYearState === "negative")  
                                                ? "text-xl" 
                                                : "text-grey_400 text-base"} font-medium`}>{selectedYear-1}년 {selectedMonth}월</p>
                                            <p className={`${(compareYearState === "negative")  
                                                ? "text-2xl" 
                                                : "text-grey_400 text-xl"} font-semibold`}>
                                                    {years === undefined 
                                                    ? "-" 
                                                    : years.maintenance_fee_of_last_year.toLocaleString('ko-KR')}원</p>
                                        </span>
                                        <Image
                                            src={((compareYearState === "negative")) ? inequality_left.src : inequality_right.src}
                                            alt="전년 동월 대비 아이콘"
                                            width={10}
                                            height={10}
                                        />
                                        <span className="flex-col justify-start items-center gap-3 inline-flex">
                                            <p className={`${(compareYearState === "positive")  
                                                ? "text-xl" 
                                                : "text-grey_400 text-base"} font-medium`}>{selectedYear}년 {selectedMonth}월</p>
                                            <p className={`${(compareYearState === "positive")  
                                                ? "text-2xl" 
                                                : "text-grey_400 text-xl"} font-semibold`}>
                                                    {years === undefined 
                                                    ? "-" 
                                                    : years.maintenance_fee_of_present.toLocaleString('ko-KR')}원</p>
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
                                        <ProgressBar progress={Math.round((square && square.maintenance_fee_of_present
                                        /square.max_maintenance_fee_of_same_squares
                                        * 100))} myfee={square && square.maintenance_fee_of_present}/>
                                        <div className="w-full flex justify-between text-center">
                                            <span>
                                                <p className="text-sm font-medium">최소</p>
                                                <p className="text-base font-medium">{square && square.min_maintenance_fee_of_same_squares.toLocaleString('ko-KR')}</p>
                                            </span>
                                            <span>
                                                <p className="text-sm font-medium">평균</p>
                                                <p className="text-base font-medium">{square && (square.min_maintenance_fee_of_same_squares + square.max_maintenance_fee_of_same_squares / 2).toLocaleString('ko-KR')}</p>
                                            </span>
                                            <span>
                                                <p className="text-sm font-medium">최대</p>
                                                <p className="text-base font-medium">{square && square.max_maintenance_fee_of_same_squares.toLocaleString('ko-KR')}</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div className="w-full h-[100px] px-6 py-4 bg-grey_25 rounded-2xl border border-grey_200 justify-between items-start inline-flex">
                                <div className="w-full inline-flex justify-between">
                                        <div className="flex flex-col justify-center gap-2">
                                            <div className="text-neutral-700 text-xl font-semibold">윗집도 아랫집도 가입했다는데!</div>
                                            <div className="text-neutral-700 text-lg font-normal">우리집 지키는 KB주택화재보험</div>
                                        </div>
                                        <div className="relative">
                                            <img className="w-28 h-16 rounded-lg" 
                                                src="https://s3-alpha-sig.figma.com/img/648e/2db7/61a0905250fa5a32ef840261266b2cdd?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=N12Ijn~HC8xrDH03G3QleiBCvFxNoG7mcjc9UmD~gBhwXfZG3J2L5p14FcuX9QtHeoNfIuENlS21Vd0QXTXNzVN4KHFL6l5luk8Y77YDuTVInltTXRMhEBqgCHiAdgDHVY9pF3Q78iNysyQa9xJF1h5VTFuo7HiuNSIdUORA01GTOJmZsQgXumk8Xx4ZCqjEe44k7wXqvMozmx4IBCm9W9L9USuxu6p8tjIEG1ZuV~vcdlXpz-a2uVnIQFhurAodpeuZ9tctDQOjU7W0dtGBoqZjTB4QHiST9r5jnX2Ly5V08sy-JyCsiNpNWFo1lHnVF1ZjC3gEYyhKtv1PApwekQ__" />
                                            <div className="absolute top-0 right-0 px-2 py-1 bg-zinc-800 rounded-2xl gap-2.5 flex">
                                                <div className="text-white text-sm font-normal">AD</div>
                                            </div>
                                        </div>
                                </div>
                            </div>

                            
                        </div>
                    </div>
                </div>
            </div>
        )
      }