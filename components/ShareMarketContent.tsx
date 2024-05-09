type ResponseData = {
  title: string
}[]

export default function ShareMarketContent({
  responseData
}: {
  responseData: ResponseData
}) {
  console.log(responseData)
  return <div>나눔장터</div>
}
