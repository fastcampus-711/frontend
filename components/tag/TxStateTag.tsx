type TxStateTagProps = {
  className?: string
  issaled: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function TxStateTag({ className, ...props }: TxStateTagProps) {
  const issaled = props.issaled
  let style, text

  if (issaled === "onsale") {
    style = "bg-[#000D4F] text-white py-[3px]"
    text = "판매중"
  } else if (issaled === "reserved") {
    style = "text-[#000D4F] border border-[#000D4F] py-0.5"
    text = "예약중"
  } else {
    style = "bg-grey_100 text-grey_300 py-[3px]"
    text = "판매완료"
  }

  return <div className={`inline-block px-2 rounded ${style}`}>{text}</div>
}
