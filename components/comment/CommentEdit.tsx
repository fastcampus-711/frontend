import BlackButton from "../button/BlackButton"

type CommentEditProps = {
  commentcount: string
}

export default function CommentEdit(props: CommentEditProps) {
  const { commentcount } = props
  return (
    <div className="flex flex-col gap-4">
      <div className="text-grey_900 text-xl font-semibold">
        <span>댓글</span>
        <span>[{commentcount}]</span>
      </div>
      <textarea
        maxLength={150}
        placeholder="댓글을 입력해주세요 (최대 150자)"
        className="w-full h-40 border border-grey_300 p-4"></textarea>
      <div className="flex justify-end">
        <BlackButton label="댓글등록" />
      </div>
    </div>
  )
}
