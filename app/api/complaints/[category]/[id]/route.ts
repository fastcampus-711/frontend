import type { NextRequest } from "next/server"

export const GET = async (
  request: NextRequest,
  context: { params: { category: string; id: string } }
) => {
  const { category, id } = context.params

  try {
    const response = await fetch(
      `http://localhost:3001/${category}/${id}`,
      //   `https://711.ha-ving.store/boards/${category}/${id}`,
      {
        cache: "no-store"
      }
    )
    if (response.ok) {
      const responseData = await response.json()
      return Response.json(responseData)
    } else {
      console.error("게시물 불러오기를 실패했습니다.")
    }
  } catch (error) {
    console.error("에러 발생:", error)
  }
}
