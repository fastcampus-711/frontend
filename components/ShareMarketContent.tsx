"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import ShareMarketItem from "./ShareMarketItem"
import DropDown from "./dropdown/DropDown"
import PrimaryButton from "./button/PrimaryButton"

type Comment = {
  nickname: string
  date: string
  id: string
  content: string
  like: boolean
  likecount: string
  child_comment?: Comment[]
}

type Post = {
  id: string
  issaled: string
  isnew: boolean
  hits: string
  count_of_comments: string
  category: string
  subcategory: string
  title: string
  content: string
  price: string
  nickname: string
  date: string
  comment?: Comment[]
}

type ResponseData = Post[]

export default function ShareMarketContent({
  responseData
}: {
  responseData: ResponseData
}) {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("전체카테고리")
  const [selectedStatus, setSelectedStatus] = useState("전체상태")

  const categoryOptions = [
    { value: "전체카테고리", name: "전체" },
    { value: "중고거래", name: "중고거래" },
    { value: "무료나눔", name: "무료나눔" }
  ]

  const statusOptions = [
    { value: "전체상태", name: "전체" },
    { value: "판매중", name: "판매중" },
    { value: "예약중", name: "예약중" },
    { value: "판매완료", name: "판매완료" }
  ]

  const handleCategoryChange = (changedData: string) => {
    setSelectedCategory(changedData)
  }

  const handleStatusChange = (changedData: string) => {
    setSelectedStatus(changedData)
  }

  const handleGoEdit = () => {
    router.push("/edit")
  }

  return (
    <div>
      <div className="m-8"></div>
      <div className="flex justify-between">
        <div className="w-[500px] h-12 justify-start items-start flex gap-4 flex-wrap">
          <DropDown
            label="거래방식"
            options={categoryOptions}
            event={handleCategoryChange}
          />
          <DropDown
            label="거래상태"
            options={statusOptions}
            event={handleStatusChange}
          />
        </div>

        <PrimaryButton
          label="글쓰기"
          onClick={handleGoEdit}
        />
      </div>
      <div className="m-10"></div>
      <div className="flex gap-6 flex-wrap">
        {responseData && responseData.map(item => (
          <div
            key={item.id}
            className=" flex-1">
            <Link href={`/community/markets/${item.id}`}>
              <ShareMarketItem
                issaled={item.issaled}
                isnew={item.isnew}
                subcategory={item.subcategory}
                title={item.title}
                price={item.price}
                nickname={item.nickname}
                hits={item.hits}
                date={item.date}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
