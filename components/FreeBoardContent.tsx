type ResponseData = {
  title: string
}[]

export default function FreeBoardContent({
  responseData
}: {
  responseData: ResponseData
}) {
  console.log(responseData)
  return <div>자유게시판</div>
}
