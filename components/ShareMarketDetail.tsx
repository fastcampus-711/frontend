import Image from "next/image"
import GreyButton from "./button/GreyButton"
import MeatballButton from "./button/MeatballButton"
import Comment from "./comment/Comment"
import CommentEdit from "./comment/CommentEdit"
import TxStateTag from "./tag/TxStateTag"
import TxTypeTag from "./tag/TxTypeTag"

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

type ResponseData = {
  title: string
  subcategory: string
  issaled: string
  nickname: string
  hits: string
  date: string
  content: string
  price: string
  count_of_comments: string
  comment: CommentData[]
}

type ShareMarketDetailProps = {
  responseData: ResponseData
}

export default function ShareMarketDetail({
  responseData
}: ShareMarketDetailProps) {
  const {
    title,
    subcategory,
    issaled,
    nickname,
    hits,
    date,
    content,
    price,
    comment,
    count_of_comments
  } = responseData
  return (
    <div>
      <div className="flex gap-1 pb-6 text-grey_600 text-lg">
        <span>소통공간</span>
        <span>&gt;</span>
        <span className="text-grey_900">나눔장터</span>
      </div>
      <div className="flex flex-col gap-12 mb-40">
        <div className="flex flex-col gap-10 border-b-[1px] border-grey_50 ">
          <div className="flex flex-col gap-10 py-6 border-t-[1px] border-b-[1px] border-grey_50">
            <div className="flex justify-end">
              <GreyButton label="목록" />
            </div>
            <div className="flex gap-10 mb-20">
              <Image
                src={
                  "https://aptners.s3.ap-southeast-1.amazonaws.com/file/63c432c7-ac92-46bc-b95f-fbbf47c08d23.png"
                }
                alt="게시판이미지"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "580px", height: "auto" }} // optional
              />
              <div className="flex flex-1 flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <TxTypeTag subcategory={subcategory} />
                    <TxStateTag issaled={issaled} />
                  </div>
                  <div className="flex justify-between">
                    <p className="text-grey_900 text-xl font-semibold">
                      {title}
                    </p>
                    <MeatballButton />
                  </div>
                  <span className="text-grey_900 text-2xl font-semibold">
                    가격:{price}원
                  </span>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-3xl bg-slate-200">img</div>
                  <div className="flex-1">
                    <span className="text-grey_900 font-medium">
                      {nickname}
                    </span>
                    <div className="flex justify-between">
                      <span className="text-grey_300">조회 {hits}</span>
                      <span className="text-grey_300">{date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-grey_900 text-xl font-medium">{content}</p>
              </div>
            </div>
          </div>
        </div>
        <CommentEdit count_of_comments={count_of_comments} />
        <div>
          {comment &&
            comment.map(item => (
              <Comment
                key={item.id}
                commentData={item}
              />
            ))}
        </div>
        <div className="flex justify-end">
          <GreyButton label="목록" />
        </div>
      </div>
    </div>
  )
}
