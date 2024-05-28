"use client"

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
  id: string
  isnew: boolean
  popular: boolean
  hits: number
  count_of_comments: string
  isimg: boolean
  category_id: number
  subcategory: string
  title: string
  content: string
  nickname: string
  usefull: boolean
  reaction_columns: Reactions
  date: string
  comments: CommentData[]
}

type FreeBoardDetailProps = {
  responseData: ResponseData
}

export default function FreeBoardDetail({
  responseData
}: FreeBoardDetailProps) {
  const {
    title,
    category_id,
    nickname,
    hits,
    date,
    content,
    usefull,
    reaction_columns = {
      count_reaction_type_good: 0,
      count_reaction_type_bad: 0
    },
    comments,
    count_of_comments
  } = responseData

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
                <GreyButton label="수정" />
                <GreyButton label="삭제" />
              </div>
            </div>
            <BoardTitleBox
              category_id={category_id}
              title={title}
              nickname={nickname}
              hits={hits}
              date={date}
            />
          </div>
          <BoardContentBox content={content} />
          <div className="flex gap-4 m-auto mb-10">
            <UseFullButton
              usefull={usefull}
              count_reaction_type_good={
                reaction_columns.count_reaction_type_good
              }
            />
            <NotUseFullButton
              usefull={usefull}
              count_reaction_type_bad={reaction_columns.count_reaction_type_bad}
            />
          </div>
        </div>
        <CommentEdit count_of_comments={count_of_comments} />
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
