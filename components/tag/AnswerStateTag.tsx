import ansAnsweredIcon from "@/public/icon/ans_answered.svg"
import ansPendingIcon from "@/public/icon/asn_pending.svg"
import ansChoiceIcon from "@/public/icon/ans_choice.svg"
import Image from "next/image"

type AnswerStateTagProps = {
  className?: string
  answer: string
}

export default function AnswerStateTag({
  className,
  ...props
}: AnswerStateTagProps) {
  const answer = props.answer
  let style, text, source, alter

  if (answer === "answered") {
    style = "text-grey_250"
    text = "답변완료"
    source = ansAnsweredIcon
    alter = "답변완료 아이콘"
  } else if (answer === "pending") {
    style = "text-[#002D5F]"
    text = "답변대기"
    source = ansPendingIcon
    alter = "답변대기 아이콘"
  } else {
    style = "text-[#FF9111]"
    text = "답변채택"
    source = ansChoiceIcon
    alter = "답변채택 아이콘"
  }

  return (
    <div className={`inline-flex gap-1 px-1 py-1 rounded ${style}`}>
      <Image
        src={source.src}
        alt="답변상태아이콘"
        width={24}
        height={24}
      />
      {text}
    </div>
  )
}
