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
import warningImg from "@/public/img/warning.png"
import Image from "next/image"

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
  status: string
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
  const [selectedStatus, setSelectedStatus] = useState("")
  const [currentPage, setCurrentPage] = useState(page)

  const statusOptions = [
    { value: "ALL", name: "전체" },
    { value: "AWAITING_RESPONSE", name: "답변대기" },
    { value: "RESPONSE_ACCEPTED", name: "답변채택" }
  ]

  const handleStatusChange = (changedData: string) => {
    setSelectedStatus(changedData)
    if (
      (keyword === undefined || keyword === "" || keyword.trim() === "") &&
      (changedData === undefined || changedData === "ALL" || changedData === "")
    ) {
      router.push(`/boards/${category}?catid=0&page=1`)
    } else if (
      (keyword === undefined || keyword === "" || keyword.trim() === "") &&
      changedData !== undefined &&
      changedData !== "ALL" &&
      changedData !== ""
    ) {
      router.push(`/boards/${category}?catid=0&status=${changedData}&page=1`)
    } else if (
      keyword !== undefined &&
      (changedData === undefined || changedData === "ALL" || changedData === "")
    ) {
      router.push(`/boards/${category}?catid=0&keyword=${keyword}&page=1`)
    } else {
      router.push(
        `/boards/${category}?catid=0&keyword=${keyword}&status=${changedData}&page=1`
      )
    }
  }

  const handleGoEdit = () => {
    dispatch(clearCurrentPost())
    router.push("/edit")
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    if (
      (keyword === undefined || keyword === "" || keyword.trim() === "") &&
      (selectedStatus === undefined ||
        selectedStatus === "ALL" ||
        selectedStatus === "")
    ) {
      router.push(`/boards/${category}?catid=0&page=${page}`)
    } else if (
      (keyword === undefined || keyword === "" || keyword.trim() === "") &&
      selectedStatus !== undefined &&
      selectedStatus !== "ALL" &&
      selectedStatus !== ""
    ) {
      router.push(
        `/boards/${category}?catid=0&status=${selectedStatus}&page=${page}`
      )
    } else if (
      keyword !== undefined &&
      (selectedStatus === undefined ||
        selectedStatus === "ALL" ||
        selectedStatus === "")
    ) {
      router.push(`/boards/${category}?catid=0&keyword=${keyword}&page=${page}`)
    } else {
      router.push(
        `/boards/${category}?catid=0&keyword=${keyword}&status=${selectedStatus}&page=${page}`
      )
    }
  }

  const highlightKeyword = (title: string, keyword: string) => {
    if (!keyword) return title
    const parts = title.split(new RegExp(`(${keyword})`, "gi"))
    return (
      <>
        {parts.map((part, index) => (
          <span
            key={index}
            style={
              part.toLowerCase() === keyword.toLowerCase()
                ? { color: "red" }
                : {}
            }>
            {part}
          </span>
        ))}
      </>
    )
  }

  return (
    <div>
      {responseData.posts.content.length > 0 ? (
        <div>
          <div className="h-12 justify-between items-start flex gap-4 flex-wrap mt-8 mb-10">
            <DropDown
              label="답변상태"
              options={statusOptions}
              event={handleStatusChange}
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
                title={highlightKeyword(item.title, keyword)}
                content={item.content}
                status={item.status}
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
      ) : (
        <div>
          {keyword ? (
            <div className="flex flex-col items-center text-lg font-medium text-grey_700 py-12 mt-8 mb-10">
              <Image
                src={warningImg.src}
                alt="경고이미지"
                width={128}
                height={128}
                className="mb-8"
              />
              <div>
                <span className="text-main_color">'{keyword}' </span>
                <span>에 대한 검색 결과가 </span>
                <span className="text-main_color">0건 </span>
                <span>입니다.</span>
              </div>
              <div className="text-grey_250">검색된 게시글이 없습니다.</div>
            </div>
          ) : (
            <div className="text-center text-lg font-medium text-grey_700 mt-8 mb-10">
              등록된 게시글이 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
