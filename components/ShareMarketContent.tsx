"use client"

import { useState } from "react"

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
      (selectedCategory === "share" && item.subcategory === "share") ||
      (selectedCategory === "used" && item.subcategory === "used")
    ) {
      categoryMatch = true
    }

    let statusMatch = false
    if (
      selectedStatus === "allstatus" ||
      (selectedStatus === "sold" && item.issaled === "sold") ||
      (selectedStatus === "reserved" && item.issaled === "reserved") ||
      (selectedStatus === "onsale" && item.issaled === "onsale")
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
        <option value="share">중고거래</option>
        <option value="used">무료나눔</option>
      </select>
      <select
        name="status"
        defaultValue={"allstatus"}
        onChange={handleStatusChange}>
        <option value="allstatus">전체</option>
        <option value="sold">판매완료</option>
        <option value="reserved">예약중</option>
        <option value="onsale">판매중</option>
      </select>
      {filteredData.map(item => (
        <div
          key={item.id}
          className="mb-4">
          <p>{item.category}</p>
          <p>{item.subcategory}</p>
          <p>{item.title}</p>
          <p>{item.content}</p>
          <p>{item.price}</p>
          <p>{item.uickname}</p>
          <p>{item.date}</p>
        </div>
      ))}
    </div>
  )
}
