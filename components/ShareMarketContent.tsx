"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
import { clearCurrentPost } from "@/redux/slices/postSlice"
import ShareMarketItem from "./ShareMarketItem"
import DropDown from "./dropdown/DropDown"
import PrimaryButton from "./button/PrimaryButton"
import Pagination from "./pagination/pagination"

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
  id: number
  status: string
  isnew: boolean
  hits: string
  count_of_comments: string
  category: string
  category_name: string
  title: string
  content: string
  image_urls?: string[] | null
  price: string
  user_nickname: string
  created_at: string
  comment?: Comment[]
  hot: boolean
  new: boolean
}

type ResponseData = {
  posts: {
    content: Post[]
  }
  pagination_bar_number: number[]
}

export default function ShareMarketContent({
  responseData,
  category,
  keyword,
  catid,
  status,
  page
}: {
  responseData: ResponseData
  category: string
  keyword: string
  catid: number
  status: string
  page: number
}) {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [selectedCategory, setSelectedCategory] = useState(catid)
  const [selectedStatus, setSelectedStatus] = useState("")
  const [currentPage, setCurrentPage] = useState(page)

  const categoryData = [
    {
      id: "0",
      board_group: "FREES",
      name: "전체"
    },
    {
      id: "25",
      board_group: "MARKETS",
      code: "25",
      name: "무료나눔"
    },
    {
      id: "26",
      board_group: "MARKETS",
      code: "26",
      name: "중고거래"
    }
  ]

  const statusData = [
    {
      id: "ALL",
      name: "전체"
    },
    {
      id: "SOLD_OUT",
      name: "판매완료"
    },
    {
      id: "RESERVED",
      name: "예약중"
    },
    {
      id: "SALE",
      name: "판매중"
    }
  ]

  const categoryOptions = categoryData.map(category => ({
    value: category.id,
    name: category.name
  }))

  const statusOptions = statusData.map(status => ({
    value: status.id,
    name: status.name
  }))

  const handleCategoryChange = (changedData: number) => {
    setSelectedCategory(changedData)

    if (
      (keyword === undefined || keyword === "" || keyword.trim() === "") &&
      (status === undefined || status === "ALL" || status === "")
    ) {
      router.push(`/boards/${category}?catid=${changedData}&page=1`)
    } else if (
      (keyword === undefined || keyword === "" || keyword.trim() === "") &&
      status !== undefined &&
      status !== "ALL" &&
      status !== ""
    ) {
      router.push(
        `/boards/${category}?catid=${changedData}&status=${status}&page=1`
      )
    } else if (
      keyword !== undefined &&
      (status === undefined || status === "ALL" || status === "")
    ) {
      router.push(
        `/boards/${category}?catid=${changedData}&keyword=${keyword}&page=1`
      )
    } else {
      router.push(
        `/boards/${category}?catid=${changedData}&keyword=${keyword}&status=${status}&page=1`
      )
    }
  }

  const handleStatusChange = (changedData: string) => {
    setSelectedStatus(changedData)
    if (
      changedData === "undefined" ||
      changedData === undefined ||
      changedData === "ALL"
    ) {
      if (keyword === undefined) {
        router.push(`/boards/${category}?catid=${catid}&page=1`)
      } else {
        router.push(
          `/boards/${category}?catid=${catid}&keyword=${keyword}&page=1`
        )
      }
    } else {
      if (keyword === undefined) {
        router.push(
          `/boards/${category}?catid=${catid}&status=${changedData}&page=1`
        )
      } else {
        router.push(
          `/boards/${category}?catid=${catid}&keyword=${keyword}&status=${changedData}&page=1`
        )
      }
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
      router.push(`/boards/${category}?catid=${selectedCategory}&page=${page}`)
    } else if (
      (keyword === undefined || keyword === "" || keyword.trim() === "") &&
      selectedStatus !== undefined &&
      selectedStatus !== "ALL" &&
      selectedStatus !== ""
    ) {
      router.push(
        `/boards/${category}?catid=${selectedCategory}&status=${selectedStatus}&page=${page}`
      )
    } else if (
      keyword !== undefined &&
      (selectedStatus === undefined ||
        selectedStatus === "ALL" ||
        selectedStatus === "")
    ) {
      router.push(
        `/boards/${category}?catid=${selectedCategory}&keyword=${keyword}&page=${page}`
      )
    } else {
      router.push(
        `/boards/${category}?catid=${selectedCategory}&keyword=${keyword}&status=${selectedStatus}&page=${page}`
      )
    }
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
            initialValue={catid}
          />
          <DropDown
            label="거래상태"
            options={statusOptions}
            event={handleStatusChange}
            initialValue={status}
          />
        </div>
        <PrimaryButton
          label="글쓰기"
          onClick={handleGoEdit}
        />
      </div>
      <div className="m-10"></div>
      <div className="flex gap-x-6 gap-y-12 flex-wrap">
        {responseData &&
          responseData.posts.content.map(item => (
            <div
              key={item.id}
              className="flex-1 basis-2/5 max-w-[588px]">
              <Link href={`/boards/markets/${item.id}`}>
                <ShareMarketItem
                  status={item.status}
                  category_name={item.category_name}
                  image_urls={item.image_urls}
                  title={item.title}
                  price={item.price}
                  user_nickname={item.user_nickname}
                  hits={item.hits}
                  created_at={item.created_at}
                  ishot={item.hot}
                  isnew={item.new}
                />
              </Link>
            </div>
          ))}
      </div>
      <Pagination
        paginationData={responseData.pagination_bar_number}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
