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
  nickname: string
  date: string
  id: string
  content: string
  like: boolean
  likecount: string
  child_comments: ChildComment[]
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
  reaction_type: boolean | null
}

type FreeBoardDetailProps = {
  responseData: ResponseData
}

export default function FreeBoardDetail({
  responseData
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
    comments,
    created_at,
    reaction_type
  } = responseData

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

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

  const handleGoEdit = () => {
    dispatch(setCurrentPost(responseData))
    router.push(`/edit`)
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
                <GreyButton label="삭제" />
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
              count_reaction_type_good={
                reaction_columns ? reaction_columns.count_reaction_type_good : 0
              }
            />
            <NotUseFullButton
              usefull={reaction_type}
              count_reaction_type_bad={
                reaction_columns ? reaction_columns.count_reaction_type_bad : 0
              }
            />
          </div>
        </div>
        <CommentEdit
          id={id}
          count_of_comments={count_of_comments}
        />
        <div>
          {comments &&
            comments.map(item => (
              <Comment
                key={item.id}
                commentData={item}
              />
            ))}
        </div>
        <div className="flex justify-center items-center text-grey_250 text-lg font-medium">
          등록된 댓글이 없습니다.
        </div>
        <div className="flex justify-end">
          <GoBackButton label="목록" />
        </div>
      </div>
    </div>
  )
}
