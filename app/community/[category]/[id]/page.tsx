import FreeBoardDetail from "@/components/FreeBoardDetail"
import QnaDetail from "@/components/QnaDetail"
import ShareMarketDetail from "@/components/ShareMarketDetail"

export default async function Page({
  params
}: {
  params: { category: string; id: string }
}) {
  const { category, id } = params

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

  return <div className="max-w-[1200px] m-auto">{contentComponent}</div>
}
