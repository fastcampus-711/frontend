"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import logoMainImg from "@/public/img/logo_main.png"
import searchIcon from "@/public/icon/search.svg"
import GNB from "./GNB"
import { useState } from "react"
import IntegratedSearchModal from "./modal/IntegratedSearchModal"

export default function Header() {
  const [search, IsSearch] = useState(false)

  const handleOpenModal = () => {
    IsSearch(true)
  }
  const handleCloseModal = () => {
    IsSearch(false)
  }

  return (
    <header className="">
      <div className="bg-main_color pt-4 pb-4 text-white">
        <div className="flex justify-between max-w-[1200px] m-auto">
          <p className="text-white text-lg font-semibold">
            관리사무소(09:00~18:00) : Tel 1600-3123
          </p>
          <div className="flex gap-6">
            <Link
              className="flex items-center"
              href="/user/join/terms">
              마이페이지
            </Link>
            <Link
              className="flex items-center"
              href="#">
              로그아웃
            </Link>
          </div>
        </div>
      </div>
      <nav
        id="nav"
        className="flex max-w-[1200px] m-auto">
        <div className="flex items-center pt-4 pb-4 ">
          <Link
            href="/"
            className="text-grey_900 text-lg font-semibold">
            <Image
              src={logoMainImg.src}
              alt="메인로고"
              width={124}
              height={22}
            />
          </Link>
        </div>
        <ul className="flex flex-1 w-[920px] justify-center items-center p-7">
          <li className="w-[140px] flex justify-center">
            <Link
              href={"/intro/greetings"}
              className="text-grey_900 text-lg font-semibold">
              아파트소개
            </Link>
          </li>
          <li className="w-[140px] flex justify-center">
            <Link
              href={"/boards/notices?catid=0&page=1"}
              className="text-grey_900 text-lg font-semibold">
              공지사항
            </Link>
          </li>
          <li className="w-[140px] flex justify-center">
            <Link
              href={"/disclosure"}
              className="text-grey_900 text-lg font-semibold">
              의무공개
            </Link>
          </li>
          <li className="w-[140px] flex justify-center">
            <Link
              href={"/boards/frees?catid=0&page=1"}
              className="text-grey_900 text-lg font-semibold">
              소통공간
            </Link>
          </li>
          <li className="w-[140px] flex justify-center">
            <Link
              href={"/complains/all?catid=0&page=1"}
              className="text-grey_900 text-lg font-semibold">
              민원게시판
            </Link>
          </li>
          <li className="w-[140px] flex justify-center">
            <Link
              href={`/fee/my?year=${new Date().getFullYear()}&month=${new Date().getMonth()}`}
              className="text-grey_900 text-lg font-semibold">
              관리비조회
            </Link>
          </li>
        </ul>
        <div className="flex justify-end items-center w-[124px]">
          <button
            className="flex gap-2 px-3 py-2 bg-[#A4E5E8] rounded-lg text-[#053A3C] font-medium"
            onClick={() => {
              IsSearch(true)
            }}>
            <Image
              src={searchIcon.src}
              alt="검색아이콘"
              width={24}
              height={24}
            />
            통합검색
          </button>
        </div>
      </nav>
      <GNB />
      <IntegratedSearchModal
        isOpen={search}
        onClose={handleCloseModal}
        content={true}
      />
    </header>
  )
}
