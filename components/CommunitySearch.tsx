"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import searchIcon from "@/public/icon/search.svg"
import Image from "next/image"

type CommunitySearchProps = {
  className?: string
  placeholder: string
  category: string
  catid: number
  status?: string
  page: number
}

export default function CommunitySearch({
  className,
  placeholder,
  category,
  catid,
  status,
  page
}: CommunitySearchProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    let keyword = formData.get("keyword") as string
    keyword = keyword.trim()

    if (keyword === "" || keyword.startsWith(" ")) {
      setErrorMessage("첫 글자에 공백 없이 최소 1글자 이상 입력해주세요.")
      return
    }

    setErrorMessage("")

    if (category === "markets") {
      if (
        keyword !== undefined &&
        (status === undefined || status === "ALL" || status === "")
      ) {
        router.push(
          `/boards/${category}?catid=${catid}&keyword=${keyword}&page=1`
        )
      } else {
        router.push(
          `/boards/${category}?catid=${catid}&keyword=${keyword}&status=${status}&page=1`
        )
      }
    } else if (category === "frees") {
      router.push(
        `/boards/${category}?catid=${catid}&keyword=${keyword}&page=1`
      )
    } else if (category === "qna") {
      if (
        keyword !== undefined &&
        (status === undefined || status === "ALL" || status === "")
      ) {
        router.push(
          `/boards/${category}?catid=${catid}&keyword=${keyword}&page=1`
        )
      } else {
        router.push(
          `/boards/${category}?catid=${catid}&keyword=${keyword}&status=${status}&page=1`
        )
      }
    } else if (category === "all") {
      if (
        keyword !== undefined &&
        (status === undefined || status === "ALL" || status === "")
      ) {
        router.push(
          `/complains/${category}?catid=${catid}&keyword=${keyword}&page=1`
        )
      } else {
        router.push(
          `/complains/${category}?catid=${catid}&keyword=${keyword}&status=${status}&page=1`
        )
      }
    } else if (category === "my") {
      if (
        keyword !== undefined &&
        (status === undefined || status === "ALL" || status === "")
      ) {
        router.push(
          `/complains/${category}?catid=${catid}&keyword=${keyword}&page=1`
        )
      } else {
        router.push(
          `/complains/${category}?catid=${catid}&keyword=${keyword}&status=${status}&page=1`
        )
      }
    }
  }

  const handleInputClick = () => {
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col gap-1 w-[540px] ">
      <div
        className={`flex items-center w-full bg-grey_50 px-6 py-[5px] h-[50px] rounded-lg ${className}`}>
        <form
          onSubmit={handleSearch}
          className="flex flex-1 justify-between">
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            name="keyword"
            className="flex-1 bg-transparent"
            autoComplete="off"
            onClick={handleInputClick}
          />
          <button type="submit">
            <Image
              src={searchIcon.src}
              alt="검색아이콘"
              width={24}
              height={24}
            />
          </button>
        </form>
      </div>
      {errorMessage && <p className="text-red-600 w-full">{errorMessage}</p>}
    </div>
  )
}
