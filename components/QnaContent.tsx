type ResponseData = {
  title: string
}[]

export default function QnaContent({
  responseData
}: {
  responseData: ResponseData
}) {
  console.log(responseData)
  return <div>QnA</div>
}
