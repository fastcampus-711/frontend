import notUsefullDefaultIcon from "@/public/icon/not_usefull_default.svg"
import notUsefullActiveIcon from "@/public/icon/not_usefull_active.svg"
import Image from "next/image"

type NotUseFullButtonProps = {
  className?: string
  usefull: boolean
  count_reaction_type_bad: number
  onClick?: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function NotUseFullButton({
  className,
  onClick,
  ...props
}: NotUseFullButtonProps) {
  const usefull = props.usefull
  const count_of_bad = props.count_reaction_type_bad
  let style, iconSrc

  if (usefull === true) {
    style = "text-grey_250 border-grey_200"
    iconSrc = notUsefullDefaultIcon.src
  } else if (usefull === false) {
    style = "text-grey_900 border-grey_900"
    iconSrc = notUsefullActiveIcon.src
  } else if (usefull === null) {
    style = "text-grey_250 border-grey_200"
    iconSrc = notUsefullDefaultIcon.src
  }

  return (
    <button
      className={`flex gap-2 rounded-[50px] px-6 py-[11px] border ${className} ${style}`}
      onClick={onClick}
      {...props}>
      <Image
        src={iconSrc}
        alt="그냥그래요아이콘"
        width={24}
        height={24}
      />
      그냥 그래요
      <span className="font-semibold">{count_of_bad}</span>
    </button>
  )
}
