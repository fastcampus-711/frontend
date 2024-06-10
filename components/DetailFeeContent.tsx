"use client"

import BoardSubMenuBar from "@/components/submenu/SubMenuBar"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import HorizontalBar from "./HorizontalBar"
import HalfDoughnutGraph from "./HalfDoughnut"
import Image from "next/image"

import feeIncrease from "@/public/icon/fee_increase.svg"
import feeDecrease from "@/public/icon/fee_decrease.svg"

type id = {
  house_id: number
  imposition_date: string
}

type sub_maintenance_fee = {
  sub_maintenance_total_fee: number
  general_maintenance_fee: number
  cleaning_fee: number
  dis_intection_fee: number
  lift_fee: number
  repairing_fee: number
  long_term_repairing_fee: number
  security_fee: number
  septictank_fee: number
  insurance_fee: number
  representative_meeting_fee: number
  brokerage_commission: number
  parking_fee: number
  common_heating_fee: number
}
type fare_collection_fee = {
  fare_collection_total_fee: number
  municipal_waste_fee: number
  election_commission_fee: number
  suspend_receipt: number
  household_electricity_fee: number
  common_electricity_fee: number
  household_water_fee: number
  common_water_fee: number
  household_hot_water_fee: number
  common_hot_water_fee: number
  household_heating_fee: number
  lift_electricity_fee: number
  tv_license_fee: number
  sewage_fee: number
  fare_collection_discount: fare_collection_discount
}
type fare_collection_discount = {
  maintenance_discount: number
  hiring_discount: number
  summer_electricity_discount: number
  parking_fee_discount: number
  voucher_discount: number
  electricity_discount: number
  water_discount: number
}
type energy_usage = {
  electricity_usage: number
  water_usage: number
  hot_water_usage: number
  heating_usage: number
  gas_usage: number
  previous_month_electricity_guideline: number
  current_month_electricity_guideline: number
  previous_month_water_guideline: number
  current_month_water_guideline: number
  previous_month_hot_water_guideline: number
  current_month_hot_water_guideline: number
  previous_month_heating_guideline: number
  current_month_heating_guideline: number
  previous_month_gas_guideline: number
  current_month_gas_guideline: number
}


type energy = {
  energy_type: string 
  present_usage: number
  present_fee: number
  last_year_usage: number
  last_year_fee: number
  average_usage_of_same_square: number,
  average_fee_of_same_square: number
}

type detailFee = {
  id: id
  payment_due_date: string
  start_service_date: string
  end_service_date: string
  before_deadline_fee: number
  after_deadline_fee: number
  current_month_fee: number
  sub_maintenance_fee: sub_maintenance_fee
  fare_collection_fee: fare_collection_fee
  energy_usage: energy_usage
  unpaid_fee: number
  late_fee: number
  after_deadline_late_fee: number
}

type props = {
  year: number
  month: number
  energy: any
  details: any
  lastYearDetails: any
}

export default function DetailFeeContent({
  year,
  month,
  energy,
  details,
  lastYearDetails
}:props) {
  const [selectedYear, setSelectedYear] = useState(year)
  const [selectedMonth, setSelectedMonth] = useState(month)

  //energy
  const energyData : energy = energy.data
  // const [energyDatas, setEnergyDatas] = useState<energy[]>(energy && energy.data)
  const [energyIndex, setEnergyIndex] = useState(0)
  const categories = ["전기", "수도", "온수", "난방"]
  const energyDatas : energy[] = energy && energy.data

  const [monthUsage, setMonthUsage] = useState("-%")
  const [averageUsage, setAverageUsage] = useState("-%")
  const [monthUsageState, setMonthUsageState] = useState("none")
  const [averageUsageState, setAverageUsageState] = useState("none")

  //details
  const detail : detailFee = details && details.data
  const lastDetail : detailFee = lastYearDetails && lastYearDetails.data
  const subFee : sub_maintenance_fee = detail && detail.sub_maintenance_fee
  const lastSubFee : sub_maintenance_fee = lastDetail && lastDetail.sub_maintenance_fee

  const [category, setCategory] = useState("전기")
  const unit : string[] = ["Kwh", "m³", "Mcal/h", "MJ"]

  const detailItems = [
    {label: "일반 관리비", value1: subFee && subFee.general_maintenance_fee, value2:lastSubFee && lastSubFee.general_maintenance_fee},
    {label: "청소비", value1:subFee && subFee.cleaning_fee, value2:lastSubFee && lastSubFee.cleaning_fee},
    {label: "경비비", value1:subFee && subFee.security_fee, value2:lastSubFee && lastSubFee.security_fee},
    {label: "소독비", value1:subFee && subFee.dis_intection_fee, value2:lastSubFee && lastSubFee.dis_intection_fee},
    {label: "승강기유지비", value1:subFee && subFee.lift_fee, value2:lastSubFee && lastSubFee.lift_fee},
    {label: "장기수선충당금", value1:subFee && subFee.long_term_repairing_fee, value2:lastSubFee && lastSubFee.long_term_repairing_fee},
    {label: "대표회의운영비", value1:subFee && subFee.representative_meeting_fee, value2:lastSubFee && lastSubFee.representative_meeting_fee},
  ]

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; //왜 4월로 나오지...?

  const [startMonth, setStartMonth] = useState(1)
  const [endMonth, setEndMonth] = useState(12)

  //입주 년도 & 월
  const MoveInYear : number = 2015
  const MoveInMonth = 5

  const router = useRouter()

  const compareMonthUsage = () => {
    const data = energyDatas && Math.round((
      energyDatas[energyIndex].present_usage
    - energyDatas[energyIndex].last_year_usage) 
    /energyDatas[energyIndex].present_usage
    * 100)
    setMonthUsage(`${data}%`)

    if(data > 0) {
      setMonthUsage(`+${data}%`)
      setMonthUsageState("positive")
    } else if(data <=0) {
      setMonthUsage(`${data}%`)
      setMonthUsageState("negative")
    } else {
      setMonthUsage(`-%`)
      setMonthUsageState("none")
    }
  }

  const compareAverageUsage = () => {
    const data = energyDatas && Math.round((
      energyDatas[energyIndex].present_usage
    - energyDatas[energyIndex].average_usage_of_same_square) 
    /energyDatas[energyIndex].present_usage
    * 100)
    if(data > 0) {
      setAverageUsage(`+${data}%`)
      setAverageUsageState("positive")
    } else if(data <=0) {
      setAverageUsage(`${data}%`)
      setAverageUsageState("negative")
    } else {
      setAverageUsage(`-%`)
      setAverageUsageState("none")
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
  

  useEffect(() => {
    compareMonthUsage()
    compareAverageUsage()
    setDate()
  },[usePathname(), useSearchParams()])

  useEffect(() => {
    compareMonthUsage()
    compareAverageUsage()
  },[energyIndex])

  const handleSelectYearChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
    const select = parseInt(event.target.value)
    setSelectedYear(select)
    router.push(`/fee/detail?year=${select}&month=${selectedMonth}`)
  }
  const handleSelectMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const select = parseInt(event.target.value)
      setSelectedMonth(select)
      router.push(`/fee/detail?year=${selectedYear}&month=${select}`)
  }

  return (
    <>
      <div className="flex flex-col gap-8 max-w-[1200px] m-auto pb-10">
        <div className="relative">
            <p className="text-grey_900 text-[32px] font-semibold">
                관리비조회
            </p>
        </div>
        <div className="w-[250px]">
            <BoardSubMenuBar option="fee" category="detail" />
        </div>
        <div className="max-w-[1200px] m-auto">
          <div className="w-[1200px] bg-grey_25 rounded-2xl border border-grey_200 px-5 py-10 flex flex-col gap-6">
            {/* <div className="inline-flex  rounded-tl-2xl rounded-tr-2xl"> */}
              <div className="inline-flex justify-start items-center gap-10 px-6">
                <p className="text-2xl font-semibold">{selectedMonth}월 관리비 상세보기</p>
                <div className="inline-flex gap-2">
                  <select className="px-2 text-grey_500 bg-white rounded border border-grey_200 items-center gap-1 focus:outline-none appearance-auto"
                          value={year}
                          onChange={handleSelectYearChange}>
                      {Array.from({length: currentYear - MoveInYear + 1}, (_, index) => (
                          <option key={currentYear - index} value={currentYear - index}>{currentYear - index}년</option>
                      ))}
                  </select>
                  <select className="px-2 text-grey_500 bg-white rounded border border-grey_200 items-center gap-1 focus:outline-none appearance-auto"
                        value={month}
                        onChange={handleSelectMonthChange}>
                    {Array.from({length: endMonth - startMonth + 1}, (_, index) => (
                        <option key={endMonth - index} value={endMonth - index}>{endMonth - index}월</option>
                    ))}
                  </select>
                </div>
              </div>
                
            {/* </div> */}
            <div className="flex flex-col bg-white rounded-2xl border border-grey_200 gap-6">
              <div className="border-b border-grey_200 px-10 py-6">
                {selectedMonth}월 우리집 에너지 소비 현황
              </div>
              <div className="flex flex-col justify-start px-10 pb-6 gap-6">
                <div className="flex w-[592px] bg-white justify-between items-start">
                  <ul className="flex flex-wrap bg-grey_50 rounded-lg p-1 gap-2">
                    {categories && categories.map((item, index) => (
                      <li className={`inline-block px-[50px] py-2 rounded-lg items-center gap-2.5 hover:cursor-pointer ${category == item ? "text-white bg-grey_600" : "text-grey_250 hover:bg-grey_200"}`}
                            onClick={() => {
                              setCategory(item);
                              setEnergyIndex(index);
                            }}
                            key={index}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="h-[403px] flex justify-between gap-4">
                  <div className="flex flex-col gap-6">
                    <div>
                      <div className="flex justify-start py-4 border-b border-grey_200 font-semibold">
                        <p>전년동월과 당월</p>
                        <p className="text-main_color px-1">[{category}] </p>
                        <p>사용량/금액 비교</p>
                      </div>
                      <div className="inline-flex p-2 justify-start items-center gap-1 text-base font-medium">
                          <span>
                              전년동월 대비{" "}
                          </span>
                          <span className={`flex flex-nowrap gap-1 
                              ${(monthUsageState === "positive") 
                              ? "text-increase_color" 
                              : (monthUsageState === "negative" ? "text-decrease_color" : "text-grey_500")}`}>
                              {monthUsage}
                              <Image
                                    hidden={monthUsageState === "none"}
                                    src={(monthUsageState === "positive") 
                                        ? feeIncrease.src 
                                        : feeDecrease.src}
                                  alt="전월대비 아이콘"
                                  width={16}
                                  height={16}
                              />
                          </span>
                      </div>
                    </div>
                    <div className="w-[528px] h-[175px]">
                      <HorizontalBar year={selectedYear} month={selectedMonth} getData={energyDatas && [energyDatas[energyIndex].last_year_fee, energyDatas[energyIndex].present_fee]}/>
                    </div>
                    <div className="flex justify-between px-6 py-4  rounded-lg border border-grey_200 ">
                      <div className="w-1/2 flex flex-col gap-2 border-r border-grey_200 pr-6">
                        <div className="flex justify-between items-center gap-2">
                          <p className="text-grey_300 text-sm font-normal">{selectedYear-1}년 {selectedMonth}월</p>
                          <p className="text-right text-base text-grey_500 font-normal">{energyDatas && energyDatas[energyIndex].last_year_fee.toLocaleString('ko-KR')}원</p>
                        </div>
                        <p className="text-right text-grey_300 text-sm">{energyDatas && energyDatas[energyIndex].last_year_usage} {unit[energyIndex]}</p>
                      </div>
                      <div className="w-1/2 flex flex-col gap-2 pl-6">
                        <div className="flex justify-between items-center gap-2">
                          <p className="text-sm font-normal">{selectedYear}년 {selectedMonth}월</p>
                          <p className="text-right text-base text-main_color font-semibold">{energyDatas && energyDatas[energyIndex].present_fee.toLocaleString('ko-KR')}원</p>
                        </div>
                        <p className="text-right text-main_color text-sm">{energyDatas && energyDatas[energyIndex].present_usage} {unit[energyIndex]}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div>
                      <div className="flex justify-start py-4 border-b border-grey_200 font-semibold">
                        <p>우리아파트 평균대비</p>
                        <p className="text-main_color px-1">[{category}] </p>
                        <p>사용량/금액 비교</p>
                      </div>
                      {/* <span className="inline-flex p-2 gap-1 text-base font-medium">평균 대비</span> */}
                      <div className="inline-flex p-2 justify-start items-center gap-1 text-base font-medium">
                          <span>
                              평균 대비{" "}
                          </span>
                          <span className={`flex flex-nowrap gap-1 
                              ${(averageUsageState === "positive") 
                              ? "text-increase_color" 
                              : (averageUsageState === "negative" ? "text-decrease_color" : "text-grey_500")}`}>
                              {averageUsage}
                              <Image
                                    hidden={averageUsageState === "none"}
                                    src={(averageUsageState === "positive") 
                                        ? feeIncrease.src 
                                        : feeDecrease.src}
                                  alt="전월대비 아이콘"
                                  width={16}
                                  height={16}
                              />
                          </span>
                      </div>
                    </div>
                    <div className="w-[528px] h-[175px]">
                      <HalfDoughnutGraph datas={energyDatas && [energyDatas[energyIndex].average_usage_of_same_square, energyDatas[energyIndex].present_usage]}
                                          unit={unit[energyIndex]}/>
                    </div>
                    <div className="flex justify-between px-6 py-4  rounded-lg border border-grey_200 ">
                      <div className="w-1/2 flex flex-col gap-2 border-r border-grey_200 pr-6">
                        <div className="flex justify-between items-center gap-2">
                          <p className="text-grey_300 text-sm font-normal">아파트 평균 금액</p>
                          <p className="text-right text-base text-grey_500 font-normal">{energyDatas && energyDatas[energyIndex].average_fee_of_same_square.toLocaleString('ko-KR')}원</p>
                        </div>
                        <p className="text-right text-grey_300 text-sm">{energyDatas && energyDatas[energyIndex].average_usage_of_same_square.toLocaleString('ko-KR')} {unit[energyIndex]}</p>
                      </div>
                      <div className="w-1/2 flex flex-col gap-2 pl-6">
                        <div className="flex justify-between items-center gap-2">
                          <p className="text-sm font-normal">우리집 사용 금액</p>
                          <p className="text-right text-base text-main_color font-semibold">{energyDatas && energyDatas[energyIndex].present_fee.toLocaleString('ko-KR')}원</p>
                        </div>
                        <p className="text-right text-main_color text-sm">{energyDatas && energyDatas[energyIndex].present_usage} {unit[energyIndex]}</p>
                      </div>
                    </div>
                  </div>               
                </div>
              </div>
              
            </div>

            <div className="flex flex-col bg-white rounded-2xl border border-grey_200">
              <div className="border-b border-grey_200 px-10 py-6">
                {selectedMonth}월 고지서 상세 내역
              </div>
              <div className="border-b border-grey_100 px-10 py-6 flex justify-between text-grey_400 text-base font-medium">
                <p className="text-left pr-5">항목</p>
                <span className="flex justify-between gap-[180px]">
                  <p className="text-center px-5">당월</p>
                  <p className="text-center px-5">전월</p>
                  <p className="text-center px-5">증감</p>
                </span>
              </div>
              <div className="flex flex-col justify-start">
                {detailItems && detailItems.map((item, index) => (
                  <div key={index} className="px-10 py-6 flex justify-between">
                    <p className="w-[750px] text-left text-lg font-medium">{item.label}</p>
                    <span className="w-full flex gap-[130px]">
                      <p className="w-full text-right text-lg font-semibold">{item.value1 === undefined ? "-" : item.value1.toLocaleString('ko-KR')}원</p>
                      <p className="w-full text-right text-lg font-semibold">{item.value2 === undefined ? "-" : item.value2.toLocaleString('ko-KR')}원</p>
                      <p className={`w-full text-right text-lg font-semibold 
                                  ${item.value1 !== undefined && item.value2 !== undefined && (item.value1 - item.value2) > 0 ? "text-increase_color" 
                                  : item.value1 !== undefined && item.value2 !== undefined && (item.value1 - item.value2) < 0 ? "text-decrease_color" : "text-grey_500"}`}>
                        {item.value1 !== undefined && item.value2 !== undefined && 
                          ((item.value1 - item.value2) > 0)
                          ? `+${(item.value1 - item.value2).toLocaleString('ko-KR')}원`
                          : ((item.value1 - item.value2) < 0 
                            ? `${(item.value1 - item.value2).toLocaleString('ko-KR')}원`
                            : "-")}
                      </p>
                    </span>
                  </div>
                ))}
              </div>
              
            </div>

          </div>
        </div>
        
      </div>
      
    </>
  )
}