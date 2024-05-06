import Link from "next/link"

interface MenuItem {
  id: number
  code: string
  name: string
  pageRole: number
  items: {
    id: number
    code: string
    name: string
    pageRole: number
    items: any[] //추후수정
  }
}

export default async function Header() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/frontmenu`)
  const menus: MenuItem[] = await res.json()
  return (
    <header className="">
      <div className="bg-sky-700 pt-4 pb-4 text-white">
        <div className="flex justify-between max-w-[1200px] m-auto">
          <p className="text-white text-lg font-semibold">
            관리사무소(09:00~18:00) : Tel 1600-3123
          </p>
          <div className="flex gap-2">
            <p>앱 다운로드</p>
            <p>마이페이지</p>
            <p>로그아웃</p>
          </div>
        </div>
      </div>
      <nav className="flex justify-between max-w-[1200px] m-auto">
        <div className="pt-4 pb-4">
          <Link
            href="/"
            className="text-zinc-900 text-2xl font-bold">
            로고
          </Link>
        </div>
        <ul className="flex gap-4 pt-4 pb-4">
          {menus.map(menu => (
            <li key={menu.id}>
              <Link
                href={`/${menu.code}`}
                className="text-zinc-900 text-2xl font-bold">
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
