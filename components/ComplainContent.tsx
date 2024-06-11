"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
import { clearCurrentPost } from "@/redux/slices/postSlice"
import PrimaryButton from "./button/PrimaryButton"
import ComplainItem from "./ComplainItem"
import DropDown from "./dropdown/DropDown"
import Pagination from "./pagination/pagination"
import warningImg from "@/public/img/warning.png"
import Image from "next/image"
import startComplainImg from "@/public/img/start_complain.png"
import processComplainImg from "@/public/img/process_complain.png"
import completeComplainImg from "@/public/img/complete_complain.png"
import Link from "next/link"

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
  status: string
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

export default function ComplainsContent({
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
  console.log(keyword)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [selectedCategory, setSelectedCategory] = useState(catid)
  const [selectedStatus, setSelectedStatus] = useState("")
  const [currentPage, setCurrentPage] = useState(page)

  const categoryData = [
    {
      id: "0",
      board_group: "COMPLAINT",
      name: "전체"
    },
    {
      id: "1",
      board_group: "COMPLAINT",
      code: "01",
      name: "접수"
    },
    {
      id: "2",
      board_group: "COMPLAINT",
      code: "2",
      name: "처리중"
    },
    {
      id: "3",
      board_group: "COMPLAINT",
      code: "3",
      name: "처리완료"
    }
  ]
  const statusData = [
    {
      id: "0",
      board_group: "COMPLAINT",
      name: "전체"
    },
    {
      id: "27",
      board_group: "COMPLAINT",
      name: "엘리베이터"
    },
    {
      id: "28",
      board_group: "COMPLAINT",
      name: "공동생활"
    },
    {
      id: "29",
      board_group: "COMPLAINT",
      name: "공동현관/복도"
    },
    {
      id: "30",
      board_group: "COMPLAINT",
      name: "주차장"
    },
    {
      id: "31",
      board_group: "COMPLAINT",
      name: "보안경비"
    },
    {
      id: "32",
      board_group: "COMPLAINT",
      name: "조명"
    },
    {
      id: "33",
      board_group: "COMPLAINT",
      name: "조경"
    },
    {
      id: "34",
      board_group: "COMPLAINT",
      name: "커뮤니티시설"
    },
    {
      id: "35",
      board_group: "COMPLAINT",
      name: "시공사하자"
    },
    {
      id: "36",
      board_group: "COMPLAINT",
      name: "도로/인도"
    },
    {
      id: "37",
      board_group: "COMPLAINT",
      name: "기타"
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
    if (keyword === "undefined" || keyword === undefined) {
      router.push(`/boards/${category}?catid=${selectedCategory}&page=${page}`)
    } else {
      router.push(
        `/boards/${category}?catid=${selectedCategory}&keyword=${keyword}&page=${page}`
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

  const recentComplain = responseData.posts.content[0]

  const convertDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")
    return `${year}.${month}.${day}`
  }

  const convertedDate = convertDate(recentComplain.created_at)

  return (
    <div>
      {responseData.posts.content.length > 0 ? (
        <div>
          <div className="h-12 justify-between items-start flex gap-4 flex-wrap mt-8 mb-10">
            <div className="w-[500px] h-12 justify-start items-start flex gap-4 flex-wrap">
              <DropDown
                label="접수상태"
                options={categoryOptions}
                event={handleCategoryChange}
                initialValue={catid}
              />
              <DropDown
                label="민원유형"
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
          {category === "my" && (
            <div className=" border border-grey_200 rounded-2xl mb-10">
              <div className="flex w-full justify-between items-center px-10 py-4">
                <div className="flex gap-4 items-center">
                  <span className="text-grey_900 text-lg font-medium">
                    {recentComplain.user_nickname} 님의 최신 민원
                  </span>
                  <span className="text-grey_300">{convertedDate} 접수</span>
                </div>
                <Link
                  href={`/complains/${recentComplain.id}`}
                  className="text-grey_300 underline">
                  전체보기
                </Link>
              </div>
              <div className="flex flex-col justify-center items-center gap-3 py-6 text-sm font-medium">
                <span className="inlini-block px-2 rounded bg-grey_400 text-white">
                  {recentComplain.category_name}
                </span>
                <p className="text-grey_800 text-xl font-medium">
                  {recentComplain.title}
                </p>
              </div>
              {recentComplain.status === "RECEIVED" && (
                <Image
                  src={startComplainImg.src}
                  alt="접수"
                  width={1200}
                  height={203}
                />
              )}
              {/* recentComplain 값이 "b"인 경우 */}
              {recentComplain.status === "b" && (
                <Image
                  src={processComplainImg.src}
                  alt="진행"
                  width={1200}
                  height={203}
                />
              )}
              {/* recentComplain 값이 "c"인 경우 */}
              {recentComplain.status === "c" && (
                <Image
                  src={completeComplainImg.src}
                  alt="완료"
                  width={1200}
                  height={203}
                />
              )}
            </div>
          )}

          <table className="w-full">
            <tbody>
              <tr className="text-center text-lg font-medium text-grey_700 border-b border-grey_900">
                <td className="p-4 w-40">접수상태</td>
                <td className="p-4 w-40">민원유형</td>
                <td className="p-4">제목</td>
                <td className="p-4 w-40">글쓴이</td>
                <td className="p-2 w-20">공감수</td>
                <td className="p-2 w-20">조회수</td>
                <td className="p-4 w-32">등록일</td>
              </tr>
              {responseData.posts.content.map(item => (
                <ComplainItem
                  key={item.id}
                  id={item.id}
                  user_nickname={item.user_nickname}
                  status={item.status}
                  category_name={item.category_name}
                  title={highlightKeyword(item.title, keyword)}
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
                <span className="text-main_color">&#39;{keyword}&#39; </span>
                <span>에 대한 검색 결과가 </span>
                <span className="text-main_color">0건 </span>
                <span>입니다.</span>
              </div>
              <div className="text-grey_250">검색된 게시글이 없습니다.</div>
            </div>
          ) : (
            <div>
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
                  <tr className="text-center text-lg font-medium text-grey_700 mt-8 mb-10">
                    <td colSpan={6}>등록된 게시글이 없습니다.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
