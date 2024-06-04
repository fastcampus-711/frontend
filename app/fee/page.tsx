"use client"

import BoardSubMenuBar from "@/components/submenu/SubMenuBar"
import { useEffect, useState } from "react"

export default function Fee() {
  const [category, setCategory] = useState("전기")
  const categories = ["전기", "수도", "온수", "난방"]
  const detailItems = [
    {label: "일반 관리비", value1:80000, value2:70000},
    {label: "청소비", value1:70000, value2:60000},
    {label: "경비비", value1:50000, value2:30000},
    {label: "소독비", value1:20000, value2:30000},
    {label: "승강기유지비", value1:30000, value2:35000},
    {label: "장기수선충당금", value1:10000, value2:10000},
    {label: "대표회의운영비", value1:20000, value2:20000},
  ]

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; //왜 4월로 나오지...?

  const [year, setYear] = useState(currentYear)
  const [month, setMonth] = useState(currentMonth)
  const [startMonth, setStartMonth] = useState(1)
  const [endMonth, setEndMonth] = useState(12)

  //입주 년도 & 월
  const MoveInYear : number = 2015
  const MoveInMonth = 5

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
    <>
      
      <div className="flex flex-col gap-8 max-w-[1200px] m-auto pb-10">
        <div className="relative">
            <p className="text-grey_900 text-[32px] font-semibold">
                관리비조회
            </p>
        </div>
        <div className="w-[250px]">
            <BoardSubMenuBar option="fee" category="fee" />
        </div>
        <div className="max-w-[1200px] m-auto">
          <div className="w-[1200px] bg-grey_25 rounded-2xl border border-grey_200 px-5 py-10 flex flex-col gap-6">
            {/* <div className="inline-flex  rounded-tl-2xl rounded-tr-2xl"> */}
              <div className="inline-flex justify-start items-center gap-10 px-6">
                <p className="text-2xl font-semibold">{month}월 관리비 상세보기</p>
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
                {month}월 우리집 에너지 소비 현황
              </div>
              <div className="flex flex-col justify-start px-10 pb-6 gap-6">
                <div className="flex w-[592px] bg-white justify-between items-start">
                  <ul className="flex flex-wrap bg-grey_50 rounded-lg p-1 gap-2">
                    {categories.map((item, index) => (
                        <li className={`inline-block px-[50px] py-2 rounded-lg items-center gap-2.5 hover:cursor-pointer ${category == item ? "text-white bg-grey_600" : "text-grey_250 hover:bg-grey_200"}`}
                            onClick={() => {
                              setCategory(item)}}
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
                      <span className="inline-flex p-2 gap-1 text-base font-medium">전년동월 대비</span>
                    </div>
                    <div className="w-[528px] h-[175px]">
                      그래프
                    </div>
                    <div className="flex justify-between px-6 py-4  rounded-lg border border-grey_200 ">
                      <div className="w-1/2 flex flex-col gap-2 border-r border-grey_200 pr-6">
                        <div className="flex justify-between items-center gap-2">
                          <p className="text-grey_300 text-sm font-normal">{year-1}년 {month}월</p>
                          <p className="text-right text-base text-grey_500 font-normal">84,222원</p>
                        </div>
                        <p className="text-right text-grey_300 text-sm">123 kWh</p>
                      </div>
                      <div className="w-1/2 flex flex-col gap-2 pl-6">
                        <div className="flex justify-between items-center gap-2">
                          <p className="text-sm font-normal">{year}년 {month}월</p>
                          <p className="text-right text-base text-main_color font-semibold">84,222원</p>
                        </div>
                        <p className="text-right text-main_color text-sm">456 kWh</p>
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
                      <span className="inline-flex p-2 gap-1 text-base font-medium">평균 대비</span>
                    </div>
                    <div className="w-[528px] h-[175px]">
                      그래프
                    </div>
                    <div className="flex justify-between px-6 py-4  rounded-lg border border-grey_200 ">
                      <div className="w-1/2 flex flex-col gap-2 border-r border-grey_200 pr-6">
                        <div className="flex justify-between items-center gap-2">
                          <p className="text-grey_300 text-sm font-normal">아파트 평균 금액</p>
                          <p className="text-right text-base text-grey_500 font-normal">80,222원</p>
                        </div>
                        <p className="text-right text-grey_300 text-sm">123 kWh</p>
                      </div>
                      <div className="w-1/2 flex flex-col gap-2 pl-6">
                        <div className="flex justify-between items-center gap-2">
                          <p className="text-sm font-normal">우리집 사용 금액</p>
                          <p className="text-right text-base text-main_color font-semibold">80,222원</p>
                        </div>
                        <p className="text-right text-main_color text-sm">456 kWh</p>
                      </div>
                    </div>
                  </div>               
                </div>
              </div>
              
            </div>

            <div className="flex flex-col bg-white rounded-2xl border border-grey_200">
              <div className="border-b border-grey_200 px-10 py-6">
                {month}월 고지서 상세 내역
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
                {detailItems.map((item, index) => (
                  <div key={index} className="px-10 py-6 flex justify-between">
                    <p className="w-[750px] text-left text-lg font-medium">{item.label}</p>
                    <span className="w-full flex gap-[130px]">
                      <p className="w-full text-right text-lg font-semibold">{item.value1.toLocaleString('ko-KR')}원</p>
                      <p className="w-full text-right text-lg font-semibold">{item.value2.toLocaleString('ko-KR')}원</p>
                      <p className={`w-full text-right text-lg font-semibold 
                                  ${(item.value1 - item.value2) > 0 ? "text-red_increase" 
                                  : (item.value1 - item.value2) === 0 ? "text-grey_500" : "text-blue_decrease"}`}>
                        {(item.value1 - item.value2) > 0 ? "+" : ""}{(item.value1 - item.value2) === 0 ? "-" : (item.value1 - item.value2).toLocaleString('ko-KR')}원
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
