type ResponseData = {
  title: string
}[]

export default function ShareMarketDetail({
  responseData
}: {
  responseData: ResponseData
}) {
  console.log(responseData)
  return (
    <div>
      <h1>나눔장터 상세</h1>
      <p>{responseData.category}</p>
    </div>
  )
}
