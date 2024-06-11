import CommunitySearch from "@/components/CommunitySearch"
import BoardSubMenuBar from "@/components/submenu/SubMenuBar"
import SetCategory from "@/components/SetCategory"
import ComplainsContent from "@/components/ComplainContent"

export default async function Page({
  searchParams
}: {
  searchParams: { keyword: string; status: string; catid: number; page: number }
}) {
  const category = "all"
  const { keyword, status, catid, page } = searchParams

  const res = await fetch(
    // `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/${category}?keyword=${title}`
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/complains/all?catid=${catid}&keyword=${keyword}&status=${status}&page=${page}`,
    { cache: "no-store" }
  )
  const responseData = await res.json()
  let componentProps = { responseData, category, keyword, status, catid, page }

  return (
    <div className="max-w-[1200px] m-auto mb-40">
      <SetCategory category={category} />
      <div className="py-8">
        <p className="text-grey_900 text-[32px] font-semibold">민원게시판</p>
      </div>
      <div className="flex justify-between items-start">
        <BoardSubMenuBar
          option="complains"
          category={category}
        />
        <CommunitySearch
          category={category}
          placeholder="게시판 내 검색"
          catid={catid}
          page={page}
          status={status}
        />
      </div>
      <ComplainsContent {...componentProps} />
    </div>
  )
}
