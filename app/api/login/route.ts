import type { NextRequest } from "next/server"
import { cookies } from "next/headers"

export const GET = async (request: NextRequest) => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get("accesstoken")

  try {
    const response = await fetch("https://711.ha-ving.store/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: "user", password: "p@ssword" })
    })

    if (response.ok) {
      console.log("로그인 성공")
      const responseData = await response.json()
      console.log(accessToken)
    } else {
      console.error("로그인 실패")
    }
  } catch (error) {
    console.error("에러 발생:", error)
  }
}
