import type { NextRequest } from "next/server"

export const GET = async (
  request: NextRequest,
  context: { params: { category: string } }
) => {
  const { category } = context.params
  const { searchParams } = request.nextUrl
  // let url = `http://localhost:3001/${category}`

  const keyword = searchParams.get("keyword")
  const catid =
    searchParams.get("catid") === "undefined" ||
    searchParams.get("catid") === null
      ? "0"
      : searchParams.get("catid")
  console.log(keyword)
  console.log(catid)

  let url = `https://711.ha-ving.store/boards/${category}?category-id=${catid}`
  // searchParams가 비어있지 않고, title이 존재하면서 값이 "undefined"가 아닌 경우에만 title을 URL에 추가합니다.
  if (searchParams && keyword !== undefined && keyword !== "undefined") {
    // url += `?keyword=${searchParams.get("keyword")}`
    url = `https://711.ha-ving.store/boards/${category}?category-id=${catid}&keyword=${keyword}`
  }

  try {
    const response = await fetch(url, {
      cache: "no-store"
    })
    if (response.ok) {
      console.log(url)
      const responseData = await response.json()
      return Response.json(responseData.data)
    } else {
      console.error("게시물 불러오기를 실패했습니다.")
    }
  } catch (error) {
    console.error("에러 발생:", error)
  }
}
