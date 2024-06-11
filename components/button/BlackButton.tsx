type BlackButtonProps = {
  className?: string
  label: string
  onClick?: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function BlackButton({
  className,
  label = "",
  onClick,
  ...props
}: BlackButtonProps) {
  return (
    <button
      className={`font-semibold rounded-lg px-6 py-2.5 bg-grey_900 text-white ${className}`}
      onClick={onClick}
      {...props}>
      {label}
    </button>
  )
}
