import thumbDefaultIcon from "@/public/icon/thumb_default.svg"
import thumbActiveIcon from "@/public/icon/thumb_active.svg"
import Image from "next/image"

type LikeButtonProps = {
  className?: string
  likecount: string
  like: boolean
  onClick?: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function LikeButton({
  className,
  onClick,
  ...props
}: LikeButtonProps) {
  const like = props.like
  const likecount = props.likecount
  let style, iconSrc

  if (like === true) {
    style = "border-black text-black"
    iconSrc = thumbActiveIcon.src
  } else if (like === false) {
    style = "border-grey_100 text-grey_100"
    iconSrc = thumbDefaultIcon.src
  } else if (like === null) {
    style = "border-grey_100 text-grey_100"
    iconSrc = thumbDefaultIcon.src
  }
  return (
    <button
      className={`flex gap-2 font-semibold rounded px-6 py-2 border ${className} ${style}`}
      onClick={onClick}
      {...props}>
      <Image
        src={iconSrc.src}
        alt="좋아요아이콘"
        width={24}
        height={24}
      />

      {likecount}
    </button>
  )
}
