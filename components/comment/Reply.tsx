import replyIcon from "@/public/icon/reply.svg"
import LikeButton from "../button/LikeButton"
import Image from "next/image"
import { useState } from "react"
import GreyButton from "../button/GreyButton"
import BlackButton from "../button/BlackButton"

type Reactions = {
  count_reaction_type_good: number
  count_reaction_type_bad: number
}

type ChildComment = {
  comment_id: number
  created_at: string
  user_image: string
  user_nickname: string
  content: string
  child_comments: ChildComment[]
  post_id: number
  reaction_columns: Reactions | null
  reaction_type: string | null
}

type ReplyProps = {
  replyData: ChildComment
  fetchData: () => void
}

export default function Reply(props: ReplyProps) {
  const { replyData, fetchData } = props
  const {
    comment_id,
    user_nickname,
    created_at,
    user_image,
    content,
    post_id,
    reaction_type,
    reaction_columns
  } = replyData
  const [reaction, setReaction] = useState<string | null>(reaction_type)
  const [countReactionGood, setCountReactionGood] = useState(
    reaction_columns ? reaction_columns.count_reaction_type_good : 0
  )
  const [showModify, setShowModify] = useState(false)
  const [modifyContent, setModifyContent] = useState(content)
  const [contentData, setContentData] = useState(content)

  const convertDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    return `${year}.${month}.${day} ${hours}:${minutes}`
  }

  const convertedDate = convertDate(created_at)

  const handleUpdate = async () => {
    const url = `https://711.ha-ving.store/boards/${post_id}/comments/${comment_id}`
    const data = {
      content: modifyContent
    }
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS83OTI3MDIyOD92PTQiLCJwYXNzd29yZCI6IiQyYSQxMCRleHhmWXAveXZzNHpiY3cyRFNDalZlREFDaTVlcWZma01HaDlsVWwwTXFBRWRUM2h5WDVEeSIsInBob25lIjoiMDEwMTExMTIyMjIiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwibmlja25hbWUiOiJuaWNrbmFtZTEiLCJpZCI6MjEsInVzZXJuYW1lIjoidXNlciIsImF1dGgiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNzE3MDU5MjA5LCJleHAiOjE3MTk2NTEyMDl9.4bpxNGqYITfq2174mngAguJK3gQZ5gl7KzWB8N5eMQ4TV-e8_Ka7xlzCdGH8u6XEoiMywHZwJLM1_7tlAqtt0A"
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        const responseData = await response.json()
        setContentData(responseData.data.content)
        setShowModify(false)
        console.log("답글 수정 성공:", responseData)
      } else {
        console.error("답글 수정을 실패했습니다.:", response.statusText)
      }
    } catch (error) {
      console.error("에러 발생:", error)
    }
  }

  const handleLike = async () => {
    const data = {
      target_id: comment_id,
      reaction_type: "GOOD"
    }
    try {
      const response = await fetch(
        "https://711.ha-ving.store/reactions/comment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS83OTI3MDIyOD92PTQiLCJwYXNzd29yZCI6IiQyYSQxMCRleHhmWXAveXZzNHpiY3cyRFNDalZlREFDaTVlcWZma01HaDlsVWwwTXFBRWRUM2h5WDVEeSIsInBob25lIjoiMDEwMTExMTIyMjIiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwibmlja25hbWUiOiJuaWNrbmFtZTEiLCJpZCI6MjEsInVzZXJuYW1lIjoidXNlciIsImF1dGgiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNzE3MDU5MjA5LCJleHAiOjE3MTk2NTEyMDl9.4bpxNGqYITfq2174mngAguJK3gQZ5gl7KzWB8N5eMQ4TV-e8_Ka7xlzCdGH8u6XEoiMywHZwJLM1_7tlAqtt0A"
          },
          body: JSON.stringify(data)
        }
      )

      if (response.ok) {
        const responseData = await response.json()
        console.log("좋아요 등록 성공:", responseData)
        setReaction(responseData.data.reaction_type)
        setCountReactionGood(
          responseData.data.reaction_colums.count_reaction_type_good
        )
      } else {
        console.error("좋아요 등록을 실패했습니다.:", response.statusText)
      }
    } catch (error) {
      console.error("에러 발생:", error)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://711.ha-ving.store/boards/${post_id}/comments/${comment_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS83OTI3MDIyOD92PTQiLCJwYXNzd29yZCI6IiQyYSQxMCRleHhmWXAveXZzNHpiY3cyRFNDalZlREFDaTVlcWZma01HaDlsVWwwTXFBRWRUM2h5WDVEeSIsInBob25lIjoiMDEwMTExMTIyMjIiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwibmlja25hbWUiOiJuaWNrbmFtZTEiLCJpZCI6MjEsInVzZXJuYW1lIjoidXNlciIsImF1dGgiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNzE3MDU5MjA5LCJleHAiOjE3MTk2NTEyMDl9.4bpxNGqYITfq2174mngAguJK3gQZ5gl7KzWB8N5eMQ4TV-e8_Ka7xlzCdGH8u6XEoiMywHZwJLM1_7tlAqtt0A"
          }
        }
      )
      if (response.ok) {
        const responseData = await response.json()
        console.log("삭제 성공:", responseData)
        fetchData()
      } else {
        console.error("삭제를 실패했습니다.:", response.statusText)
      }
    } catch (error) {
      console.error("에러 발생:", error)
    }
  }

  return (
    <div className="flex gap-4 p-6  border-b border-grey_200">
      <div className="py-1">
        <Image
          src={replyIcon.src}
          alt="답글아이콘"
          width={24}
          height={24}
        />
      </div>
      <div className="w-10 h-10 overflow-hidden rounded-3xl bg-slate-200">
        <Image
          src={user_image}
          alt="유저이미지"
          width={40}
          height={40}
        />
      </div>
      <div className="flex flex-col gap-10 flex-1">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-grey_900 font-medium">{user_nickname}</span>
            <div className="flex gap-4">
              <button
                className="text-grey_600 font-medium"
                onClick={() => setShowModify(!showModify)}>
                수정
              </button>
              <button
                className="text-grey_600 font-medium"
                onClick={handleDelete}>
                삭제
              </button>
              <button className="text-point_1 font-medium">신고</button>
            </div>
          </div>
          <span className="text-grey_400 text-sm font-medium mb-2">
            {convertedDate}
          </span>
          {showModify ? (
            <div>
              <textarea
                maxLength={150}
                placeholder="댓글을 입력해주세요 (최대 150자)"
                className="w-full h-40 border border-grey_300 p-4"
                value={modifyContent}
                onChange={e => setModifyContent(e.target.value)}></textarea>
              <div className="flex justify-end gap-2">
                <GreyButton
                  label="취소"
                  onClick={() => setShowModify(false)}
                />
                <BlackButton
                  label="등록"
                  onClick={handleUpdate}
                />
              </div>
            </div>
          ) : (
            <p className="text-grey_900 text-lg font-medium">{contentData}</p>
          )}
        </div>
        <div className="flex justify-end">
          <LikeButton
            likecount={countReactionGood}
            like={reaction}
            onClick={handleLike}
          />
        </div>
      </div>
    </div>
  )
}
