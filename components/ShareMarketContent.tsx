"use client"

import Link from "next/link"
import { useState } from "react"
import ShareMarketItem from "./ShareMarketItem"

type ResponseData = {
  id: string
  category: string
  subcategory: string
  issaled: string
  title: string
  content: string
  price: string
  uickname: string
  date: string
}[]

export default function ShareMarketContent({
  responseData
}: {
  responseData: ResponseData
}) {
  const [selectedCategory, setSelectedCategory] = useState("allcategory")
  const [selectedStatus, setSelectedStatus] = useState("allstatus")

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value)
    console.log(responseData)
  }

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value)
    console.log(responseData)
  }

  const filteredData = responseData.filter(item => {
    let categoryMatch = false
    if (
      selectedCategory === "allcategory" ||
      (selectedCategory === "중고거래" && item.subcategory === "중고거래") ||
      (selectedCategory === "무료나눔" && item.subcategory === "무료나눔")
    ) {
      categoryMatch = true
    }

    let statusMatch = false
    if (
      selectedStatus === "allstatus" ||
      (selectedStatus === "판매완료" && item.issaled === "판매완료") ||
      (selectedStatus === "예약중" && item.issaled === "예약중") ||
      (selectedStatus === "판매중" && item.issaled === "판매중")
    ) {
      statusMatch = true
    }

    return categoryMatch && statusMatch
  })

  return (
    <div>
      <p>나눔장터</p>
      <select
        name="category"
        defaultValue={"allcategory"}
        onChange={handleCategoryChange}>
        <option value="allcategory">전체</option>
        <option value="중고거래">중고거래</option>
        <option value="무료나눔">무료나눔</option>
      </select>
      <select
        name="status"
        defaultValue={"allstatus"}
        onChange={handleStatusChange}>
        <option value="allstatus">전체</option>
        <option value="판매완료">판매완료</option>
        <option value="예약중">예약중</option>
        <option value="판매중">판매중</option>
      </select>
      <div className="flex gap-6 flex-wrap">
        {filteredData.map(item => (
          <div className=" flex-1">
            <Link
              href={`/community/sharemarket/${item.id}`}
              key={item.id}>
              <ShareMarketItem
                issaled={item.issaled}
                isnew={item.isnew}
                subcategory={item.subcategory}
                title={item.title}
                price={item.price}
                nickname={item.nickname}
                viewcount={item.viewcount}
                date={item.date}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
