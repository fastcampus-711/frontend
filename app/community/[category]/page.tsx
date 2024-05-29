import FreeBoardContent from "@/components/FreeBoardContent"
import ShareMarketContent from "@/components/ShareMarketContent"
import QnaContent from "@/components/QnaContent"
import CommunitySearch from "@/components/CommunitySearch"
import Link from "next/link"
import BoardSubMenuBar from "@/components/submenu/SubMenuBar"
import SetCategory from "@/components/SetCategory"

export default async function Page({
  params,
  searchParams
}: {
  params: { category: string }
  searchParams: { keyword: string; catid: number }
}) {
  const { category } = params
  const { keyword, catid } = searchParams

  const res = await fetch(
    // `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/${category}?keyword=${title}`
    `https://aptner.ha-ving.store/api/community/${category}?catid=${catid}&keyword=${keyword}`
  )
  const responseData = await res.json()
  let componentProps = { responseData, category }
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
      {/* <Link href={"/community/freeboard"}>자유게시판</Link>
      <Link href={"/community/sharemarket"}>나눔장터</Link>
      <Link href={"/community/qna"}>QnA</Link>
      <CommunitySearch category={category} /> */}
      <div className="flex justify-between">
        <BoardSubMenuBar
          option="community"
          category={category}
        />
        <CommunitySearch
          category={category}
          placeholder="게시판 내 재검색"
          className="flex-1 max-w-[480px]"
        />
      </div>
      {contentComponent}
    </div>
  )
}
