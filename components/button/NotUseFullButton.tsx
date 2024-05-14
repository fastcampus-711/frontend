type NotUseFullButtonProps = {
  className?: string
  usefull: boolean
  notusefullcount: string
  onClick?: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function NotUseFullButton({
  className,
  onClick,
  ...props
}: NotUseFullButtonProps) {
  const usefull = props.usefull
  const notusefullcount = props.notusefullcount
  let style

  if (!usefull) {
    style = "text-grey_900 border-grey_900"
  } else {
    style = "text-grey_250 border-grey_200"
  }

  return (
    <button
      className={`rounded-[50px] px-6 py-[11px] border ${className} ${style}`}
      onClick={onClick}
      {...props}>
      그냥 그래요
      <span className="font-semibold ml-2">{notusefullcount}</span>
    </button>
  )
}
