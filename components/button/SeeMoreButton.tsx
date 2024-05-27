type SeeMoreButtonProps = {
  className?: string
  onClick?: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function SeeMoreButton({
  className,
  onClick,
  ...props
}: SeeMoreButtonProps) {
  return (
    <button
      className={`font-semibold rounded-lg px-10 py-4 bg-grey_50 text-grey_900 ${className}`}
      onClick={onClick}
      {...props}>
      펼쳐보기
    </button>
  )
}
