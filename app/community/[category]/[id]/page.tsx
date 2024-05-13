import FreeBoardDetail from "@/components/FreeBoardDetail"
import QnaDetail from "@/components/QnaDetail"
import ShareMarketDetail from "@/components/ShareMarketDetail"

export default async function Page({
  params
}: {
  params: { category: string; id: string }
}) {
  const { category, id } = params
  console.log(category)
  console.log(id)

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/${category}/${id}`
  )
  const responseData = await res.json()
  let componentProps = { responseData }
  let contentComponent

  if (category === "qna") {
    contentComponent = <QnaDetail {...componentProps} />
  } else if (category === "sharemarket") {
    contentComponent = <ShareMarketDetail {...componentProps} />
  } else if (category === "freeboard") {
    contentComponent = <FreeBoardDetail {...componentProps} />
  } else {
    contentComponent = null
  }

  return (
    <>
      <p className="text-grey_900 text-[32px] font-semibold">상세</p>
      {contentComponent}
    </>
  )
}
