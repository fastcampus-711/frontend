"use client"

import { useMemo, useRef, useState } from "react"
import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"
import AWS from "aws-sdk"
import { ImageResize } from "quill-image-resize-module-ts"

Quill.register("modules/ImageResize", ImageResize)

export default function Editor() {
  const quillRef = useRef<any>()
  const [content, setContent] = useState("")

  const imageHandler = async () => {
    const input = document.createElement("input")
    input.setAttribute("type", "file")
    input.setAttribute("accept", "image/*")
    input.click()
    input.addEventListener("change", async () => {
      //이미지를 담아 전송할 file생성
      const file = input.files?.[0]
      try {
        //업로드할 파일의 이름으로 Date 사용
        const name = Date.now()
        //생성한 s3 관련 설정
        AWS.config.update({
          region: process.env.NEXT_PUBLIC_AWS_REGION,
          accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
        })
        //앞서 생성한 file을 담아 s3에 업로드하는 객체 생성
        const upload = new AWS.S3.ManagedUpload({
          params: {
            ACL: "public-read",
            Bucket: "deokbucket",
            Key: `${name}`,
            Body: file
          }
        })
        //이미지 업로드 후 업로드 된 이미지 url을 가져오기
        const IMG_URL = await upload.promise().then(res => res.Location)
        //useRef를 사용해 에디터에 접근한 후 에디터의 현재 커서 위치에 이미지 삽입
        const editor = quillRef.current.getEditor()
        const range = editor.getSelection()
        // 가져온 위치에 이미지를 삽입
        editor.insertEmbed(range.index, "image", IMG_URL)
      } catch (error) {
        console.log(error)
      }
    })
  }
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["image"],
          [{ header: [1, 2, 3, 4, 5, false] }],
          ["bold", "underline"]
        ],
        handlers: {
          image: imageHandler
        }
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize"]
      }
    }
  }, [])
  return (
    <ReactQuill
      ref={quillRef}
      style={{ height: "600px" }}
      modules={modules}
      value={content} // 내용 입력 필드에 기존 내용 표시
      onChange={setContent} // 내용이 변경될 때 상태 업데이트
    />
  )
}
