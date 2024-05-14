type PrevButtonProps = {
  className?: string
  onClick?: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function PrevButton({
  className,
  onClick,
  ...props
}: PrevButtonProps) {
  return (
    <button
      className={` px-6 py-2 font-semibold text-grey_800 ${className}`}
      onClick={onClick}>
      이전글
    </button>
  )
}
