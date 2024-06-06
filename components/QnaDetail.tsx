type ResponseData = {
  title: string
}[]

export default function QnaDetail({
  responseData
}: {
  responseData: ResponseData
}) {
  console.log(responseData)
  return <div>수정 테스트</div>
}
