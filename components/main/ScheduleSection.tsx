"use client"

import Link from "next/link"
import { useState } from "react"
import PopularTag from "../tag/PopularTag"
import Image from "next/image"
import imgIcon from "@/public/icon/img.svg"
import NewTag from "../tag/NewTag"
import Tab from "../tab/Tab"

type PostData = {
  id: number
  category_name: string
  title: string
  image_urls: string[] | null
  count_of_comments: number
  hot: boolean
  new: boolean
}

export default function ScheduleSection({
  freesData,
  marketsData,
  qnaData
}: {
  freesData: PostData[]
  marketsData: PostData[]
  qnaData: PostData[]
}) {
  const [activeTab, setActiveTab] = useState("frees")
  const [activeData, setActiveData] = useState(0)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setActiveData(tab === "today" ? 0 : 1)
  }

  const getFormattedDate = (daysToAdd: number) => {
    const date = new Date()
    date.setDate(date.getDate() + daysToAdd)
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${month}월 ${day}일`
  }

  const exampleData = [
    {
      data1: "주차장 청소", 
      data2: "아파트 단지 놀이터 공사", 
      data3: "맨홀 공사 및 점검일"
    },
    {
      data1: "383동 엘리베이터 점검일", 
      data2: "383동 선거관리 위원회 회의",
      data3: ""
    }
  ];

  const tabsData = [
    { key: "today", label: getFormattedDate(0), type: "today" },
    { key: "tomorrow", label: getFormattedDate(1), type: "tomorrow" }
  ]

  return (
    <div className="w-2/5 h-[350px]">
      <Link href={"#"}>
        <div className="h-14 flex justify-between items-center px-4 mb-6 border-b bg-grey_50 rounded-lg">
          <div className="flex gap-4 items-center">
            <span className="text-grey_900 text-2xl font-semibold leading-6">
              일정표
            </span>
          </div>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 8L20 16L12 24"
              stroke="#656565"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Link>
      <Tab
        tabData={tabsData}
        activeTab={activeTab}
        width={"full"}
        handleTabChange={handleTabChange}
      />
      <div>
        {Object.values(exampleData[activeData]).map((item, index) => (
          <div key={`${item}_${index}`} className={"px-2 py-4 border-t border-grey_200"}>
            <p className="flex-1 text-grey_900 text-lg font-medium leading-[30px] truncate">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
