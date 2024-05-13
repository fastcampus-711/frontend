"use client"

import { useRouter } from "next/navigation"

type CommunitySearchProps = {
  category: string
}

export default function CommunitySearch({ category }: CommunitySearchProps) {
  const router = useRouter()
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const title = formData.get("title")
    console.log(title)
    console.log(category)
    router.push(`/community/${category}?title=${title}`)
  }
  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="검색"
        name="title"
      />
      <button type="submit">검색</button>
    </form>
  )
}
