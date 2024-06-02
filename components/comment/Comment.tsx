"use client"

import Reply from "./Reply"
import BlackLinedButton from "../button/BlackLinedButton"
import LikeButton from "../button/LikeButton"
import GreyButton from "../button/GreyButton"
import BlackButton from "../button/BlackButton"
import { useState } from "react"

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

type CommentProps = {
  commentData: CommentData
}

export default function Comment(props: CommentProps) {
  const [showEdit, setShowEdit] = useState(false)
  const { commentData } = props
  const { nickname, date, content, like, likecount, child_comments } =
    commentData

  return (
    <div>
      <div className="flex gap-4 p-6  border-b border-grey_200">
        <div className="w-10 h-10 rounded-3xl bg-slate-200 ">img</div>
        <div className="flex flex-col gap-10 flex-1">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-grey_900 font-medium">{nickname}</span>
              <div className="flex gap-4">
                <button className="text-grey_600 font-medium">수정</button>
                <button className="text-grey_600 font-medium">삭제</button>
                <button className="text-point_1 font-medium">신고</button>
              </div>
            </div>
            <span className="text-grey_400 text-sm font-medium mb-2">
              {date}
            </span>
            <p className="text-grey_900 text-lg font-medium">{content}</p>
          </div>
          <div className="flex justify-between">
            <BlackLinedButton
              label="답글"
              onClick={() => setShowEdit(!showEdit)}
            />
            <LikeButton
              likecount={likecount}
              like={like}
            />
          </div>
          {showEdit && (
            <div className="flex flex-col gap-4">
              <textarea
                maxLength={150}
                placeholder="댓글을 입력해주세요 (최대 150자)"
                className="w-full h-40 border border-grey_300 p-4"></textarea>
              <div className="flex justify-end gap-2">
                <GreyButton
                  label="취소"
                  onClick={() => setShowEdit(false)}
                />
                <BlackButton label="등록" />
              </div>
            </div>
          )}
        </div>
      </div>
      {child_comments.map(item => (
        <Reply
          key={item.id}
          replyData={item}
        />
      ))}
    </div>
  )
}
