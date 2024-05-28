"use client"

import { useSelector, useDispatch } from "react-redux"
import EditFrees from "@/components/edit/EditFrees"
import EditMarkets from "@/components/edit/EditMarkets"
import EditQna from "@/components/edit/EditQna"

export default function Edit() {
  const category = useSelector((state: any) => state.category)

  let contentComponent

  if (category.value === "frees") {
    contentComponent = <EditFrees />
  } else if (category.value === "markets") {
    contentComponent = <EditMarkets />
  } else if (category.value === "qnas") {
    contentComponent = <EditQna />
  }

  return (
    <div className="max-w-[1200px] m-auto mb-40">
      <div className="flex flex-col gap-10">
        <div className="flex gap-4 items-center border-b border-grey_200 pt-8 pb-4">
          <p className="text-grey_900 text-[32px] font-semibold">소통공간</p>
          <div className="w-[1px] h-8 border-r border-grey_250"></div>
          <p className="text-grey_700 text-2xl font-medium">
            게시글 작성 페이지
          </p>
        </div>
        {contentComponent}
      </div>
    </div>
  )
}
