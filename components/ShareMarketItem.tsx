import Image from "next/image"
import NewTag from "./tag/NewTag"
import TxStateTag from "./tag/TxStateTag"
import TxTypeTag from "./tag/TxTypeTag"
import noImgImg from "@/public/img/no_img.png"

type ShareMarketItemProps = {
  status: string
  category_name: string
  image_urls?: string[] | null
  title: string | React.ReactNode
  price: number
  user_nickname: string
  hits: number
  created_at: string
  ishot: boolean
  isnew: boolean
}

export default function ShareMarketItem({
  status,
  category_name,
  image_urls,
  title,
  price,
  user_nickname,
  hits,
  created_at,
  ishot,
  isnew
}: ShareMarketItemProps) {
  const convertDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")
    return `${year}.${month}.${day}`
  }

  const convertedDate = convertDate(created_at)

  return (
    <div className="flex gap-6">
      <div className="relative w-[272px] h-[185px] bg-slate-200">
        {image_urls && image_urls.length > 0 ? (
          <Image
            src={image_urls[0]}
            alt="이미지아이콘"
            fill
            style={{ objectFit: "cover" }}
          />
        ) : (
          <Image
            src={noImgImg.src}
            width={0}
            alt="이미지없음"
            height={0}
            sizes="100vw"
            style={{ width: "272px", height: "auto" }}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between py-2">
        <div>
          <TxTypeTag
            subcategory={category_name}
            className="mr-2"
          />
          <TxStateTag issaled={status} />
          <div className="text-grey_900 text-lg font-semibold mt-2 mb-3 flex gap-2 items-center">
            <p>{title}</p>
            <span>{isnew ? <NewTag /> : ""}</span>
          </div>
          {category_name === "중고거래" && price ? (
            <p className="text-grey_900 text-xl font-semibold">
              가격 :{price}원
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-grey_700">{user_nickname}</span>
          <div className="flex justify-between">
            <span className="text-grey_700">조회 {hits}</span>
            <span className="text-grey_250">{convertedDate}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
