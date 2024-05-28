"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import PrimaryButton from "./button/PrimaryButton"
import FreeBoardItem from "./FreeBoardItem"
import DropDown from "./dropdown/DropDown"

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
  isnew: boolean
  popular: boolean
  hits: number
  count_of_comments: string
  image_urls: any
  category_id: number
  title: string
  content: string
  nickname: string
  usefull: boolean
  reaction_columns: Reactions
  date: string
  comment?: Comment[]
}

type ResponseData = Post[]

export default function FreeBoardContent({
  responseData,
  category
}: {
  responseData: ResponseData
  category: string
}) {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("전체카테고리")

  const categoryData = [
    {
      id: "0",
      board_group: "FREES",
      name: "전체"
    },
    {
      id: "1",
      board_group: "FREES",
      code: "13",
      name: "생활/편의"
    },
    {
      id: "2",
      board_group: "FREES",
      code: "14",
      name: "음식/카페"
    },
    {
      id: "3",
      board_group: "FREES",
      code: "15",
      name: "병원/약국"
    },
    {
      id: "4",
      board_group: "FREES",
      code: "16",
      name: "수리/시공"
    },
    {
      id: "5",
      board_group: "FREES",
      code: "17",
      name: "투자/부동산"
    },
    {
      id: "6",
      board_group: "FREES",
      code: "18",
      name: "교육/육아"
    },
    {
      id: "7",
      board_group: "FREES",
      code: "19",
      name: "아파트/동네소식"
    },
    {
      id: "8",
      board_group: "FREES",
      code: "20",
      name: "여행"
    },
    {
      id: "9",
      board_group: "FREES",
      code: "21",
      name: "살림정보"
    },
    {
      id: "10",
      board_group: "FREES",
      code: "22",
      name: "모임/동호회"
    },
    {
      id: "11",
      board_group: "FREES",
      code: "23",
      name: "기타"
    }
  ]

  const categoryOptions = categoryData.map(category => ({
    value: category.id,
    name: category.name
  }))

  const handleCategoryChange = (changedData: string) => {
    setSelectedCategory(changedData)
    console.log(changedData)
    router.push(`/community/${category}?catid=${changedData}`)
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
          initialValue={categoryData[0].id}
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
          {responseData &&
            responseData.map(item => (
              <FreeBoardItem
                key={item.id}
                id={item.id}
                title={item.title}
                category_id={item.category_id}
                count_of_comments={item.count_of_comments}
                nickname={item.nickname}
                count_of_good={item.reaction_columns.count_reaction_type_good}
                hits={item.hits}
                date={item.date}
                image_urls={item.image_urls}
                popular={item.popular}
                isnew={item.isnew}
              />
            ))}
        </tbody>
      </table>
    </div>
  )
}
