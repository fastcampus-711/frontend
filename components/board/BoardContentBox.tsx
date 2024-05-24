import Image from "next/image"

type BoardContentBoxProps = {
  content: string
}

export default function BoardContentBox(props: BoardContentBoxProps) {
  const { content } = props
  return (
    <div className="flex flex-col gap-6 mb-20">
      <Image
        src={
          "https://aptners.s3.ap-southeast-1.amazonaws.com/file/63c432c7-ac92-46bc-b95f-fbbf47c08d23.png"
        }
        alt="게시판이미지"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }} // optional
      />
      <p className="text-grey_900 text-xl font-medium">{content}</p>
    </div>
  )
}
