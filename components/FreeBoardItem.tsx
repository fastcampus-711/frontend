import Link from "next/link"
import NewTag from "./tag/NewTag"
import imgIcon from "@/public/icon/img.svg"
import PopularTag from "./tag/PopularTag"

type FreeBoardItemProps = {
  id: string
  title: string
  subcategory: string
  commentcount: string
  nickname: string
  likecount: string
  viewcount: string
  date: string
  isimg: boolean
  popular: boolean
  isnew: boolean
}

export default function FreeBoardItem({
  id,
  title,
  subcategory,
  commentcount,
  nickname,
  likecount,
  viewcount,
  date,
  isimg,
  popular,
  isnew
}: FreeBoardItemProps) {
  return (
    <tr className="text-center border-b border-grey_200">
      <td className="px-4 py-7 text-grey_300">{subcategory}</td>
      <td className="text-left text-grey_900 font-medium">
        <div className="flex items-center">
          {popular ? (
            <div className="mr-4">
              <PopularTag />
            </div>
          ) : (
            ""
          )}
          <Link
            className="mr-2"
            href={`/community/freeboard/${id}`}>
            <p className="font-medium">{title}</p>
          </Link>
          <div className="inline-flex">
            <span>
              {isimg ? (
                <img
                  src={imgIcon.src}
                  alt="이미지아이콘"
                />
              ) : (
                ""
              )}
            </span>
            <span className=" mx-[2px]">[{commentcount}]</span>
            <span>{isnew ? <NewTag /> : ""}</span>
          </div>
        </div>
      </td>
      <td className="px-4 py-7 text-grey_900">{nickname}</td>
      <td className="px-4 py-7 text-grey_900">{likecount}</td>
      <td className="px-4 py-7 text-grey_900">{viewcount}</td>
      <td className="px-4 py-7 text-grey_900">{date}</td>
    </tr>
  )
}
