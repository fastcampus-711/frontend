import FreeBoardContent from "@/components/FreeBoardContent"
import ShareMarketContent from "@/components/ShareMarketContent"
import QnaContent from "@/components/QnaContent"

export default async function Page({
  params
}: {
  params: { category: string }
}) {
  const { category } = params
  console.log(category)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/community/${category}`
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
    <>
      <p>소통공간</p>
      {contentComponent}
    </>
  )
}
