"use client"

import { useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Link from "next/link"
import PopularTag from "../tag/PopularTag"
import Image from "next/image"
import imgIcon from "@/public/icon/img.svg"
import NewTag from "../tag/NewTag"
import Tab from "../tab/Tab"
import ShareMarketItem from "../ShareMarketItem"

type PostData = {
  id: number
  status: string
  isnew: boolean
  hits: string
  count_of_comments: string
  category: string
  category_name: string
  title: string
  content: string
  image_urls?: string[] | null
  price: string
  user_nickname: string
  created_at: string
  comment?: Comment[]
  hot: boolean
  new: boolean
}

export default function CommunitySection({
  freesData,
  marketsData,
  qnaData
}: {
  freesData: PostData[]
  marketsData: PostData[]
  qnaData: PostData[]
}) {
  const [activeTab, setActiveTab] = useState("frees")

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const tabsData = [
    { key: "frees", label: "자유게시판", type: "frees", data: freesData },
    { key: "markets", label: "나눔장터", type: "markets", data: marketsData },
    { key: "qna", label: "QnA", type: "qna", data: qnaData }
  ]

  return (
    <div className="w-3/5 max-w-[calc(60%-32px)]">
      <Link href={"/boards/frees?catid=0&page=1"}>
        <div className="h-14 flex justify-between items-center px-4 mb-6 border-b bg-grey_50 rounded-lg">
          <div className="flex gap-4 items-center">
            <span className="text-grey_900 text-2xl font-semibold leading-6">
              소통공간
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
      <Tab
        tabData={tabsData}
        activeTab={activeTab}
        width={"full"}
        handleTabChange={handleTabChange}
      />
      {activeTab === "frees" && (
        <div>
          {freesData && freesData.length > 0 ? (
            freesData.slice(0, 3).map(item => (
              <div
                key={item.id}
                className="flex px-2 py-4 border-b border-grey_200">
                <div className="flex items-center justify-center w-32 text-grey_300 text-center border-r border-grey_200 align-middle">
                  {item.category_name}
                </div>
                <Link
                  href={`/boards/frees/${item.id}`}
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
            ))
          ) : (
            <div className="px-2 py-4 text-center text-grey_900 text-lg font-medium leading-[30px]">
              등록된 게시물이 없습니다.
            </div>
          )}
          <div className="flex justify-end pt-4">
            <Link
              href={"/boards/frees?catid=0&page=1"}
              className="text-grey_300 underline">
              전체보기
            </Link>
          </div>
        </div>
      )}
      {activeTab === "markets" && (
        <div>
          {marketsData && marketsData.length > 0 ? (
            <Slider {...settings}>
              {marketsData.slice(0, 4).map(item => (
                <div
                  key={item.id}
                  className="flex px-2 py-4 border-b border-grey_200">
                  <Link href={`/boards/markets/${item.id}`}>
                    <ShareMarketItem
                      status={item.status}
                      category_name={item.category_name}
                      image_urls={item.image_urls}
                      title={item.title}
                      price={item.price}
                      user_nickname={item.user_nickname}
                      hits={item.hits}
                      created_at={item.created_at}
                      ishot={item.hot}
                      isnew={item.new}
                    />
                  </Link>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="px-2 py-4 text-center text-grey_900 text-lg font-medium leading-[30px]">
              등록된 게시물이 없습니다.
            </div>
          )}
          <div className="flex justify-end pt-4">
            <Link
              href={"/boards/markets?catid=0&page=1"}
              className="text-grey_300 underline">
              전체보기
            </Link>
          </div>
        </div>
      )}
      {activeTab === "qna" && (
        <div>
          {qnaData && qnaData.length > 0 ? (
            qnaData.slice(0, 3).map(item => (
              <div
                key={item.id}
                className="flex px-2 py-4 border-b border-grey_200">
                <div className="flex items-center justify-center w-32 text-grey_300 text-center border-r border-grey_200 align-middle">
                  {item.category_name}
                </div>
                <Link
                  href={`/boards/qna?catid=0&page=1`}
                  className="flex gap-2 px-2 truncate">
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
            ))
          ) : (
            <div className="px-2 py-4 text-center text-grey_900 text-lg font-medium leading-[30px]">
              등록된 게시물이 없습니다.
            </div>
          )}
          <div className="flex justify-end pt-4">
            <Link
              href={"/boards/qna?catid=0&page=1"}
              className="text-grey_300 underline">
              전체보기
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
