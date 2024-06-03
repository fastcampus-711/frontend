"use client"

import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { setCurrentPost } from "@/redux/slices/postSlice"
import UseFullButton from "./button/UseFullButton"
import NotUseFullButton from "./button/NotUseFullButton"
import Comment from "./comment/Comment"
import CommentEdit from "./comment/CommentEdit"
import BoardTitleBox from "./board/BoardTitleBox"
import BoardContentBox from "./board/BoardContentBox"
import GoBackButton from "./button/GoBackButton"
import GreyButton from "./button/GreyButton"
import { useEffect, useState } from "react"
import Pagination from "./pagination/pagination"

type Reactions = {
  count_reaction_type_good: number
  count_reaction_type_bad: number
}

type ChildComment = {
  nickname: string
  date: string
  id: string
  content: string
  like: boolean
  likecount: string
}

type CommentData = {
  comment_id: number
  created_at: string
  user_image: string
  user_nickname: string
  content: string
  child_comments: ChildComment[]
  post_id: number
  reaction_columns: Reactions | null
  reaction_type: boolean
}

type ResponseData = {
  id: number
  user_nickname: string
  user_image: string
  category_name: string
  title: string
  content: string
  image_urls?: string[]
  visible: boolean
  reaction_columns: Reactions | null
  count_of_comments: string
  hits: number
  comments: CommentData[]
  created_at: string
  reaction_type: boolean | string
}

type FreeBoardDetailProps = {
  responseData: ResponseData
  category: string
}

export default function FreeBoardDetail({
  responseData,
  category
}: FreeBoardDetailProps) {
  const {
    id,
    user_nickname,
    category_name,
    image_urls,
    title,
    content,
    user_image,
    hits,
    reaction_columns = {
      count_reaction_type_good: 0,
      count_reaction_type_bad: 0
    },
    count_of_comments,
    created_at,
    reaction_type
  } = responseData

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [comments, setComments] = useState<CommentData[]>()
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationData, setPaginationData] = useState<number[]>([])
  const [countReactionGood, setCountReactionGood] = useState(
    reaction_columns ? reaction_columns.count_reaction_type_good : 0
  )
  const [countReactionBad, setCountReactionBad] = useState(
    reaction_columns ? reaction_columns.count_reaction_type_bad : 0
  )

  const convertDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    return `${year}.${month}.${day} ${hours}:${minutes}`
  }

  const convertedDate = convertDate(created_at)

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://711.ha-ving.store/boards/${id}/comments?limit=10&page=${currentPage}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS83OTI3MDIyOD92PTQiLCJwYXNzd29yZCI6IiQyYSQxMCRleHhmWXAveXZzNHpiY3cyRFNDalZlREFDaTVlcWZma01HaDlsVWwwTXFBRWRUM2h5WDVEeSIsInBob25lIjoiMDEwMTExMTIyMjIiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwibmlja25hbWUiOiJuaWNrbmFtZTEiLCJpZCI6MjEsInVzZXJuYW1lIjoidXNlciIsImF1dGgiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNzE3MDU5MjA5LCJleHAiOjE3MTk2NTEyMDl9.4bpxNGqYITfq2174mngAguJK3gQZ5gl7KzWB8N5eMQ4TV-e8_Ka7xlzCdGH8u6XEoiMywHZwJLM1_7tlAqtt0A"
          },
          cache: "no-store"
        }
      )
      if (response.ok) {
        const responseData = await response.json()
        setPaginationData(responseData.data.pagination_bar_number)
        setComments(responseData.data.posts.content)
      }
    } catch (error) {
      console.error("에러 발생:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [currentPage])

  const handleReactionGood = async () => {
    const data = {
      target_id: id,
      reaction_type: "GOOD"
    }
    try {
      const response = await fetch("https://711.ha-ving.store/reactions/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS83OTI3MDIyOD92PTQiLCJwYXNzd29yZCI6IiQyYSQxMCRleHhmWXAveXZzNHpiY3cyRFNDalZlREFDaTVlcWZma01HaDlsVWwwTXFBRWRUM2h5WDVEeSIsInBob25lIjoiMDEwMTExMTIyMjIiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwibmlja25hbWUiOiJuaWNrbmFtZTEiLCJpZCI6MjEsInVzZXJuYW1lIjoidXNlciIsImF1dGgiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNzE3MDU5MjA5LCJleHAiOjE3MTk2NTEyMDl9.4bpxNGqYITfq2174mngAguJK3gQZ5gl7KzWB8N5eMQ4TV-e8_Ka7xlzCdGH8u6XEoiMywHZwJLM1_7tlAqtt0A"
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log("반응 등록 성공:", responseData)
      } else {
        console.error("반응 등록을 실패했습니다.:", response.statusText)
      }
    } catch (error) {
      console.error("에러 발생:", error)
    }
  }

  const handleReactionBad = async () => {
    const data = {
      target_id: id,
      reaction_type: "BAD"
    }
    try {
      const response = await fetch("https://711.ha-ving.store/reactions/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS83OTI3MDIyOD92PTQiLCJwYXNzd29yZCI6IiQyYSQxMCRleHhmWXAveXZzNHpiY3cyRFNDalZlREFDaTVlcWZma01HaDlsVWwwTXFBRWRUM2h5WDVEeSIsInBob25lIjoiMDEwMTExMTIyMjIiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwibmlja25hbWUiOiJuaWNrbmFtZTEiLCJpZCI6MjEsInVzZXJuYW1lIjoidXNlciIsImF1dGgiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNzE3MDU5MjA5LCJleHAiOjE3MTk2NTEyMDl9.4bpxNGqYITfq2174mngAguJK3gQZ5gl7KzWB8N5eMQ4TV-e8_Ka7xlzCdGH8u6XEoiMywHZwJLM1_7tlAqtt0A"
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log("반응 등록 성공:", responseData)
      } else {
        console.error("반응 등록을 실패했습니다.:", response.statusText)
      }
    } catch (error) {
      console.error("에러 발생:", error)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://711.ha-ving.store/boards/${category}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS83OTI3MDIyOD92PTQiLCJwYXNzd29yZCI6IiQyYSQxMCRleHhmWXAveXZzNHpiY3cyRFNDalZlREFDaTVlcWZma01HaDlsVWwwTXFBRWRUM2h5WDVEeSIsInBob25lIjoiMDEwMTExMTIyMjIiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwibmlja25hbWUiOiJuaWNrbmFtZTEiLCJpZCI6MjEsInVzZXJuYW1lIjoidXNlciIsImF1dGgiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNzE3MDU5MjA5LCJleHAiOjE3MTk2NTEyMDl9.4bpxNGqYITfq2174mngAguJK3gQZ5gl7KzWB8N5eMQ4TV-e8_Ka7xlzCdGH8u6XEoiMywHZwJLM1_7tlAqtt0A"
          }
        }
      )
      if (response.ok) {
        const responseData = await response.json()
        console.log("삭제 성공:", responseData)
        router.back()
      } else {
        console.error("삭제를 실패했습니다.:", response.statusText)
      }
    } catch (error) {
      console.error("에러 발생:", error)
    }
  }

  const handleGoEdit = () => {
    dispatch(setCurrentPost(responseData))
    router.push(`/edit`)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div>
      <div className="flex gap-1 pb-6 text-grey_600 text-lg">
        <span>소통공간</span>
        <span>&gt;</span>
        <span className="text-grey_900">자유게시판</span>
      </div>
      <div className="flex flex-col gap-12 mb-40">
        <div className="flex flex-col gap-10 border-b-[1px] border-grey_50 ">
          <div className="flex flex-col gap-10 py-6 border-t-[1px] border-b-[1px] border-grey_50">
            <div className="flex justify-between">
              <GoBackButton label="목록" />
              <div className="flex gap-4">
                <GreyButton
                  label="수정"
                  onClick={handleGoEdit}
                />
                <GreyButton
                  label="삭제"
                  onClick={handleDelete}
                />
              </div>
            </div>
            <BoardTitleBox
              category_name={category_name}
              title={title}
              user_nickname={user_nickname}
              user_image={user_image}
              hits={hits}
              created_at={convertedDate}
            />
          </div>
          <BoardContentBox
            content={content}
            image_urls={image_urls}
          />
          <div className="flex gap-4 m-auto mb-10">
            <UseFullButton
              usefull={reaction_type}
              count_reaction_type_good={countReactionGood}
              onClick={handleReactionGood}
            />
            <NotUseFullButton
              usefull={reaction_type}
              count_reaction_type_bad={countReactionBad}
              onClick={handleReactionBad}
            />
          </div>
        </div>
        <CommentEdit
          id={id}
          count_of_comments={count_of_comments}
          fetchData={fetchData}
        />
        <div>
          {comments && comments.length > 0 ? (
            <>
              {comments.map(item => (
                <Comment
                  key={item.comment_id}
                  commentData={item}
                  fetchData={fetchData}
                />
              ))}
              <Pagination
                paginationData={paginationData}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="flex justify-center items-center text-grey_250 text-lg font-medium">
              등록된 댓글이 없습니다.
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <GoBackButton label="목록" />
        </div>
      </div>
    </div>
  )
}
