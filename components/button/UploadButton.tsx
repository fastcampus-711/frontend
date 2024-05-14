type UploadButtonProps = {
  className?: string
  onClick?: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function UploadButton({
  className,
  onClick,
  ...props
}: UploadButtonProps) {
  return (
    <button
      className={`font-semibold rounded-lg px-4 py-2 border primary_dark bg-white border-primary_dark text-primary_dark ${className}`}
      onClick={onClick}
      {...props}>
      파일첨부
    </button>
  )
}
