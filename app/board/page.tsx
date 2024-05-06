"use client"

import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

export default function Board() {
  const [content, setContent] = useState("")
  const modules = {
    toolbar: {
      container: [
        ["image"],
        [{ header: [1, 2, 3, 4, 5, false] }],
        ["bold", "underline"]
      ]
    }
  }
  return (
    <>
      <h1>Board</h1>
      <ReactQuill
        style={{ height: "600px" }}
        modules={modules}
        value={content} // 내용 입력 필드에 기존 내용 표시
        onChange={setContent} // 내용이 변경될 때 상태 업데이트
      />
    </>
  )
}
