import CommunitySearch from "@/components/CommunitySearch"
import BoardSubMenuBar from "@/components/submenu/SubMenuBar"
import SetCategory from "@/components/SetCategory"
import ShareMarketContent from "@/components/ShareMarketContent"

export default async function Page({
  searchParams
}: {
  searchParams: { keyword: string; status: string; catid: number; page: number }
}) {
  const category = "markets"
  const { keyword, status, catid, page } = searchParams

  const res = await fetch(
    // `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/${category}?keyword=${title}`
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/boards/markets?catid=${catid}&keyword=${keyword}&status=${status}&page=${page}`
  )
  const responseData = await res.json()
  let componentProps = { responseData, category, keyword, status, catid, page }

  return (
    <div className="max-w-[1200px] m-auto mb-40">
      <SetCategory category={category} />
      <div className="py-8">
        <p className="text-grey_900 text-[32px] font-semibold">소통공간</p>
      </div>
      <div className="flex justify-between">
        <BoardSubMenuBar
          option="boards"
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
      <ShareMarketContent {...componentProps} />
    </div>
  )
}
