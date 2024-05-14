type LikeButtonProps = {
  className?: string
  label: string
  like: boolean
  onClick?: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function LikeButton({
  className,
  label = "",
  onClick,
  ...props
}: LikeButtonProps) {
  const likeClassName = props.like
    ? "border-black text-black"
    : "border-grey_100 text-grey_100"
  return (
    <button
      className={`font-semibold rounded px-6 py-2 border ${className} ${likeClassName}`}
      onClick={onClick}
      {...props}>
      {label}
    </button>
  )
}
