import NewTag from "./tag/NewTag"
import TxStateTag from "./tag/TxStateTag"
import TxTypeTag from "./tag/TxTypeTag"

type ShareMarketItemProps = {
  issaled: string
  isnew: boolean
  subcategory: string
  title: string
  price: string
  nickname: string
  viewcount: string
  date: string
}

export default function ShareMarketItem({
  issaled,
  isnew,
  subcategory,
  title,
  price,
  nickname,
  viewcount,
  date
}: ShareMarketItemProps) {
  return (
    <div className="flex gap-6">
      <div className="w-[272px] h-[185px] bg-slate-200">img</div>
      <div className="flex flex-col justify-between py-2">
        <div>
          <TxTypeTag
            subcategory={subcategory}
            className="mr-2"
          />
          <TxStateTag issaled={issaled} />
          <div className="text-grey_900 text-lg font-semibold mt-2 mb-3 flex gap-2 items-center">
            <p>{title}</p>
            <span>{isnew ? <NewTag /> : ""}</span>
          </div>
          {price ? (
            <p className="text-grey_900 text-xl font-semibold">
              가격 :{price}원
            </p>
          ) : (
            ""
          )}
        </div>
        <div>
          <span className="text-grey_700 mr-6">{nickname}</span>
          <span className="text-grey_700">조회 {viewcount}</span>
          <p className="text-grey_250">{date}</p>
        </div>
      </div>
    </div>
  )
}
