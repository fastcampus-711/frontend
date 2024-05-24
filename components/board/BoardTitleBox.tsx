import Image from "next/image"
import MeatballButton from "../button/MeatballButton"
import hitsIcon from "@/public/icon/hits.svg"

type BoardTitleBox = {
  subcategory: string
  title: string
  nickname: string
  hits: number
  date: string
}

export default function BoardTitleBox(props: BoardTitleBox) {
  const { subcategory, title, nickname, hits, date } = props
  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-grey_600 font-medium mb-4">{subcategory}</span>
        <div className="flex justify-between">
          <p className="text-grey_900 text-2xl font-semibold">{title}</p>
          <MeatballButton />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-10 items-center">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-3xl bg-slate-200">img</div>
            <span className="text-grey_900 font-medium">{nickname}</span>
          </div>
          <div className="flex gap-[4px]">
            <Image
              src={hitsIcon.src}
              alt="조회수아이콘"
              width={24}
              height={24}
            />
            <span className="text-grey_300 font-medium">조회수</span>
            <span className="text-grey_300 font-semibold">{hits}</span>
          </div>
        </div>
        <span className="text-grey_250">{date}</span>
      </div>
    </div>
  )
}
