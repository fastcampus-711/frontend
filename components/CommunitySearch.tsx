"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"
import searchIcon from "@/public/icon/search.svg"
import Image from "next/image"

type CommunitySearchProps = {
  className?: string
  placeholder: string
  category: string
  catid: number
  page: number
}

export default function CommunitySearch({
  className,
  placeholder,
  category,
  catid,
  page
}: CommunitySearchProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const keyword = formData.get("keyword")

    console.log(keyword)
    console.log(category)
    router.push(`/boards/${category}?catid=${catid}&keyword=${keyword}&page=1`)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <div
      className={`flex items-center bg-grey_50 px-6 py-[5px] rounded-lg ${className}`}>
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
  )
}
