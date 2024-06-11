import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { setCurrentPost } from "@/redux/slices/postSlice"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Pagination, Navigation } from "swiper/modules"
import SeeMoreButton from "./button/SeeMoreButton"
import CommentEdit from "./comment/CommentEdit"
import AnswerStateTag from "./tag/AnswerStateTag"
import Image from "next/image"

import noImgImg from "@/public/img/no_img.png"
import GreyButton from "./button/GreyButton"
import BlackButton from "./button/BlackButton"

import ansDefaultIcon from "@/public/icon/ans_default.svg"
import ansChoiceIcon from "@/public/icon/ans_choice.svg"

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

type CommentData = {
  comment_id: number
  created_at: string
  user_image: string
  user_nickname: string
  content: string
  child_comments: ChildComment[]
  post_id: number
  reaction_columns: Reactions | null
  reaction_type: string | null
  top: boolean
}

type Post = {
  id: number
  user_image: string
  status: string
  isnew: boolean
  title: string
  image_urls?: string[] | null
  content: string
  created_at: string
  user_nickname: string
  count_of_comments: string
  category_name: string
  item: Post
}

type QnaItemProps = {
  id: number
  status: string
  isnew: boolean
  user_image: string
  title: string | React.ReactNode
  content: string
  image_urls?: string[] | null
  user_nickname: string
  created_at: string
  count_of_comments: string
  item: Post
}

export default function QnaItem({
  id,
  status,
  user_image,
  isnew,
  image_urls,
  title,
  content,
  user_nickname,
  created_at,
  count_of_comments,
  item
}: QnaItemProps) {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [comments, setComments] = useState<CommentData[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationData, setPaginationData] = useState<number[]>([])
  const [showAllComments, setShowAllComments] = useState(false)
  const [commentContents, setCommentContents] = useState<string[]>(
    comments.map(comment => comment.content)
  )
  const [showModifyList, setShowModifyList] = useState<boolean[]>(
    comments.map(() => false)
  )
  const [answerStatus, setAnswerStatus] = useState<string>(status)

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

  const handleSeeMoreClick = () => {
    setShowAllComments(true)
  }

  const commentsToShow = showAllComments ? comments : comments?.slice(0, 3)

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://711.ha-ving.store/boards/${id}/comments?limit=10&page=${currentPage}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS83OTI3MDIyOD92PTQiLCJwYXNzd29yZCI6IiQyYSQxMCRleHhmWXAveXZzNHpiY3cyRFNDalZlREFDaTVlcWZma01HaDlsVWwwTXFBRWRUM2h5WDVEeSIsInBob25lIjoiMDEwMTExMTIyMjIiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwibmlja25hbWUiOiJuaWNrbmFtZTEiLCJpZCI6MjEsInVzZXJuYW1lIjoidXNlciIsImF1dGgiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNzE3MDU5MjA5LCJleHAiOjE3MTk2NTEyMDl9.4bpxNGqYITfq2174mngAguJK3gQZ5gl7KzWB8N5eMQ4TV-e8_Ka7xlzCdGH8u6XEoiMywHZwJLM1_7tlAqtt0A"
          },
          cache: "no-store"
        }
      )
      if (response.ok) {
        const responseData = await response.json()
        setPaginationData(responseData.data.pagination_bar_number)
        setComments(responseData.data.posts.content)
        console.log(responseData)
        console.log(responseData.data.posts.content)
        console.log(comments)
      }
    } catch (error) {
      console.error("에러 발생:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [currentPage])

  const handleUpdate = async (comment_id: number, index: number) => {
    const url = `https://711.ha-ving.store/boards/${id}/comments/${comment_id}`
    const data = {
      content: commentContents[index]
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
        console.log("댓글 수정 성공:", responseData)
        fetchData() // 수정된 댓글을 다시 불러옵니다.
        const newShowModifyList = [...showModifyList]
        newShowModifyList[index] = false
        setShowModifyList(newShowModifyList)
      } else {
        console.error("댓글 수정을 실패했습니다.:", response.statusText)
      }
    } catch (error) {
      console.error("에러 발생:", error)
    }
  }

  const handleCommentDelete = async (comment_id: number, top: boolean) => {
    if (top === true) {
      alert("채택된 답변은 삭제할 수 없습니다.")
      return
    }

    try {
      const response = await fetch(
        `https://711.ha-ving.store/boards/${id}/comments/${comment_id}`,
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
        console.log("댓글 삭제 성공")
        fetchData()
      } else {
        console.error("댓글 삭제를 실패했습니다.:", response.statusText)
      }
    } catch (error) {
      console.error("에러 발생:", error)
    }
  }

  const handleDelete = async () => {
    if (status === "RESPONSE_ACCEPTED") {
      alert("답변을 채택한 글은 삭제할 수 없습니다.")
      return
    }

    if (confirm("게시글을 삭제하시겠습니까?")) {
      try {
        const response = await fetch(
          `https://711.ha-ving.store/boards/qna/${id}`,
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
          router.refresh()
        } else {
          console.error("삭제를 실패했습니다.:", response.statusText)
        }
      } catch (error) {
        console.error("에러 발생:", error)
      }
    }
  }

  const handleAnswer = async (comment_id: number) => {
    if (status === "RESPONSE_ACCEPTED") {
      alert("이미 답변이 채택되었습니다.")
      return
    }
    if (confirm("선택한 답변을 채택하시겠습니까?")) {
      const data = {
        post_id: id,
        comment_id: comment_id,
        status: "RESPONSE_ACCEPTED"
      }
      console.log(data)
      try {
        const response = await fetch(
          `https://711.ha-ving.store/boards/qna/status`,
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
          console.log("답변 채택 성공:", responseData)
          setAnswerStatus(responseData.data.status)
          fetchData()
          router.refresh()
        } else {
          console.error("답변 채택을 실패했습니다.:", response.statusText)
        }
      } catch (error) {
        console.error("에러 발생:", error)
      }
    }
  }

  const handleGoEdit = () => {
    if (status === "RESPONSE_ACCEPTED") {
      alert("답변을 채택한 글은 수정할 수 없습니다.")
      return
    }
    dispatch(setCurrentPost(item))
    router.push(`/edit`)
  }

  return (
    <div className="border border-grey_200 rounded-lg mb-10">
      <div className="flex justify-between items-center px-10 py-4 border-b border-grey_50">
        <div className="flex gap-4 items-center">
          <AnswerStateTag status={answerStatus} />
          <p className="text-grey_900 text-lg font-medium">{title}</p>
        </div>
        <div className="flex gap-4">
          <button
            className="text-grey_600 font-medium"
            onClick={handleGoEdit}>
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
      <div>
        <div className="flex gap-10 px-10 py-6 border-b border-grey_50">
          <div className="w-[540px]">
            {image_urls && image_urls.length > 0 ? (
              <Swiper
                pagination={{
                  type: "fraction"
                }}
                loop={true}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="w-full">
                {image_urls.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-[382px] bg-slate-200">
                      <Image
                        src={item}
                        alt="게시판이미지"
                        fill
                        style={{ objectFit: "cover" }}
                        className="blur-lg"
                      />
                      <Image
                        src={item}
                        alt="게시판이미지"
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Image
                src={noImgImg.src}
                width={0}
                alt="이미지없음"
                height={0}
                sizes="100vw"
                style={{ width: "580px", height: "auto" }}
              />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 overflow-hidden rounded-3xl bg-slate-200">
                <Image
                  src={user_image}
                  alt="유저이미지"
                  width={40}
                  height={40}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-grey_900 font-medium">
                  {user_nickname}
                </span>
                <span className="text-grey_250">{convertedDate}</span>
              </div>
            </div>
            <p className="text-grey_700 text-xl font-medium">{content}</p>
          </div>
        </div>
      </div>
      <div className="px-10 py-6">
        {comments.length < 7 && (
          <CommentEdit
            type="답변"
            id={id}
            count_of_comments={count_of_comments}
            fetchData={fetchData}
          />
        )}
        {comments.length === 0 && (
          <div className="flex justify-center items-center text-grey_250 text-lg font-medium">
            등록된 답변이 없습니다.
          </div>
        )}
        {comments.length >= 7 && (
          <div className="flex justify-center items-center text-center bg-grey_100 w-full h-40 text-grey_250 text-lg font-medium border border-grey_200 p-4">
            답변 가능 개수(7개)를 초과했습니다. <br />이 질문에는 더 이상 답변을
            추가할 수 없습니다.
          </div>
        )}
      </div>
      {commentsToShow &&
        commentsToShow.map((item, index) => (
          <div
            key={item.comment_id}
            className="px-10 py-6 border-t border-grey_200">
            <div className="flex gap-4">
              <button className="flex items-start">
                <div>
                  {item.top ? (
                    <Image
                      src={ansChoiceIcon.src}
                      alt="답변채택"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <Image
                      src={ansDefaultIcon.src}
                      alt="답변기본"
                      width={32}
                      height={32}
                      onClick={() => handleAnswer(item.comment_id)}
                    />
                  )}
                </div>
              </button>
              <div className="w-10 h-10 overflow-hidden rounded-3xl bg-slate-200">
                <Image
                  src={item.user_image}
                  alt="유저이미지"
                  width={40}
                  height={40}
                />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <span className="text-grey_900 font-medium">
                      {item.user_nickname}
                    </span>
                    <div className="flex gap-4">
                      <button
                        className="text-grey_600 font-medium"
                        onClick={() => {
                          const newShowModifyList = [...showModifyList]
                          newShowModifyList[index] = !newShowModifyList[index]
                          setCommentContents(prevState => {
                            const newCommentContents = [...prevState]
                            newCommentContents[index] = item.content // 기본값으로 댓글 내용 설정
                            return newCommentContents
                          })
                          setShowModifyList(newShowModifyList)
                        }}>
                        {showModifyList[index] ? "취소" : "수정"}
                      </button>
                      <button
                        className="text-grey_600 font-medium"
                        onClick={() =>
                          handleCommentDelete(item.comment_id, item.top)
                        }>
                        삭제
                      </button>
                      <button className="text-point_1 font-medium">신고</button>
                    </div>
                  </div>
                  <span className="text-grey_400 text-sm font-medium">
                    {convertDate(item.created_at)}
                  </span>
                  {showModifyList[index] ? (
                    <div>
                      <textarea
                        maxLength={150}
                        placeholder="댓글을 입력해주세요 (최대 150자)"
                        className="w-full h-40 border border-grey_300 p-4"
                        value={commentContents[index]}
                        onChange={e => {
                          const newCommentContents = [...commentContents]
                          newCommentContents[index] = e.target.value
                          setCommentContents(newCommentContents)
                        }}
                      />
                      <div className="flex justify-end gap-2">
                        <GreyButton
                          label="취소"
                          onClick={() => {
                            const newShowModifyList = [...showModifyList]
                            newShowModifyList[index] = false
                            setShowModifyList(newShowModifyList)
                          }}
                        />
                        <BlackButton
                          label="등록"
                          onClick={() => {
                            handleUpdate(item.comment_id, index)
                            setShowModifyList(prevState => {
                              const newShowModifyList = [...prevState]
                              newShowModifyList[index] = false
                              return newShowModifyList
                            })
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-grey_900 text-lg font-medium">
                      {item.content}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      {comments && comments.length > 3 && !showAllComments && (
        <div className="flex justify-center items-center py-6 border-t border-grey_200">
          <SeeMoreButton onClick={handleSeeMoreClick} />
        </div>
      )}
    </div>
  )
}
