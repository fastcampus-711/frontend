type NextButtonProps = {
  className?: string
  onClick?: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function NextButton({
  className,
  onClick,
  ...props
}: NextButtonProps) {
  return (
    <button
      className={` px-6 py-2 font-semibold text-grey_800 ${className}`}
      onClick={onClick}>
      다음글
    </button>
  )
}
