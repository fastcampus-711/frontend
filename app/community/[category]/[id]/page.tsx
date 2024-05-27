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
    `https://aptner.ha-ving.store/api/community//api/community/${category}/${id}`
  )
  const responseData = await res.json()
  let componentProps = { responseData }
  let contentComponent

  if (category === "qnas") {
    contentComponent = <QnaDetail {...componentProps} />
  } else if (category === "markets") {
    contentComponent = <ShareMarketDetail {...componentProps} />
  } else if (category === "frees") {
    contentComponent = <FreeBoardDetail {...componentProps} />
  } else {
    contentComponent = null
  }

  return <div className="max-w-[1200px] m-auto">{contentComponent}</div>
}
