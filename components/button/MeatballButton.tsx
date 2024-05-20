import meatBallIcon from "@/public/icon/meatball.svg"

type MeatballButtonProps = {
  className?: string
  onClick?: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function MeatballButton({ className }: MeatballButtonProps) {
  return (
    <button className={`${className}`}>
      <img
        src={meatBallIcon.src}
        alt="미트볼이미지"
      />
    </button>
  )
}
