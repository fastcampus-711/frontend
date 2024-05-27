import ansDefaultIcon from "@/public/icon/ans_default.svg"
import ansChoiceIcon from "@/public/icon/ans_choice.svg"
import Image from "next/image"

type AnsChoiceButtonProps = {
  className?: string
  ischoice: boolean
  onClick?: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function AnsChoiceButton({
  className,
  onClick,
  ...props
}: AnsChoiceButtonProps) {
  const ischoice = props.ischoice

  return (
    <button
      className={`p-[2px] ${className}`}
      onClick={onClick}>
      {ischoice ? (
        <Image
          src={ansChoiceIcon.src}
          alt="답변채택아이콘"
          width={28}
          height={28}
        />
      ) : (
        <Image
          src={ansDefaultIcon.src}
          alt="답변채택기본아이콘"
          width={28}
          height={28}
        />
      )}
    </button>
  )
}
