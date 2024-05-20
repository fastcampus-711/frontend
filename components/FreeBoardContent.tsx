"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import PrimaryButton from "./button/PrimaryButton"
import FreeBoardItem from "./FreeBoardItem"

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
  const [selectedCategory, setSelectedCategory] = useState("전체")

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value)
  }

  const handleGoEdit = () => {
    router.push("/edit")
  }

  console.log(responseData)

  // const filteredData = responseData.filter(item => {
  //   let categoryMatch = false
  //   if (
  //     selectedCategory === "전체" ||
  //     (selectedCategory === "교육・육아" &&
  //       item.subcategory === "교육・육아") ||
  //     (selectedCategory === "취미・운동" &&
  //       item.subcategory === "취미・운동") ||
  //     (selectedCategory === "생활・편의" &&
  //       item.subcategory === "생활・편의") ||
  //     (selectedCategory === "음식・카페" &&
  //       item.subcategory === "음식・카페") ||
  //     (selectedCategory === "병원・약국" &&
  //       item.subcategory === "병원・약국") ||
  //     (selectedCategory === "수리・시공" &&
  //       item.subcategory === "수리・시공") ||
  //     (selectedCategory === "투자・부동산" &&
  //       item.subcategory === "투자・부동산") ||
  //     (selectedCategory === "아파트・동네소식" &&
  //       item.subcategory === "아파트・동네소식") ||
  //     (selectedCategory === "여행" && item.subcategory === "여행") ||
  //     (selectedCategory === "살림정보" && item.subcategory === "살림정보") ||
  //     (selectedCategory === "모임・동호회" &&
  //       item.subcategory === "모임・동호회") ||
  //     (selectedCategory === "기타" && item.subcategory === "기타")
  //   ) {
  //     categoryMatch = true
  //   }
  //   return categoryMatch
  // })

  return (
    <div className="border-b border-grey_900">
      <select
        name="category"
        defaultValue={"전체"}
        onChange={handleCategoryChange}>
        <option value="전체">전체</option>
        <option value="교육・육아">교육・육아</option>
        <option value="취미・운동">취미・운동</option>
        <option value="생활・편의">생활・편의</option>
        <option value="음식・카페">음식・카페</option>
        <option value="병원・약국">병원・약국</option>
        <option value="수리・시공">수리・시공</option>
        <option value="투자・부동산">투자・부동산</option>
        <option value="아파트・동네소식">아파트・동네소식</option>
        <option value="여행">여행</option>
        <option value="살림정보">살림정보</option>
        <option value="모임・동호회">모임・동호회</option>
        <option value="기타">기타</option>
      </select>
      <PrimaryButton
        label="글쓰기"
        onClick={handleGoEdit}
      />
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
