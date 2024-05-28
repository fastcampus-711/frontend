import Link from "next/link"
import NewTag from "./tag/NewTag"
import imgIcon from "@/public/icon/img.svg"
import PopularTag from "./tag/PopularTag"
import Image from "next/image"

type FreeBoardItemProps = {
  id: number
  title: string
  category_id: number
  count_of_comments: string
  nickname: string
  count_of_good: number
  hits: number
  date: string
  image_urls: any
  popular: boolean
  isnew: boolean
}

export default function FreeBoardItem({
  id,
  title,
  category_id,
  count_of_comments,
  nickname,
  count_of_good,
  hits,
  date,
  image_urls,
  popular,
  isnew
}: FreeBoardItemProps) {
  return (
    <tr className="text-center border-b border-grey_200">
      <td className="px-4 py-7 text-grey_300">
        {category_id === 1 && "생활/편의"}
        {category_id === 2 && "음식/카페"}
        {category_id === 3 && "병원/약국"}
        {category_id === 4 && "수리/시공"}
        {category_id === 5 && "투자/부동산"}
        {category_id === 6 && "교육/육아"}
        {category_id === 7 && "아파트/동네소식"}
        {category_id === 8 && "여행"}
        {category_id === 9 && "살림정보"}
        {category_id === 10 && "모임/동호회"}
        {category_id === 11 && "기타"}
      </td>
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
            href={`/community/frees/${id}`}>
            <p className="font-medium">{title}</p>
          </Link>
          <div className="inline-flex">
            <span>
              {image_urls !== null ? (
                <Image
                  src={imgIcon.src}
                  alt="이미지아이콘"
                  width={24}
                  height={24}
                />
              ) : (
                ""
              )}
            </span>
            <span className="mx-[2px] text-[#FF5151]">
              [{count_of_comments}]
            </span>
            <span>{isnew ? <NewTag /> : ""}</span>
          </div>
        </div>
      </td>
      <td className="px-4 py-7 text-grey_900">{nickname}</td>
      <td className="px-4 py-7 text-grey_900">{count_of_good}</td>
      <td className="px-4 py-7 text-grey_900">{hits}</td>
      <td className="px-4 py-7 text-grey_900">{date}</td>
    </tr>
  )
}
