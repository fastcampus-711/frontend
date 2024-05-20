import GreyButton from "./button/GreyButton"
import UseFullButton from "./button/UseFullButton"
import NotUseFullButton from "./button/NotUseFullButton"
import Comment from "./comment/Comment"
import CommentEdit from "./comment/CommentEdit"
import BoardTitleBox from "./board/BoardTitleBox"
import BoardContentBox from "./board/BoardContentBox"

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
  id: string
  isnew: boolean
  popular: boolean
  viewcount: string
  commentcount: string
  isimg: boolean
  category: string
  subcategory: string
  title: string
  content: string
  nickname: string
  usefull: boolean
  usefullcount: string
  notusefullcount: string
  date: string
  comment: CommentData[]
}

type FreeBoardDetailProps = {
  responseData: ResponseData
}

export default function FreeBoardDetail({
  responseData
}: FreeBoardDetailProps) {
  const {
    title,
    subcategory,
    nickname,
    viewcount,
    date,
    content,
    usefull,
    usefullcount,
    notusefullcount,
    comment,
    commentcount
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
            <div className="flex justify-end">
              <GreyButton label="목록" />
            </div>
            <BoardTitleBox
              subcategory={subcategory}
              title={title}
              nickname={nickname}
              viewcount={viewcount}
              date={date}
            />
          </div>
          <BoardContentBox content={content} />
          <div className="flex gap-4 m-auto mb-10">
            <UseFullButton
              usefull={usefull}
              usefullcount={usefullcount}
            />
            <NotUseFullButton
              usefull={usefull}
              notusefullcount={notusefullcount}
            />
          </div>
        </div>
        <CommentEdit commentcount={commentcount} />
        <div>
          {comment && comment.map(item => <Comment commentData={item} />)}
        </div>
        <div className="flex justify-end">
          <GreyButton label="목록" />
        </div>
      </div>
    </div>
  )
}
