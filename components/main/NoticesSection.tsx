"use client"

import Link from "next/link"
import { useState } from "react"
import PopularTag from "../tag/PopularTag"
import Image from "next/image"
import imgIcon from "@/public/icon/img.svg"
import NewTag from "../tag/NewTag"

type NoticesData = {
  id: number
  user_id: number
  user_nickname: string
  user_image: string
  category_name: string
  title: string
  content: string
  image_urls: string[] | null
  visible: boolean
  reaction_columns: {
    count_reaction_type_good: number
    count_reaction_type_bad: number
  } | null
  count_of_comments: number
  hits: number
  comments: any
  created_by: string
  created_at: string
  modified_by: string | null
  modified_at: string | null
  reaction_type: string | null
  board_group: string
  category_id: number
  schedule_start_at: string | null
  schedule_end_at: string | null
  post_at: string | null
  import: boolean
  duty: boolean
  owner: boolean
  hot: boolean
  new: boolean
}

export default function NoticesSection({
  noticesData
}: {
  noticesData: NoticesData[]
}) {
  return (
    <div className="w-2/5">
      <Link href={"/boards/notices?catid=0&page=1"}>
        <div className="h-14 flex justify-between items-center px-4 mb-6 border-b bg-grey_50 rounded-lg">
          <div className="flex gap-4 items-center">
            <span className="text-grey_900 text-2xl font-semibold leading-6">
              공지사항
            </span>
          </div>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 8L20 16L12 24"
              stroke="#656565"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Link>
      <div>
        {noticesData.slice(0, 5).map(item => (
          <div
            key={item.id}
            className="flex px-2 py-4 border-b border-grey_200">
            <div className="flex items-center justify-center w-32 text-grey_300 text-center border-r border-grey_200 align-middle">
              {item.category_name}
            </div>
            <Link
              href={`/boards/notices/${item.id}`}
              className="flex gap-2 px-2">
              {item.hot ? <PopularTag /> : ""}
              <p className="flex-1 text-grey_900 text-lg font-medium leading-[30px] truncate">
                {item.title}
              </p>
            </Link>
            <div className="inline-flex">
              <span>
                {item.image_urls && item.image_urls.length > 0 ? (
                  <Image
                    src={imgIcon.src}
                    alt="이미지아이콘"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "24px", height: "auto" }}
                  />
                ) : (
                  ""
                )}
              </span>
              <span className="mx-[2px] text-[#FF5151]">
                [{item.count_of_comments}]
              </span>
              <span>{item.new ? <NewTag /> : ""}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
