"use client"

import { useState } from "react"
import BlackButton from "../button/BlackButton"

type CommentEditProps = {
  type: string
  id: number
  count_of_comments: string
  fetchData: () => void
}

export default function CommentEdit(props: CommentEditProps) {
  const { type, id, count_of_comments, fetchData } = props
  const [comment, setComment] = useState("")

  const handleUpdate = async () => {
    const url = `https://711.ha-ving.store/boards/${id}/comments`
    const data = {
      content: comment
    }
    console.log(data)
    console.log(id)
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS83OTI3MDIyOD92PTQiLCJwYXNzd29yZCI6IiQyYSQxMCRleHhmWXAveXZzNHpiY3cyRFNDalZlREFDaTVlcWZma01HaDlsVWwwTXFBRWRUM2h5WDVEeSIsInBob25lIjoiMDEwMTExMTIyMjIiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwibmlja25hbWUiOiJuaWNrbmFtZTEiLCJpZCI6MjEsInVzZXJuYW1lIjoidXNlciIsImF1dGgiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNzE3MDU5MjA5LCJleHAiOjE3MTk2NTEyMDl9.4bpxNGqYITfq2174mngAguJK3gQZ5gl7KzWB8N5eMQ4TV-e8_Ka7xlzCdGH8u6XEoiMywHZwJLM1_7tlAqtt0A"
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log("댓글 등록 성공:", responseData)
        setComment("")
        fetchData()
      } else {
        console.error("댓글 등록을 실패했습니다.:", response.statusText)
      }
    } catch (error) {
      console.error("에러 발생:", error)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-grey_900 text-xl font-semibold">
        <span>{type}</span>
        <span>[{count_of_comments}]</span>
      </div>
      <textarea
        maxLength={150}
        placeholder={`${type}을 입력해주세요 (최대 150자)`}
        className="w-full h-40 border border-grey_300 p-4"
        value={comment}
        onChange={e => setComment(e.target.value)}></textarea>
      <div className="flex justify-end">
        <BlackButton
          label={`${type}등록`}
          onClick={handleUpdate}
        />
      </div>
    </div>
  )
}
