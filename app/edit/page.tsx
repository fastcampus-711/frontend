"use client"

import PrimaryButton from "@/components/button/PrimaryButton"
import DropDown from "@/components/dropdown/DropDown"
import { getToday } from "@/utils/todayUtil"
import { useEffect, useState, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setCategory } from "@/redux/slices/categorySlice"
import { AppDispatch } from "@/redux/store"

type Options = {
  value: string
  name: string
}

export default function Edit() {
  const category = useSelector((state: any) => state.category)
  const dispatch = useDispatch<AppDispatch>()
  const [selectedBoard, setSelectedBoard] = useState<string>("")
  const [selectedType, setSelectedType] = useState<string>("")
  const [typeOptions, setTypeOptions] = useState<Options[]>([])

  const boardOptions: Options[] = [
    { value: "자유게시판", name: "자유게시판" },
    { value: "나눔장터", name: "나눔장터" },
    { value: "qna", name: "QnA" }
  ]

  const optionsA = useMemo(
    () => [
      { value: "취미・운동", name: "취미・운동" },
      { value: "생활・편의", name: "생활・편의" },
      { value: "음식・카페", name: "음식・카페" },
      { value: "병원・약국", name: "병원・약국" },
      { value: "수리・시공", name: "수리・시공" },
      { value: "투자・부동산", name: "투자・부동산" },
      { value: "교육・육아", name: "교육・육아" },
      { value: "아파트・동네소식", name: "아파트・동네소식" },
      { value: "여행", name: "여행" },
      { value: "살림정보", name: "살림정보" },
      { value: "모임・동호회", name: "모임・동호회" },
      { value: "기타", name: "기타" }
    ],
    []
  )

  const optionsB = useMemo(
    () => [
      { value: "중고거래", name: "중고거래" },
      { value: "무료나눔", name: "무료나눔" }
    ],
    []
  )

  useEffect(() => {
    if (category.value === "frees") {
      setSelectedBoard("자유게시판")
    } else if (category.value === "markets") {
      setSelectedBoard("나눔장터")
    } else if (category.value === "qnas") {
      setSelectedBoard("qna")
    }
  }, [category.value])

  useEffect(() => {
    if (selectedBoard === "자유게시판") {
      setTypeOptions(optionsA)
    } else if (selectedBoard === "나눔장터") {
      setTypeOptions(optionsB)
    } else {
      setTypeOptions([])
    }
  }, [selectedBoard, optionsA, optionsB])

  const handleBoardChange = (value: string) => {
    setSelectedBoard(value)
    setSelectedType("")
    if (value === "자유게시판") {
      dispatch(setCategory("frees"))
    } else if (value === "나눔장터") {
      dispatch(setCategory("markets"))
    } else if (value === "qna") {
      dispatch(setCategory("qnas"))
    }
  }

  const handleTypeChange = (value: string) => {
    setSelectedType(value)
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const issaled = "onsale"
    const isnew = true
    const category = formData.get("category")
    const subcategory = formData.get("subcategory")
    const title = formData.get("title")
    const content = formData.get("content")
    const price = formData.get("price")
    const nickname = "userNickname"
    const date = getToday()
    const updatedItem = {
      issaled: issaled,
      isnew: isnew,
      category: category,
      subcategory: subcategory,
      title: title,
      content: content,
      price: price,
      nickname: nickname,
      date: date
    }
    const url = `http://localhost:3001/${category}`
    // const url = `https://711.ha-ving.store/boards/${category}`
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedItem)
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log("게시물 등록 성공:", responseData)
      } else {
        console.error("게시물 등록을 실패했습니다.")
      }
    } catch (error) {
      console.error("에러 발생:", error)
    }
  }
  return (
    <div className="max-w-[1200px] m-auto mb-40">
      <div className="flex flex-col gap-10">
        <div className="flex gap-4 items-center border-b border-grey_200 pt-8 pb-4">
          <p className="text-grey_900 text-[32px] font-semibold">소통공간</p>
          <div className="w-[1px] h-8 border-r border-grey_250"></div>
          <p className="text-grey_700 text-2xl font-medium">
            게시글 작성 페이지
          </p>
        </div>
        <form onSubmit={handleUpdate}>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="w-32 text-grey_900 text-lg font-medium">분류</td>
                <td className="flex h-[88px] items-center">
                  <div className="flex flex-1 gap-4">
                    <DropDown
                      label="게시판"
                      options={boardOptions}
                      event={handleBoardChange}
                      initialValue={selectedBoard}
                    />
                    {selectedBoard !== "qna" && (
                      <DropDown
                        label="타입"
                        options={typeOptions}
                        event={handleTypeChange}
                      />
                    )}
                  </div>
                  {selectedBoard === "나눔장터" && (
                    <tr>
                      <td className="w-24 text-justify break-all text-grey_900 text-lg font-medium px-4 before:content-[''] before:inline-block before:w-full after:content-[''] after:inline-block after:w-full">
                        가 격
                      </td>
                      <td>
                        <input
                          type="text"
                          name="price"
                          placeholder="거래할 물품의 금액을 입력하세요"
                          className="w-[280px] h-12 p-2 border rounded-lg"
                        />
                        원
                      </td>
                    </tr>
                  )}
                </td>
              </tr>
              <tr>
                <td className="text-grey_900 text-lg font-medium">제목</td>
                <td className="py-4">
                  <textarea
                    name="title"
                    placeholder="제목을 입력해주세요 (최대 100자)"
                    maxLength={100}
                    className="w-full h-20 bg-grey_50 p-4 rounded-xl"
                  />
                </td>
              </tr>
              <tr>
                <td className="text-grey_900 text-lg font-medium">내용</td>
                <td className="py-4">
                  <textarea
                    name="content"
                    placeholder="내용을 입력해주세요 (최대 150자)"
                    maxLength={150}
                    className="w-full h-40 bg-grey_50 p-4 rounded-xl"
                  />
                </td>
              </tr>
              <tr>
                <td className="text-grey_900 text-lg font-medium">첨부파일</td>
                <td className="py-4">
                  <input type="file" />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex gap-2 justify-end">
            <PrimaryButton
              label="취소하기"
              className="h-[44px] items-center leading-3"
            />
            <PrimaryButton
              label="등록하기"
              className="h-[44px] items-center leading-3"
            />
          </div>
        </form>
      </div>
    </div>
  )
}
