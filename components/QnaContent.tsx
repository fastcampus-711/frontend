"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import PrimaryButton from "./button/PrimaryButton"
import DropDown from "./dropdown/DropDown"
import QnaItem from "./Qnaitem"

type Comment = {
  nickname: string
  date: string
  id: string
  content: string
  ischoice: boolean
}

type Post = {
  id: string
  isanswer: string
  isnew: boolean
  title: string
  content: string
  nickname: string
  date: string
  count_of_comments: string
  comment?: Comment[]
}

type ResponseData = Post[]

export default function QnaContent({
  responseData,
  category
}: {
  responseData: ResponseData
  category: string
}) {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("전체카테고리")

  const categoryOptions = [
    { value: "전체상태", name: "전체" },
    { value: "답변대기", name: "답변대기" },
    { value: "답변완료", name: "답변완료" },
    { value: "답변채택", name: "답변채택" }
  ]

  const handleCategoryChange = (changedData: string) => {
    setSelectedCategory(changedData)
  }

  const handleGoEdit = () => {
    router.push("/edit")
  }

  return (
    <div>
      <div className="h-12 justify-between items-start flex gap-4 flex-wrap mt-8 mb-10">
        <DropDown
          label="답변상태"
          options={categoryOptions}
          event={handleCategoryChange}
        />
        <PrimaryButton
          label="글쓰기"
          onClick={handleGoEdit}
        />
      </div>
      {responseData.map(item => (
        <QnaItem
          key={item.id}
          id={item.id}
          isanswer={item.isanswer}
          isnew={item.isnew}
          title={item.title}
          content={item.content}
          nickname={item.nickname}
          date={item.date}
          count_of_comments={item.count_of_comments}
          comment={item.comment}
        />
      ))}
    </div>
  )
}
