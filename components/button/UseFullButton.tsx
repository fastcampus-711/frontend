import usefullDefaultIcon from "@/public/icon/usefull_default.svg"
import usefullActiveIcon from "@/public/icon/usefull_active.svg"
import Image from "next/image"

type UseFullButtonProps = {
  className?: string
  usefull: boolean
  count_reaction_type_good: number
  onClick?: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function UseFullButton({
  className,
  onClick,
  ...props
}: UseFullButtonProps) {
  const usefull = props.usefull
  const count_of_good = props.count_reaction_type_good
  let style, iconSrc

  if (usefull === true) {
    style = "text-primary border-primary"
    iconSrc = usefullActiveIcon.src
  } else if (usefull === false) {
    style = "text-grey_250 border-grey_200"
    iconSrc = usefullDefaultIcon.src
  } else if (usefull === null) {
    style = "text-grey_250 border-grey_200"
    iconSrc = usefullDefaultIcon.src
  }

  return (
    <button
      className={`flex gap-2 rounded-[50px] px-6 py-[11px] border ${className} ${style}`}
      onClick={onClick}
      {...props}>
      <Image
        src={iconSrc}
        alt="도움이됐어요아이콘"
        width={24}
        height={24}
      />
      도움이 됐어요
      <span className="font-semibold">{count_of_good}</span>
    </button>
  )
}
