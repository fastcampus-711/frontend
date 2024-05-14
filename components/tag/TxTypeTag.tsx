type TxTypeTagProps = {
  className?: string
  subcategory: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function TxTypeTag({ className, ...props }: TxTypeTagProps) {
  const subcategory = props.subcategory
  let style, text

  if (subcategory === "used") {
    style = "bg-[#D7EAFF] text-[#002D5F] border-[#002D5F]"
    text = "중고거래"
  } else if (subcategory === "share") {
    style = "bg-[#FFE1C5] text-[#D96800] border-[#D96800]"
    text = "무료나눔"
  }

  return (
    <div className={`inline-block px-2 py-0.5 rounded border ${style}`}>
      {text}
    </div>
  )
}
