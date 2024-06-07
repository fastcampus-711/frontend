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

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const getFormattedDate = (daysToAdd: number) => {
    const date = new Date()
    date.setDate(date.getDate() + daysToAdd)
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${month}월 ${day}일`
  }

  const tabsData = [
    { key: "frees", label: getFormattedDate(0), type: "frees" },
    { key: "markets", label: getFormattedDate(1), type: "markets" }
  ]

  return (
    <div className="w-2/5">
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
        handleTabChange={handleTabChange}
      />
      <div>
        <div className="px-2 py-4 border-b border-grey_200">
          <p className="flex-1 text-grey_900 text-lg font-medium leading-[30px] truncate">
            고3인데, 동네에 조용하게 공부할만한 스터디카페 추천해주세요
          </p>
        </div>
        <div className="px-2 py-4 border-b border-grey_200">
          <p className="flex-1 text-grey_900 text-lg font-medium leading-[30px] truncate">
            작은 도서관 진행해서 아이들 데리고 가봤습니다~^^
          </p>
        </div>
        <div className="px-2 py-4 border-b border-grey_200">
          <p className="flex-1 text-grey_900 text-lg font-medium leading-[30px] truncate">
            지하주차장 누수로 깜짝 놀랐네요.
          </p>
        </div>
      </div>
    </div>
  )
}
