import Reply from "./Reply"
import BlackLinedButton from "../button/BlackLinedButton"
import LikeButton from "../button/LikeButton"

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
  child_comment: ChildComment[]
}

type CommentProps = {
  commentData: CommentData
}

export default function Comment(props: CommentProps) {
  const { commentData } = props
  const { nickname, date, content, like, likecount, child_comment } =
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
            <BlackLinedButton label="답글" />
            <LikeButton
              likecount={likecount}
              like={like}
            />
          </div>
        </div>
      </div>
      {child_comment.map(item => (
        <Reply replyData={item} />
      ))}
    </div>
  )
}
