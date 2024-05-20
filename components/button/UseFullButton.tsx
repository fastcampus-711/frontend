import usefullDefaultIcon from "@/public/icon/usefull_default.svg"
import usefullActiveIcon from "@/public/icon/usefull_active.svg"

type UseFullButtonProps = {
  className?: string
  usefull: boolean
  usefullcount: string
  onClick?: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function UseFullButton({
  className,
  onClick,
  ...props
}: UseFullButtonProps) {
  const usefull = props.usefull
  const usefullcount = props.usefullcount
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
      <img
        src={iconSrc}
        alt="도움이됐어요아이콘"
      />
      도움이 됐어요
      <span className="font-semibold">{usefullcount}</span>
    </button>
  )
}
