import type { NextRequest } from "next/server"
import fs from "fs"

export const config = {
    api: {
        bodyParser: false,
    }
}

export const POST = async() => {
    console.log("POST start")
    const fileName = "sheet.xlsx"
    const filePath = "./public/sheet.xlsx"

    const fileBuffer = fs.readFileSync(filePath)

    const formData = new FormData()
    formData.append("file", new Blob([fileBuffer]), fileName)

    const url = `https://711.ha-ving.store/maintenance-bills/upload`

    try{
        const response = await fetch(url, {
            method: "POST",
            body: formData
        })
        if(response.ok) {
            console.log("파일 전송 성공")
        } else {
            console.log("전송 실패: ", response.status, response.statusText)
        }
    }
    catch(e) {
        console.error(e)
    }
}

export const GET = async (
    request: NextRequest
  ) => {
    const { searchParams } = request.nextUrl

    const year = searchParams.get("year")
    const month = searchParams.get("month")

    let url = `https://711.ha-ving.store/maintenance-bills/make-statistics?year=${year}&month=${month}`
    await POST()
    try {
        const response = await fetch(url, {
            cache: "no-store"
        })
        if (response.ok) {
            const responseData = await response.json()
            return Response.json(responseData)
        } else {
        console.error("관리비 조회를 실패했습니다.")
        }
    } catch (error) {
        console.error("관리비 조회 에러 발생:", error)
  }
}