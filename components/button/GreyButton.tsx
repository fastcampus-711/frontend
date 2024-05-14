type GreyButtonProps = {
  className?: string
  label: string
  onClick?: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function GreyButton({
  className,
  label = "",
  onClick,
  ...props
}: GreyButtonProps) {
  return (
    <button
      className={`font-semibold rounded-lg px-6 py-2.5 bg-grey_100 text-grey_800 ${className}`}
      onClick={onClick}
      {...props}>
      {label}
    </button>
  )
}
