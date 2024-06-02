type PrimaryButtonProps = {
  className?: string
  label: string
  onClick?: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function PrimaryButton({
  className,
  label = "",
  onClick,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={`font-semibold rounded-lg px-6 py-4 bg-[#0f7375] text-white ${className}`}
      onClick={onClick}
      {...props}>
      {label}
    </button>
  )
}
