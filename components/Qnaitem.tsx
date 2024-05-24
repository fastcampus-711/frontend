import { useState } from "react"
import AnsChoiceButton from "./button/AnsChoiceButton"
import MeatballButton from "./button/MeatballButton"
import SeeMoreButton from "./button/SeeMoreButton"
import CommentEdit from "./comment/CommentEdit"
import AnswerStateTag from "./tag/AnswerStateTag"

type CommentData = {
  nickname: string
  date: string
  id: string
  content: string
  ischoice: boolean
}

type QnaItemProps = {
  id: string
  isanswer: string
  isnew: boolean
  title: string
  content: string
  nickname: string
  date: string
  count_of_comments: string
  comment?: CommentData[] // CommentData[] | undefined로 수정
}

export default function QnaItem({
  isanswer,
  isnew,
  title,
  content,
  nickname,
  date,
  count_of_comments,
  comment = []
}: QnaItemProps) {
  const [showAllComments, setShowAllComments] = useState(false)

  const handleSeeMoreClick = () => {
    setShowAllComments(true)
  }

  const commentsToShow = showAllComments ? comment : comment.slice(0, 3)

  return (
    <div className="border border-grey_200 rounded-lg">
      <div className="flex justify-between items-center px-10 py-4 border-b border-grey_50">
        <div className="flex gap-4 items-center">
          <AnswerStateTag answer={isanswer} />
          <p className="text-grey_900 text-lg font-medium">{title}</p>
        </div>
        <MeatballButton />
      </div>
      <div>
        <div className="flex gap-10 px-10 py-6 border-b border-grey_50">
          <div className="w-[540px] h-[360px] rounded-xl bg-slate-200">img</div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-3xl bg-slate-200">img</div>
              <div className="flex flex-col">
                <span className="text-grey_900 font-medium">{nickname}</span>
                <span className="text-grey_250">{date}</span>
              </div>
            </div>
            <p className="text-grey_700 text-xl font-medium">{content}</p>
          </div>
        </div>
      </div>
      <div className="px-10 py-6">
        {comment.length === 0 ? (
          <div className="flex justify-center items-center text-grey_250 text-lg font-medium">
            등록된 답변이 없습니다.
          </div>
        ) : comment.length >= 7 ? (
          <div className="flex justify-center items-center text-center bg-grey_100 w-full h-40 text-grey_250 text-lg font-medium border border-grey_200 p-4">
            답변 가능 개수(7개)를 초과했습니다. <br />이 질문에는 더 이상 답변을
            추가할 수 없습니다.
          </div>
        ) : (
          <CommentEdit count_of_comments={count_of_comments} />
        )}
      </div>
      {commentsToShow.map(commentItem => (
        <div
          key={commentItem.id}
          className="px-10 py-6 border-t border-grey_200">
          <div className="flex gap-4">
            <div>
              <AnsChoiceButton ischoice={commentItem.ischoice} />
            </div>
            <div className="w-10 h-10 rounded-3xl bg-slate-200">img</div>
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <span className="text-grey_900 font-medium">
                    {commentItem.nickname}
                  </span>
                  <div className="flex gap-4">
                    <button className="text-grey_600 font-medium">수정</button>
                    <button className="text-grey_600 font-medium">삭제</button>
                    <button className="text-point_1 font-medium">신고</button>
                  </div>
                </div>
                <span className="text-grey_400 text-sm font-medium">
                  {commentItem.date}
                </span>
              </div>
              <p>{commentItem.content}</p>
            </div>
          </div>
        </div>
      ))}
      {comment.length > 3 && !showAllComments && (
        <div className="flex justify-center items-center py-6 border-t border-grey_200">
          <SeeMoreButton onClick={handleSeeMoreClick} />
        </div>
      )}
    </div>
  )
}
