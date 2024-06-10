import type { NextRequest } from "next/server"

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl

  const keyword = searchParams.get("keyword")

  let url = `https://711.ha-ving.store/boards/search`

  if (searchParams && keyword !== undefined && keyword !== "undefined") {
    // url += `?keyword=${searchParams.get("keyword")}`
    url = `https://711.ha-ving.store/boards/search?keyword=${keyword}`
  }

  try {
    const response = await fetch(url, {
      cache: "no-store"
    })
    if (response.ok) {
      const responseData = await response.json()
      return Response.json(responseData.data)
    } else {
      console.error("게시물 불러오기를 실패했습니다.")
    }
  } catch (error) {
    console.error("에러 발생:", error)
  }
}
