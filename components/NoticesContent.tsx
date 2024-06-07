"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
import { clearCurrentPost } from "@/redux/slices/postSlice"
import PrimaryButton from "./button/PrimaryButton"
import NoticesItem from "./NoticesItem"
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

export default function NoticesContent({
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
  const [currentPage, setCurrentPage] = useState(page)

  const categoryData = [
    {
      id: "0",
      board_group: "FREES",
      name: "전체"
    },
    {
      id: "1",
      board_group: "NOTICES",
      code: "1",
      name: "공동생활"
    },
    {
      id: "2",
      board_group: "NOTICES",
      code: "2",
      name: "공사안내"
    },
    {
      id: "3",
      board_group: "NOTICES",
      code: "3",
      name: "선거관리위원회"
    },
    {
      id: "4",
      board_group: "NOTICES",
      code: "4",
      name: "입주자대표회의"
    },
    {
      id: "5",
      board_group: "NOTICES",
      code: "5",
      name: "관리비"
    },
    {
      id: "6",
      board_group: "NOTICES",
      code: "6",
      name: "계약서"
    },
    {
      id: "7",
      board_group: "NOTICES",
      code: "7",
      name: "관리규약"
    },
    {
      id: "8",
      board_group: "NOTICES",
      code: "8",
      name: "장기수선충당금"
    },
    {
      id: "9",
      board_group: "NOTICES",
      code: "9",
      name: "안전관리계획"
    },
    {
      id: "10",
      board_group: "NOTICES",
      code: "10",
      name: "입찰정보"
    },
    {
      id: "11",
      board_group: "NOTICES",
      code: "11",
      name: "기타"
    }
  ]

  const categoryOptions = categoryData.map(category => ({
    value: category.id,
    name: category.name
  }))

  const handleCategoryChange = (changedData: number) => {
    setSelectedCategory(changedData)
    if (keyword === "undefiend" || keyword === undefined) {
      router.push(`/boards/${category}?catid=${changedData}&page=1`)
    } else {
      router.push(
        `/boards/${category}?catid=${changedData}&keyword=${keyword}&page=1`
      )
    }
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
                <NoticesItem
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
