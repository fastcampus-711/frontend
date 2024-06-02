"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
import { clearCurrentPost } from "@/redux/slices/postSlice"
import PrimaryButton from "./button/PrimaryButton"
import FreeBoardItem from "./FreeBoardItem"
import DropDown from "./dropdown/DropDown"
import Pagination from "./pagination/pagination"

type Reactions = {
  count_reaction_type_good: number
  count_reaction_type_bad: number
}

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
  user_id: number
  user_nickname: string
  category_name: string
  title: string
  content: string
  image_urls?: string[] | null
  visible: boolean
  reaction_columns: Reactions | null
  count_of_comments: string
  hits: number
  comment?: Comment[]
  created_at: string
  category_id: number
  reaction_type: boolean | null
  hot: boolean
  new: boolean
}

type ResponseData = {
  posts: {
    content: Post[]
  }
  pagination_bar_number: number[]
}

export default function FreeBoardContent({
  responseData,
  category,
  catid,
  page
}: {
  responseData: ResponseData
  category: string
  catid: number
  page: number
}) {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [selectedCategory, setSelectedCategory] = useState(catid)
  const [currentPage, setCurrentPage] = useState(page)

  const categoryData = [
    {
      id: "0",
      board_group: "FREES",
      name: "전체"
    },
    {
      id: "12",
      board_group: "FREES",
      code: "13",
      name: "생활/편의"
    },
    {
      id: "13",
      board_group: "FREES",
      code: "14",
      name: "음식/카페"
    },
    {
      id: "14",
      board_group: "FREES",
      code: "15",
      name: "병원/약국"
    },
    {
      id: "15",
      board_group: "FREES",
      code: "16",
      name: "수리/시공"
    },
    {
      id: "16",
      board_group: "FREES",
      code: "17",
      name: "투자/부동산"
    },
    {
      id: "17",
      board_group: "FREES",
      code: "18",
      name: "교육/육아"
    },
    {
      id: "18",
      board_group: "FREES",
      code: "19",
      name: "아파트/동네소식"
    },
    {
      id: "19",
      board_group: "FREES",
      code: "20",
      name: "여행"
    },
    {
      id: "20",
      board_group: "FREES",
      code: "21",
      name: "살림정보"
    },
    {
      id: "21",
      board_group: "FREES",
      code: "22",
      name: "모임/동호회"
    },
    {
      id: "22",
      board_group: "FREES",
      code: "23",
      name: "기타"
    }
  ]

  const categoryOptions = categoryData.map(category => ({
    value: category.id,
    name: category.name
  }))

  const handleCategoryChange = (changedData: number) => {
    setSelectedCategory(changedData)
    router.push(`/community/${category}?catid=${changedData}&page=1`)
  }

  const handleGoEdit = () => {
    dispatch(clearCurrentPost())
    router.push("/edit")
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    router.push(`/community/${category}?catid=${selectedCategory}&page=${page}`)
  }

  return (
    <div>
      <div className="border-b border-grey_900">
        <div className="h-12 justify-between items-start flex gap-4 flex-wrap mt-8 mb-10">
          <DropDown
            label="분류"
            options={categoryOptions}
            event={handleCategoryChange}
            initialValue={catid}
          />
          <PrimaryButton
            label="글쓰기"
            onClick={handleGoEdit}
          />
        </div>
        <table className="w-full">
          <tbody>
            <tr className="text-center text-lg font-medium text-grey_700 border-b border-grey_900">
              <td className="p-4 w-40">분류</td>
              <td className="p-4">제목</td>
              <td className="p-4 w-40">글쓴이</td>
              <td className="p-2 w-20">공감수</td>
              <td className="p-2 w-20">조회수</td>
              <td className="p-4 w-32">등록일</td>
            </tr>
            {responseData &&
              responseData.posts.content.map(item => (
                <FreeBoardItem
                  key={item.id}
                  id={item.id}
                  user_nickname={item.user_nickname}
                  category_name={item.category_name}
                  title={item.title}
                  image_urls={item.image_urls}
                  visible={item.visible}
                  count_reaction_type_good={
                    item.reaction_columns
                      ? item.reaction_columns.count_reaction_type_good
                      : 0
                  }
                  count_of_comments={item.count_of_comments}
                  hits={item.hits}
                  created_at={item.created_at}
                  ishot={item.hot}
                  isnew={item.new}
                />
              ))}
          </tbody>
        </table>
      </div>
      <Pagination
        paginationData={responseData.pagination_bar_number}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
