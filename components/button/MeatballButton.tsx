import meatBallIcon from "@/public/icon/meatball.svg"
import Image from "next/image"

type MeatballButtonProps = {
  className?: string
  onClick?: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function MeatballButton({ className }: MeatballButtonProps) {
  return (
    <button className={`${className}`}>
      <Image
        src={meatBallIcon.src}
        alt="미트볼이미지"
        width={24}
        height={24}
      />
    </button>
  )
}
