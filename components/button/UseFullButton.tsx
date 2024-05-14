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
  let style

  if (usefull) {
    style = "text-primary border-primary"
  } else {
    style = "text-grey_250 border-grey_200"
  }

  return (
    <button
      className={`rounded-[50px] px-6 py-[11px] border ${className} ${style}`}
      onClick={onClick}
      {...props}>
      도움이 됐어요
      <span className="font-semibold ml-2">{usefullcount}</span>
    </button>
  )
}
