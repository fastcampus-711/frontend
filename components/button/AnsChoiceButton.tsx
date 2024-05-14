import ansDefaultIcon from "@/public/icon/ans_default.svg"
import ansChoiceIcon from "@/public/icon/ans_choice.svg"

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
        <img
          src={ansChoiceIcon.src}
          className="w-7 h-7"
        />
      ) : (
        <img
          src={ansDefaultIcon.src}
          alt="답변채택 아이콘"
          className="w-7 h-7"
        />
      )}
    </button>
  )
}
