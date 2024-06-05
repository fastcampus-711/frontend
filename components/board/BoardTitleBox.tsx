import Image from "next/image"
import MeatballButton from "../button/MeatballButton"
import hitsIcon from "@/public/icon/hits.svg"

type BoardTitleBox = {
  category_name: string
  title: string
  user_nickname: string
  user_image: string
  hits: number
  created_at: string
}

export default function BoardTitleBox(props: BoardTitleBox) {
  const { category_name, title, user_nickname, user_image, hits, created_at } =
    props
  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-grey_600 font-medium mb-4">{category_name}</span>
        <div className="flex justify-between">
          <p className="text-grey_900 text-2xl font-semibold">{title}</p>
          {/* <MeatballButton /> */}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-10 items-center">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 overflow-hidden rounded-3xl bg-slate-200">
              <Image
                src={user_image}
                alt="유저이미지"
                width={40}
                height={40}
              />
            </div>
            <span className="text-grey_900 font-medium">{user_nickname}</span>
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
        <span className="text-grey_250">{created_at}</span>
      </div>
    </div>
  )
}
