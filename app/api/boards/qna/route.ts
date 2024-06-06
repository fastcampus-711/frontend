import type { NextRequest } from "next/server"

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl
  // let url = `http://localhost:3001/${category}`

  const keyword = searchParams.get("keyword")
  const page = searchParams.get("page")
  const catid =
    searchParams.get("catid") === "undefined" ||
    searchParams.get("catid") === null
      ? "0"
      : searchParams.get("catid")
  const status = searchParams.get("status")
  console.log(keyword)
  console.log(catid)

  let url = `https://711.ha-ving.store/boards/qna?category-id=${catid}&page=${page}`

  if (searchParams && keyword !== undefined && keyword !== "undefined") {
    // url += `?keyword=${searchParams.get("keyword")}`
    url = `https://711.ha-ving.store/boards/qna?category-id=${catid}&keyword=${keyword}&page=${page}`
  }

  try {
    const response = await fetch(url, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS83OTI3MDIyOD92PTQiLCJwYXNzd29yZCI6IiQyYSQxMCRleHhmWXAveXZzNHpiY3cyRFNDalZlREFDaTVlcWZma01HaDlsVWwwTXFBRWRUM2h5WDVEeSIsInBob25lIjoiMDEwMTExMTIyMjIiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwibmlja25hbWUiOiJuaWNrbmFtZTEiLCJpZCI6MjEsInVzZXJuYW1lIjoidXNlciIsImF1dGgiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNzE3MDU5MjA5LCJleHAiOjE3MTk2NTEyMDl9.4bpxNGqYITfq2174mngAguJK3gQZ5gl7KzWB8N5eMQ4TV-e8_Ka7xlzCdGH8u6XEoiMywHZwJLM1_7tlAqtt0A"
      },
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
