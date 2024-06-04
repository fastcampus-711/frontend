import thumbDefaultIcon from "@/public/icon/thumb_default.svg"
import thumbActiveIcon from "@/public/icon/thumb_active.svg"
import Image from "next/image"

type LikeButtonProps = {
  className?: string
  likecount: number
  like: string | null
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

  if (like === "GOOD") {
    style = "border-black text-black"
    iconSrc = thumbActiveIcon.src
  } else if (like === "BAD") {
    style = "border-grey_300 text-grey_250"
    iconSrc = thumbDefaultIcon.src
  } else if (like === "DEFAULT") {
    style = "border-grey_300 text-grey_250"
    iconSrc = thumbDefaultIcon.src
  }
  return (
    <button
      className={`flex gap-2  font-medium rounded px-6 py-2 border ${className} ${style}`}
      onClick={onClick}
      {...props}>
      <Image
        src={iconSrc}
        alt="좋아요아이콘"
        width={24}
        height={24}
      />
      {likecount}
    </button>
  )
}
