import { useEffect, useState, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { setCategory } from "@/redux/slices/categorySlice"
import PrimaryButton from "../button/PrimaryButton"
import DropDown from "../dropdown/DropDown"
import GoBackButton from "../button/GoBackButton"

type Options = {
  value: number
  name: string
}

export default function EditFrees() {
  const category = useSelector((state: any) => state.category)
  const dispatch = useDispatch<AppDispatch>()
  const [selectedBoard, setSelectedBoard] = useState<number>(0)

  const boardOptions: Options[] = [
    { value: 11, name: "자유게시판" },
    { value: 12, name: "나눔장터" },
    { value: 13, name: "QnA" }
  ]

  useEffect(() => {
    if (category.value === "frees") {
      setSelectedBoard(11)
    } else if (category.value === "markets") {
      setSelectedBoard(12)
    } else if (category.value === "qnas") {
      setSelectedBoard(13)
    }
  }, [category.value])

  const handleBoardChange = (value: number) => {
    setSelectedBoard(value)
    if (value === 11) {
      dispatch(setCategory("frees"))
    } else if (value === 12) {
      dispatch(setCategory("markets"))
    } else if (value === 13) {
      dispatch(setCategory("qnas"))
    }
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    // const issaled = "onsale"
    // const isnew = true
    // const category = formData.get("category")
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
      title: title,
      content: content,
      visible: visible
      // price: price,
      // nickname: nickname,
      // date: date
    }
    // const url = `http://localhost:3001/${category}`
    const url = `https://711.ha-ving.store/boards/${category.value}/`
    console.log(updatedItem)
    // try {
    //   const response = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(updatedItem)
    //   })

    //   if (response.ok) {
    //     const responseData = await response.json()
    //     console.log("게시물 등록 성공:", responseData)
    //   } else {
    //     console.error("게시물 등록을 실패했습니다.")
    //   }
    // } catch (error) {
    //   console.error("에러 발생:", error)
    // }
  }
  return (
    <div>
      <form onSubmit={handleUpdate}>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="w-32 text-grey_900 text-lg font-medium">분류</td>
              <td className="flex h-[88px] items-center">
                <DropDown
                  label="게시판"
                  options={boardOptions}
                  event={handleBoardChange}
                  initialValue={selectedBoard}
                />
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
        <button>테스트</button>
      </form>
      <div className="flex gap-2 justify-end">
        <GoBackButton label="목록" />
        <PrimaryButton
          label="등록하기"
          className="h-[44px] items-center leading-3"
        />
      </div>
    </div>
  )
}
