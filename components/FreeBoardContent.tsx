"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import PrimaryButton from "./button/PrimaryButton"
import FreeBoardItem from "./FreeBoardItem"
import DropDown from "./dropdown/DropDown"

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
  isnew: boolean
  popular: boolean
  viewcount: string
  commentcount: string
  isimg: boolean
  category: string
  subcategory: string
  title: string
  content: string
  nickname: string
  usefull: boolean
  usefullcount: string
  notusefullcount: string
  date: string
  comment?: Comment[]
}

type ResponseData = Post[]

export default function FreeBoardContent({
  responseData
}: {
  responseData: ResponseData
}) {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("전체카테고리")

  const categoryOptions = [
    { value: "전체카테고리", name: "전체" },
    { value: "취미・운동", name: "취미・운동" },
    { value: "생활・편의", name: "생활・편의" },
    { value: "음식・카페", name: "음식・카페" },
    { value: "병원・약국", name: "병원・약국" },
    { value: "수리・시공", name: "수리・시공" },
    { value: "투자・부동산", name: "투자・부동산" },
    { value: "교육・육아", name: "교육・육아" },
    { value: "아파트・동네소식", name: "아파트・동네소식" },
    { value: "여행", name: "여행" },
    { value: "살림정보", name: "살림정보" },
    { value: "모임・동호회", name: "모임・동호회" },
    { value: "기타", name: "기타" }
  ]

  const handleCategoryChange = (changedData: string) => {
    setSelectedCategory(changedData)
  }

  const handleGoEdit = () => {
    router.push("/edit")
  }

  return (
    <div className="border-b border-grey_900">
      <div className="h-12 justify-between items-start flex gap-4 flex-wrap mt-8 mb-10">
        <DropDown
          label="분류"
          options={categoryOptions}
          event={handleCategoryChange}
        />
        <PrimaryButton
          label="글쓰기"
          onClick={handleGoEdit}
        />
      </div>

      <table className="w-full">
        <tbody>
          <tr className="text-center text-lg font-medium text-grey_700 border-b border-grey_900">
            <td className="p-4 w-40 ">분류</td>
            <td className="p-4">제목</td>
            <td className="p-4 w-40">글쓴이</td>
            <td className="p-2 w-20">공감수</td>
            <td className="p-2 w-20">조회수</td>
            <td className="p-4 w-32">등록일</td>
          </tr>
          {responseData.map(item => (
            <FreeBoardItem
              key={item.id}
              id={item.id}
              title={item.title}
              subcategory={item.subcategory}
              commentcount={item.commentcount}
              nickname={item.nickname}
              likecount={item.usefullcount}
              viewcount={item.viewcount}
              date={item.date}
              isimg={item.isimg}
              popular={item.popular}
              isnew={item.isnew}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
