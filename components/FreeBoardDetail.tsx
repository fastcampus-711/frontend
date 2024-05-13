type ResponseData = {
  title: string
}[]

export default function FreeBoardDetail({
  responseData
}: {
  responseData: ResponseData
}) {
  console.log(responseData)
  return <div>자유게시판 상세</div>
}
