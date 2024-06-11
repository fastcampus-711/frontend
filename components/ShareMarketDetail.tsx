"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Pagination, Navigation } from "swiper/modules"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { setCurrentPost } from "@/redux/slices/postSlice"
import { useState } from "react"
import Image from "next/image"
import GoBackButton from "./button/GoBackButton"
import GreyButton from "./button/GreyButton"
import Comment from "./comment/Comment"
import CommentEdit from "./comment/CommentEdit"
import TxStateTag from "./tag/TxStateTag"
import TxTypeTag from "./tag/TxTypeTag"
import _Pagination from "./pagination/pagination"

import noImgImg from "@/public/img/no_img.png"
import TxstateDropDown from "./dropdown/TxstateDropDown"

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
}

type ResponseData = {
  id: number
  user_nickname: string
  category_id: number
  user_image: string
  category_name: string
  title: string
  issaled: string
  nickname: string
  date: string
  content: string
  image_urls?: string[]
  count_of_comments: string
  hits: number
  comment: CommentData[]
  created_at: string
  reaction_type: boolean | string
  status: string
  price: number
}

type ShareMarketDetailProps = {
  responseData: ResponseData
}

type Options = {
  value: string
  name: string
}

export default function ShareMarketDetail({
  responseData
}: ShareMarketDetailProps) {
  const {
    id,
    user_nickname,
    category_id,
    category_name,
    image_urls,
    title,
    content,
    user_image,
    issaled,
    hits,
    created_at,
    status,
    price,
    comment,
    count_of_comments
  } = responseData

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [comments, setComments] = useState<CommentData[]>()
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationData, setPaginationData] = useState<number[]>([])
  const [selectedType, setSelectedType] = useState<string>(status)
  const typeOptions: Options[] = [
    { value: "SALE", name: "판매중" },
    { value: "RESERVED", name: "예약중" },
    { value: "SOLD_OUT", name: "판매완료" }
  ]

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
      }
    } catch (error) {
      console.error("에러 발생:", error)
    }
  }

  const handleStatusChange = async (selectedType: string) => {
    if (confirm("상태를 변경하시겠습니까?")) {
      const updatedItem = {
        category_id: category_id,
        status: selectedType
      }
      console.log(updatedItem)
      setSelectedType(selectedType)
      try {
        const response = await fetch(
          `https://711.ha-ving.store/boards/markets/${id}`,
          {
            method: "PUT",
            body: JSON.stringify(updatedItem),
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS83OTI3MDIyOD92PTQiLCJwYXNzd29yZCI6IiQyYSQxMCRleHhmWXAveXZzNHpiY3cyRFNDalZlREFDaTVlcWZma01HaDlsVWwwTXFBRWRUM2h5WDVEeSIsInBob25lIjoiMDEwMTExMTIyMjIiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwibmlja25hbWUiOiJuaWNrbmFtZTEiLCJpZCI6MjEsInVzZXJuYW1lIjoidXNlciIsImF1dGgiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNzE3MDU5MjA5LCJleHAiOjE3MTk2NTEyMDl9.4bpxNGqYITfq2174mngAguJK3gQZ5gl7KzWB8N5eMQ4TV-e8_Ka7xlzCdGH8u6XEoiMywHZwJLM1_7tlAqtt0A"
            }
          }
        )
        if (response.ok) {
          const responseData = await response.json()
          console.log("상태 수정 성공:", responseData)
          router.refresh()
        } else {
          console.error("상태 수정을 실패했습니다.:", response.statusText)
        }
      } catch (error) {
        console.error("에러 발생:", error)
      }
    }
  }

  const handleDelete = async () => {
    if (confirm("게시글을 삭제하시겠습니까?")) {
      try {
        const response = await fetch(
          `https://711.ha-ving.store/boards/markets/${id}`,
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
          router.back()
        } else {
          console.error("삭제를 실패했습니다.:", response.statusText)
        }
      } catch (error) {
        console.error("에러 발생:", error)
      }
    }
  }

  const handleGoEdit = () => {
    dispatch(setCurrentPost(responseData))
    router.push(`/edit`)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div>
      <div className="flex gap-1 pb-6 text-grey_600 text-lg">
        <span>소통공간</span>
        <span>&gt;</span>
        <span className="text-grey_900">나눔장터</span>
      </div>
      <div className="flex flex-col gap-12 mb-40">
        <div className="flex flex-col gap-10 border-b-[1px] border-grey_50 ">
          <div className="flex flex-col gap-10 py-6 border-t-[1px] border-b-[1px] border-grey_50">
            <div className="flex justify-between">
              <GoBackButton label="목록" />
              <div className="flex gap-4">
                <GreyButton
                  label="수정"
                  onClick={handleGoEdit}
                />
                <GreyButton
                  label="삭제"
                  onClick={handleDelete}
                />
              </div>
            </div>
            <div className="flex gap-10 mb-20">
              <div className="w-[580px]">
                {/* <Image
                src={
                  "https://aptners.s3.ap-southeast-1.amazonaws.com/file/63c432c7-ac92-46bc-b95f-fbbf47c08d23.png"
                }
                alt="게시판이미지"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "580px", height: "auto" }} // optional
              /> */}
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
                        <div className="relative w-full h-[400px] bg-slate-200">
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
              <div className="flex flex-1 flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <TxTypeTag subcategory={category_name} />
                    {/* <TxStateTag issaled={status} /> */}
                    <TxstateDropDown
                      label="분류"
                      options={typeOptions}
                      event={value => handleStatusChange(value)}
                      initialValue={selectedType}
                    />
                  </div>
                  <div className="flex justify-between">
                    <p className="text-grey_900 text-xl font-semibold">
                      {title}
                    </p>
                  </div>
                  {category_name === "중고거래" && price ? (
                    <span className="text-grey_900 text-2xl font-semibold">
                      가격:{price.toLocaleString("ko-KR")}원
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 overflow-hidden rounded-3xl bg-slate-200">
                    <Image
                      src={user_image}
                      alt="유저이미지"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-grey_900 font-medium">
                      {user_nickname}
                    </span>
                    <div className="flex justify-between">
                      <span className="text-grey_300">조회 {hits}</span>
                      <span className="text-grey_300">{convertedDate}</span>
                    </div>
                  </div>
                </div>
                <p className="text-grey_900 text-lg font-medium">{content}</p>
              </div>
            </div>
          </div>
        </div>
        <CommentEdit
          type="댓글"
          id={id}
          count_of_comments={count_of_comments}
          fetchData={fetchData}
        />
        <div>
          {comments && comments.length > 0 ? (
            <>
              {comments.map(item => (
                <Comment
                  key={item.comment_id}
                  commentData={item}
                  fetchData={fetchData}
                />
              ))}
              <_Pagination
                paginationData={paginationData}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="flex justify-center items-center text-grey_250 text-lg font-medium">
              등록된 댓글이 없습니다.
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <GreyButton label="목록" />
        </div>
      </div>
    </div>
  )
}
