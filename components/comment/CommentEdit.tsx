"use client"

import { useState } from "react"
import BlackButton from "../button/BlackButton"

type CommentEditProps = {
  id: number
  count_of_comments: string
}

export default function CommentEdit(props: CommentEditProps) {
  const { id, count_of_comments } = props
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
          "Content-Type": "application/json"
          // Authorization: "Bearer YOUR_ACCESS_TOKEN"
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log("댓글 등록 성공:", responseData)
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
        <span>댓글</span>
        <span>[{count_of_comments}]</span>
      </div>
      <textarea
        maxLength={150}
        placeholder="댓글을 입력해주세요 (최대 150자)"
        className="w-full h-40 border border-grey_300 p-4"></textarea>
      <div className="flex justify-end">
        <BlackButton
          label="댓글등록"
          onClick={handleUpdate}
        />
      </div>
    </div>
  )
}
