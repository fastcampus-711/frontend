"use client"

import { getToday } from "@/utils/todayUtil"
import { useEffect, useState } from "react"

export default function Edit() {
  const [subcategoryOptions, setSubcategoryOptions] = useState([])

  const handleCategoryChange = e => {
    const category = e.target.value
    if (category === "freeboard") {
      setSubcategoryOptions([
        { value: "edu", label: "교육・육아" },
        { value: "hobby", label: "취미・운동" },
        { value: "life", label: "생활・편의" },
        { value: "food", label: "음식・카페" },
        { value: "hospital", label: "병원・약국" },
        { value: "fix", label: "수리・시공" },
        { value: "invest", label: "투자・부동산" },
        { value: "apart", label: "아파트・동네소식" },
        { value: "travel", label: "여행" },
        { value: "info", label: "살림정보" },
        { value: "circle", label: "모임・동호회" },
        { value: "etc", label: "기타" }
      ])
    } else if (category === "sharemarket") {
      setSubcategoryOptions([
        { value: "used", label: "중고거래" },
        { value: "share", label: "무료나눔" }
      ])
    } else {
      // qna일 때는 서브카테고리를 비움
      setSubcategoryOptions([])
    }
  }

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 자유게시판 카테고리에 해당하는 서브카테고리 설정
    handleCategoryChange({ target: { value: "freeboard" } })
  }, []) // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 함

  const handleUpdate = async e => {
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
      } else {
        console.error("게시물 등록을 실패했습니다.")
      }
    } catch (error) {
      console.error("에러 발생:", error)
    }
  }
  return (
    <>
      <h1>게시글 작성 페이지</h1>
      <form onSubmit={handleUpdate}>
        <select
          name="category"
          defaultValue={"freeboard"}
          onChange={handleCategoryChange}>
          <option value="freeboard">자유게시판</option>
          <option value="sharemarket">나눔장터</option>
          <option value="qna">qna</option>
        </select>
        <select
          name="subcategory"
          defaultValue={""}>
          {subcategoryOptions.map(option => (
            <option
              key={option.value}
              value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="title"
          placeholder="제목"
        />
        <textarea
          placeholder="본문 입력"
          name="content"
        />
        <input
          type="text"
          name="price"
          placeholder="금액"
        />
        <input type="file" />
        <button>취소</button>
        <button type="submit">등록</button>
      </form>
    </>
  )
}
