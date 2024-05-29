import CommunitySearch from "@/components/CommunitySearch"
import BoardSubMenuBar from "@/components/submenu/SubMenuBar"
import SetCategory from "@/components/SetCategory"
import AllComplaints from "@/components/AllComplaints"
import MyComplaints from "@/components/MyComplaints"

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
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/complaints/${category}?keyword=${title}`
  )
  const responseData = await res.json()
  let componentProps = { responseData, category }
  let contentComponent

  if (category === "allcomplaints") {
    contentComponent = <AllComplaints {...componentProps} />
  } else if (category === "mycomplaints") {
    contentComponent = <MyComplaints {...componentProps} />
  } else {
    contentComponent = null
  }
  return (
    <div className="max-w-[1200px] m-auto mb-40">
      <SetCategory category={category} />
      <div className="py-8">
        <p className="text-grey_900 text-[32px] font-semibold">민원게시판</p>
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
        {/* <CommunitySearch
          category={category}
          placeholder="게시판 내 재검색"
          className="flex-1 max-w-[480px]"
        /> */}
      </div>
      {contentComponent}
    </div>
  )
}
