import type { NextRequest } from "next/server"

export const GET = async (
  request: NextRequest,
  context: { params: { category: string } }
) => {
  const { category } = context.params
  const { searchParams } = request.nextUrl
  let url = `http://localhost:3001/${category}`

  // searchParams가 비어있지 않고, title이 존재하면서 값이 "undefined"가 아닌 경우에만 title을 URL에 추가합니다.
  if (
    searchParams &&
    searchParams.get("title") !== undefined &&
    searchParams.get("title") !== "undefined"
  ) {
    url += `?title=${searchParams.get("title")}`
  }

  try {
    const response = await fetch(url, {
      cache: "no-store"
    })
    if (response.ok) {
      console.log(url)
      const responseData = await response.json()
      return Response.json(responseData)
    } else {
      console.error("게시물 불러오기를 실패했습니다.")
    }
  } catch (error) {
    console.error("에러 발생:", error)
  }
}
