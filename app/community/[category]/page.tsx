import FreeBoardContent from "@/components/FreeBoardContent"
import ShareMarketContent from "@/components/ShareMarketContent"
import QnaContent from "@/components/QnaContent"
import CommunitySearch from "@/components/CommunitySearch"
import BoardSubMenuBar from "@/components/submenu/SubMenuBar"
import SetCategory from "@/components/SetCategory"

export default async function Page({
  params,
  searchParams
}: {
  params: { category: string }
  searchParams: { keyword: string; catid: number; page: number }
}) {
  const { category } = params
  const { keyword, catid, page } = searchParams

  const res = await fetch(
    // `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/${category}?keyword=${title}`
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/${category}?catid=${catid}&keyword=${keyword}&page=${page}`
  )
  const responseData = await res.json()
  let componentProps = { responseData, category, keyword, catid, page }
  let contentComponent

  if (category === "qnas") {
    contentComponent = <QnaContent {...componentProps} />
  } else if (category === "markets") {
    contentComponent = <ShareMarketContent {...componentProps} />
  } else if (category === "frees") {
    contentComponent = <FreeBoardContent {...componentProps} />
  } else {
    contentComponent = null
  }

  return (
    <div className="max-w-[1200px] m-auto mb-40">
      <SetCategory category={category} />
      <div className="py-8">
        <p className="text-grey_900 text-[32px] font-semibold">소통공간</p>
      </div>
      <div className="flex justify-between">
        <BoardSubMenuBar
          option="community"
          category={category}
        />
        <CommunitySearch
          category={category}
          placeholder="게시판 내 재검색"
          className="flex-1 max-w-[480px]"
          catid={catid}
          page={page}
        />
      </div>
      {contentComponent}
    </div>
  )
}
