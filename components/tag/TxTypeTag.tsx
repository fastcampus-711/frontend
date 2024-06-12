type TxTypeTagProps = {
  className?: string
  subcategory: string
}

export default function TxTypeTag({ className, ...props }: TxTypeTagProps) {
  const subcategory = props.subcategory
  let style, text

  if (subcategory === "중고거래") {
    style = "bg-[#FFE2E2] text-[#610234] border-[#610234]"
    text = "중고거래"
  } else if (subcategory === "무료나눔") {
    style = "bg-[#FFF3C5] text-[#5A5040] border-[#5A5040]"
    text = "무료나눔"
  }

  return (
    <div
      className={`inline-block px-2 py-0.5 rounded border ${className} ${style}`}>
      {text}
    </div>
  )
}
