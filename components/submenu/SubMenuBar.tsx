import Link from "next/link";

export default function BoardSubMenuBar({
  option,
  category
}: {
  option: string
  category: string
}) {
  const boardSubOptions: { value: string; name: string }[] = [
    { value: "frees", name: "자유 게시판" },
    { value: "markets", name: "나눔장터" },
    { value: "qnas", name: "QnA" }
  ]
  const noticeSubOptions = [
    { value: "notice", name: "공지사항" },
    { value: "schedule", name: "일정표" }
  ]
  const complaintOptions = [
    { value: "", name: "전체민원" },
    { value: "", name: "나의민원" }
  ]
  const feeOptions = [
    { value: "myfee", name: "우리집관리비" },
    { value: "fee", name: "관리비 상세보기" }
  ]

  const options =
    option == "community"
      ? boardSubOptions
      : option == "notice"
        ? noticeSubOptions
        : option == "complaint"
          ? complaintOptions
          : feeOptions

  return (
    // <div className="w-[1200px] h-14 justify-start items-start gap-[178px] inline-flex">
    // <div>
      <ul className="flex flex-1 justify-between items-center bg-white gap-2.5 hover:cursor-pointer">
        {options.map(opt => (
          <li
            key={opt.value}
            className={`inline-flex w-full justify-center items-center text-lg py-3 px-4 ${
              opt.value == category
                ? "text-main_color border-b-2 border-main_color font-semibold"
                : "text-grey_300 font-normal hover:border-b-2 hover:border-gray-200 "
            }`}>
            <Link
              key={opt.value}
              href={option === "fee" ? `/${opt.value}`:`/${option}/${opt.value}`}
              className={`px-6 text-center text-lg whitespace-nowrap`}>{opt.name}</Link>
          </li>
        ))}
      </ul>
    // </div>
    // </div>
  )

  // return (
  //     <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
  //         <ul className="flex flex-wrap -mb-px">
  //             {options.map((opt) => (
  //                 <li key = {opt.value} className="me-2">
  //                 <a
  //                     key={opt.value}
  //                     href={`/${option}/${opt.value}`}
  //                     className={`inline-block p-4
  //                     border-b-2
  //                     rounded-t-lg
  //                     ${opt.value == category ? "text-dark_blue border-dark_blue active dark:text-dark_blue dark:border-dark_blue" :
  //                     "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} `}
  //                     >{opt.name}</a>
  //                 </li>
  //             ))}
  //         </ul>
  //     </div>
  // );
}
