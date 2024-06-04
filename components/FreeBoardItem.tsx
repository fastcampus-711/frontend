import Link from "next/link"
import NewTag from "./tag/NewTag"
import imgIcon from "@/public/icon/img.svg"
import PopularTag from "./tag/PopularTag"
import Image from "next/image"

type FreeBoardItemProps = {
  id: number
  user_nickname: string
  category_name: string
  title: string
  image_urls?: string[] | null
  visible: boolean
  count_reaction_type_good: number
  count_of_comments: string
  hits: number
  created_at: string
  ishot: boolean
  isnew: boolean
}

export default function FreeBoardItem({
  id,
  user_nickname,
  category_name,
  title,
  image_urls,
  visible,
  count_reaction_type_good,
  count_of_comments,
  hits,
  created_at,
  ishot,
  isnew
}: FreeBoardItemProps) {
  const handleClick = () => {
    if (!visible) {
      alert("비밀글입니다.")
    }
  }

  const convertDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")
    return `${year}.${month}.${day}`
  }

  const convertedDate = convertDate(created_at)

  return (
    <tr className="text-center border-b border-grey_200">
      <td className="px-4 py-7 text-grey_300">{category_name}</td>
      <td className="text-left text-grey_900 font-medium">
        <div className="flex items-center">
          {ishot ? (
            <div className="mr-4">
              <PopularTag />
            </div>
          ) : (
            ""
          )}
          <Link
            className="mr-2"
            href={visible ? `/boards/frees/${id}` : "#"}
            onClick={handleClick}>
            <p className="font-medium">{title}</p>
          </Link>
          <div className="inline-flex">
            <span>
              {image_urls && image_urls.length > 0 ? (
                <Image
                  src={imgIcon.src}
                  alt="이미지아이콘"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "24px", height: "auto" }}
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
      <td className="px-4 py-7 text-grey_900">{user_nickname}</td>
      <td className="px-4 py-7 text-grey_900">{count_reaction_type_good}</td>
      <td className="px-4 py-7 text-grey_900">{hits}</td>
      <td className="px-4 py-7 text-grey_900">{convertedDate}</td>
    </tr>
  )
}
