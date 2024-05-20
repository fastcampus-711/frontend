import FreeBoardContent from "@/components/FreeBoardContent"
import ShareMarketContent from "@/components/ShareMarketContent"
import QnaContent from "@/components/QnaContent"
import CommunitySearch from "@/components/CommunitySearch"
import Link from "next/link"
import BoardSubMenuBar from "@/components/submenu/SubMenuBar"

export default async function Page({
  params,
  searchParams
}: {
  params: { category: string }
  searchParams: { title: string }
}) {
  const { category } = params
  const { title } = searchParams

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/${category}?title=${title}`
  )
  const responseData = await res.json()
  let componentProps = { responseData }
  let contentComponent

  if (category === "qna") {
    contentComponent = <QnaContent {...componentProps} />
  } else if (category === "sharemarket") {
    contentComponent = <ShareMarketContent {...componentProps} />
  } else if (category === "freeboard") {
    contentComponent = <FreeBoardContent {...componentProps} />
  } else {
    contentComponent = null
  }

  return (
    <div className="max-w-[1200px] m-auto">
      <div className="py-8">
        <p className="text-grey_900 text-[32px] font-semibold">소통공간</p>
      </div>
      {/* <Link href={"/community/freeboard"}>자유게시판</Link>
      <Link href={"/community/sharemarket"}>나눔장터</Link>
      <Link href={"/community/qna"}>QnA</Link>
      <CommunitySearch category={category} /> */}
      <BoardSubMenuBar option="community" category={category} />
      {contentComponent}
    </div>
  )
}
