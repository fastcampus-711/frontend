type BlackLinedButtonProps = {
  className?: string
  label: string
  onClick?: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function BlackLinedButton({
  className,
  label = "",
  onClick,
  ...props
}: BlackLinedButtonProps) {
  return (
    <button
      className={`font-semibold rounded px-6 py-2 border border-black text-black ${className}`}
      onClick={onClick}
      {...props}>
      {label}
    </button>
  )
}
