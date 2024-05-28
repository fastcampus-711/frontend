"use client"

import PrimaryButton from "@/components/button/PrimaryButton"
import DropDown from "@/components/dropdown/DropDown"
import { getToday } from "@/utils/todayUtil"
import { useEffect, useState, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setCategory } from "@/redux/slices/categorySlice"
import { AppDispatch } from "@/redux/store"

type Options = {
  value: number
  name: string
}

export default function Edit() {
  const category = useSelector((state: any) => state.category)
  const dispatch = useDispatch<AppDispatch>()
  const [selectedBoard, setSelectedBoard] = useState<number>(0)
  const [selectedType, setSelectedType] = useState<number>(0)
  const [typeOptions, setTypeOptions] = useState<Options[]>([])

  const boardOptions: Options[] = [
    { value: 11, name: "자유게시판" },
    { value: 12, name: "나눔장터" },
    { value: 13, name: "QnA" }
  ]

  const optionsA = useMemo(
    () => [
      { value: 1, name: "생활・편의" },
      { value: 2, name: "음식・카페" },
      { value: 3, name: "병원・약국" },
      { value: 4, name: "수리・시공" },
      { value: 5, name: "투자・부동산" },
      { value: 6, name: "교육・육아" },
      { value: 7, name: "아파트・동네소식" },
      { value: 8, name: "여행" },
      { value: 9, name: "살림정보" },
      { value: 10, name: "모임・동호회" },
      { value: 11, name: "기타" }
    ],
    []
  )

  const optionsB = useMemo(
    () => [
      { value: 999, name: "중고거래" },
      { value: 999, name: "무료나눔" }
    ],
    []
  )

  useEffect(() => {
    if (category.value === "frees") {
      setSelectedBoard(11)
    } else if (category.value === "markets") {
      setSelectedBoard(12)
    } else if (category.value === "qnas") {
      setSelectedBoard(13)
    }
  }, [category.value])

  useEffect(() => {
    if (selectedBoard === 11) {
      setTypeOptions(optionsA)
    } else if (selectedBoard === 12) {
      setTypeOptions(optionsB)
    } else {
      setTypeOptions([])
    }
  }, [selectedBoard, optionsA, optionsB])

  const handleBoardChange = (value: number) => {
    setSelectedBoard(value)
    setSelectedType(0)
    if (value === 11) {
      dispatch(setCategory("frees"))
    } else if (value === 12) {
      dispatch(setCategory("markets"))
    } else if (value === 13) {
      dispatch(setCategory("qnas"))
    }
  }

  const handleTypeChange = (value: number) => {
    setSelectedType(value)
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    // const issaled = "onsale"
    // const isnew = true
    // const category = formData.get("category")
    const category_id = selectedType
    const title = formData.get("title")
    const content = formData.get("content")
    const visible = true
    // const price = formData.get("price")
    // const nickname = "userNickname"
    // const date = getToday()
    const updatedItem = {
      // issaled: issaled,
      // isnew: isnew,
      // category: category,
      category_id: category_id,
      title: title,
      content: content,
      visible: visible
      // price: price,
      // nickname: nickname,
      // date: date
    }
    // const url = `http://localhost:3001/${category}`
    const url = `https://711.ha-ving.store/boards/${category.value}`
    console.log(updatedItem)
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
                    {selectedBoard !== 13 && (
                      <DropDown
                        label="타입"
                        options={typeOptions}
                        event={handleTypeChange}
                      />
                    )}
                  </div>
                  {selectedBoard === 12 && (
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
