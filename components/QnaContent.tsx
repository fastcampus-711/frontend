"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
import { clearCurrentPost } from "@/redux/slices/postSlice"
import PrimaryButton from "./button/PrimaryButton"
import DropDown from "./dropdown/DropDown"
import QnaItem from "./Qnaitem"
import Pagination from "./pagination/pagination"

type Comment = {
  nickname: string
  date: string
  id: string
  content: string
  ischoice: boolean
}

type Post = {
  id: number
  user_image: string
  isanswer: string
  isnew: boolean
  title: string
  image_urls?: string[] | null
  content: string
  created_at: string
  user_nickname: string
  count_of_comments: string
  category_name: string
  item: Post
}

type ResponseData = {
  posts: {
    content: Post[]
  }
  pagination_bar_number: number[]
}

export default function QnaContent({
  responseData,
  category,
  keyword,
  catid,
  page
}: {
  responseData: ResponseData
  category: string
  keyword: string
  catid: number
  page: number
}) {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [selectedCategory, setSelectedCategory] = useState(catid)
  const [currentPage, setCurrentPage] = useState(1)

  const categoryOptions = [
    { value: "전체상태", name: "전체" },
    { value: "답변대기", name: "답변대기" },
    { value: "답변완료", name: "답변완료" },
    { value: "답변채택", name: "답변채택" }
  ]

  const handleCategoryChange = (changedData: number) => {
    setSelectedCategory(changedData)
    router.push(
      `/boards/${category}?catid=${changedData}&keyword=${keyword}&page=1`
    )
  }

  const handleGoEdit = () => {
    dispatch(clearCurrentPost())
    router.push("/edit")
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    router.push(
      `/boards/${category}?catid=${selectedCategory}&keyword=${keyword}&page=${page}`
    )
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
      {responseData &&
        responseData.posts.content.map(item => (
          <QnaItem
            key={item.id}
            id={item.id}
            user_nickname={item.user_nickname}
            user_image={item.user_image}
            image_urls={item.image_urls}
            title={item.title}
            content={item.content}
            isanswer={item.isanswer}
            isnew={item.isnew}
            created_at={item.created_at}
            count_of_comments={item.count_of_comments}
            item={item}
          />
        ))}
      <Pagination
        paginationData={responseData.pagination_bar_number}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
