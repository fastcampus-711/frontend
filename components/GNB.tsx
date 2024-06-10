"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function GNB() {
  const menuItems = [
    {
      title: "아파트소개",
      subItems: [
        { title: "인사말", href: "/intro/greetings" },
        { title: "단지전경", href: "/intro/view" },
        { title: "연락처정보", href: "/intro/contact" },
        { title: "커뮤니티시설", href: "/intro/community" }
      ]
    },
    {
      title: "공지사항",
      subItems: [
        { title: "공지사항", href: "/boards/notices?catid=0&page=1" },
        { title: "일정표", href: "#" }
      ]
    },
    {
      title: "의무공개",
      subItems: [
        { title: "관리비", href: "/disclosure" },
        { title: "계약서", href: "/disclosure" },
        { title: "관리규약", href: "/disclosure" },
        { title: "장기수선충당금", href: "/disclosure" },
        { title: "안전관리계획", href: "/disclosure" },
        { title: "입찰정보", href: "/disclosure" }
      ]
    },
    {
      title: "소통공간",
      subItems: [
        { title: "자유게시판", href: "/boards/frees?catid=0&page=1" },
        { title: "나눔장터", href: "/boards/markets?catid=0&page=1" },
        { title: "QnA", href: "/boards/qna?catid=0&page=1" }
      ]
    },
    {
      title: "민원게시판",
      subItems: [
        { title: "전체민원", href: "/complaints" },
        { title: "나의민원", href: "/complaints" }
      ]
    },
    {
      title: "관리비조회",
      subItems: [
        {
          title: "우리집관리비",
          href: `/fee/my?year=${new Date().getFullYear()}&month=${new Date().getMonth()}`
        },
        {
          title: "관리비상세보기",
          href: `/fee/detail?year=${new Date().getFullYear()}&month=${new Date().getMonth()}`
        }
      ]
    }
  ]
  const [state, setState] = useState(false)
  useEffect(() => {
    const header = document.querySelector("header")
    const nav = document.getElementById("nav")

    const handleMouseEnter = () => {
      setState(true)
    }
    const handleMouseLeave = () => {
      setState(false)
    }

    if (header && nav) {
      nav.onmouseenter = handleMouseEnter
      header.onmouseleave = handleMouseLeave
    }
  }, [])

  return (
    <div
      className={`${state ? "visible" : "invisible"} z-10 absolute w-full bg-grey_50 shadow-xl`}>
      <div className="flex px-4 max-w-[1200px] m-auto">
        <span className="w-[124px]"></span>
        <div className="flex px-4 flex-1 justify-center">
          {menuItems.map((item, index) => (
            <ul
              key={`${item}_${index}`}
              className="w-[140px] text-center">
              {item.subItems.map((subItem, subIndex) => (
                <li
                  key={`${subItem}_${subIndex}`}
                  className="py-3.5 hover:bg-main_color hover:text-white whitespace-nowrap">
                  <Link href={subItem.href}>{subItem.title}</Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <span className="w-[124px]"></span>
      </div>
    </div>
  )
}
