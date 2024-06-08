import NoticesContent from "@/components/NoticesContent"
import CommunitySearch from "@/components/CommunitySearch"
import BoardSubMenuBar from "@/components/submenu/SubMenuBar"
import SetCategory from "@/components/SetCategory"

export default async function Page({
  searchParams
}: {
  searchParams: { keyword: string; catid: number; page: number }
}) {
  const category = "notices"
  const { keyword, catid, page } = searchParams

  const res = await fetch(
    // `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/${category}?keyword=${title}`
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/boards/notices?catid=${catid}&keyword=${keyword}&page=${page}`,
    { cache: "no-store" }
  )
  const responseData = await res.json()
  let componentProps = { responseData, category, keyword, catid, page }

  return (
    <div className="max-w-[1200px] m-auto mb-40">
      <SetCategory category={category} />
      <div className="py-8">
        <p className="text-grey_900 text-[32px] font-semibold">공지사항</p>
      </div>
      <div className="flex justify-between items-start">
        <BoardSubMenuBar
          option="notice"
          category={category}
        />
        <CommunitySearch
          category={category}
          placeholder="게시판 내 검색"
          catid={catid}
          page={page}
        />
      </div>
      <NoticesContent {...componentProps} />
    </div>
  )
}
