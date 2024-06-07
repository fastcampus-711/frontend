// import Link from "next/link"

// interface MenuItem {
//   id: number
//   code: string
//   name: string
//   pageRole: number
//   items: {
//     id: number
//     code: string
//     name: string
//     pageRole: number
//     items: any[] //추후수정
//   }
// }

// export default async function Header() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/frontmenu`)
//   const menus: MenuItem[] = await res.json()
//   return (
//     <header className="">
//       <div className="bg-sky-700 pt-4 pb-4 text-white">
//         <div className="flex justify-between max-w-[1200px] m-auto">
//           <p className="text-white text-lg font-semibold">
//             관리사무소(09:00~18:00) : Tel 1600-3123
//           </p>
//           <div className="flex gap-2">
//             <p>앱 다운로드</p>
//             <p>마이페이지</p>
//             <p>로그아웃</p>
//           </div>
//         </div>
//       </div>
//       <nav className="flex justify-between max-w-[1200px] m-auto">
//         <div className="pt-4 pb-4">
//           <Link
//             href="/"
//             className="text-zinc-900 text-2xl font-bold">
//             로고
//           </Link>
//         </div>
//         <ul className="flex gap-4 pt-4 pb-4">
//           {menus.map(menu => (
//             <li key={menu.id}>
//               <Link
//                 href={`/${menu.code}`}
//                 className="text-zinc-900 text-2xl font-bold">
//                 {menu.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </header>
//   )
// }
import Link from "next/link"
import Image from "next/image"
import logoMainImg from "@/public/img/logo_main.png"
import searchIcon from "@/public/icon/search.svg"

export default async function Header() {
  return (
    <header className="">
      <div className="bg-main_color pt-4 pb-4 text-white">
        <div className="flex justify-between max-w-[1200px] m-auto">
          <p className="text-white text-lg font-semibold">
            관리사무소(09:00~18:00) : Tel 1600-3123
          </p>
          {/* <div className="flex gap-6">
            <p>마이페이지</p>
            <p>로그아웃</p>
          </div> */}
          <div className="flex gap-6">
            <Link href="/user/join/terms">회원가입</Link>
            <Link href="/login">로그인</Link>
          </div>
        </div>
      </div>
      <nav className="flex gap-4 max-w-[1200px] m-auto">
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
        <ul className="flex gap-4 flex-1 justify-around items-center p-7">
          <li>
            <Link
              href={"/intro"}
              className="text-grey_900 text-lg font-semibold">
              아파트소개
            </Link>
          </li>
          <li>
            <Link
              href={"/boards/notices?catid=0&page=1"}
              className="text-grey_900 text-lg font-semibold">
              공지사항
            </Link>
          </li>
          <li>
            <Link
              href={"/disclosure"}
              className="text-grey_900 text-lg font-semibold">
              의무공개
            </Link>
          </li>
          <li>
            <Link
              href={"/boards/frees?catid=0&page=1"}
              className="text-grey_900 text-lg font-semibold">
              소통공간
            </Link>
          </li>
          <li>
            <Link
              href={"/complaints"}
              className="text-grey_900 text-lg font-semibold">
              민원게시판
            </Link>
          </li>
          <li>
            <Link
              href={"/myfee"}
              className="text-grey_900 text-lg font-semibold">
              관리비조회
            </Link>
          </li>
        </ul>
        <div className="flex justify-end items-center w-[124px]">
          <button className="flex gap-2 px-3 py-2 bg-[#A4E5E8] rounded-lg text-[#053A3C] font-medium">
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
    </header>
  )
}
