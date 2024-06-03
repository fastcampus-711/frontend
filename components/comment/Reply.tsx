import replyIcon from "@/public/icon/reply.svg"
import LikeButton from "../button/LikeButton"
import Image from "next/image"

type ReplyData = {
  nickname: string
  date: string
  id: string
  content: string
  like: boolean
  likecount: string
}

type ReplyProps = {
  replyData: ReplyData
}

export default function Reply(props: ReplyProps) {
  const { replyData } = props
  const { nickname, date, content, like, likecount } = replyData

  return (
    <div className="flex gap-4 p-6  border-b border-grey_200">
      <Image
        src={replyIcon.src}
        alt="답글아이콘"
        width={24}
        height={24}
      />
      <div className="w-10 h-10 rounded-3xl bg-slate-200">img</div>
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
          <span className="text-grey_400 text-sm font-medium mb-2">{date}</span>
          <p className="text-grey_900 text-lg font-medium">{content}</p>
        </div>
        <div className="flex justify-end">
          {/* <LikeButton
            likecount={likecount}
            like={like}
          /> */}
          {/* Type error: Type 'string' is not assignable to type 'number'. */}
        </div>
      </div>
    </div>
  )
}
