type ResponseData = {
  title: string
}[]

export default function QnaDetail({
  responseData
}: {
  responseData: ResponseData
}) {
  console.log(responseData)
  return <div>QnA 상세</div>
}
