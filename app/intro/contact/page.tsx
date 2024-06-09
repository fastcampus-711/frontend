"use client"

import { useRouter } from "next/navigation"
import Tab from "@/components/tab/Tab"

export default function Page() {
  const router = useRouter()

  const handleTabChange = (tabKey: string) => {
    router.replace(`/intro/${tabKey}`)
  }

  const tabsData = [
    { key: "greetings", label: "인사말", type: "greetings" },
    { key: "view", label: "단지전경", type: "view" },
    { key: "contact", label: "연락처정보", type: "contact" },
    { key: "community", label: "커뮤니티시설", type: "community" }
  ]

  return (
    <div className="flex flex-col gap-10 max-w-[1200px] m-auto mb-48">
      <div className="py-8">
        <p className="text-grey_900 text-[32px] font-semibold">아파트소개</p>
      </div>
      <Tab
        tabData={tabsData}
        activeTab={"contact"}
        handleTabChange={handleTabChange}
      />
      <div>
        <table className="w-full border-t border-grey_900">
          <tbody>
            <tr className="bg-grey_50 text-grey_700 text-lg font-medium text-center">
              <td className="py-5">이름</td>
              <td className="py-5">번호</td>
            </tr>
            <tr className="text-grey_700 font-medium text-center border-t border-t-grey_900 border-b border-b-grey_200">
              <td className="py-5">관리사무소</td>
              <td className="py-5">0000-0000</td>
            </tr>
            <tr className="text-grey_700 font-medium text-center border-b border-b-grey_200">
              <td className="py-5">--구 의회</td>
              <td className="py-5">02-000-0000</td>
            </tr>
            <tr className="text-grey_700 font-medium text-center border-b border-b-grey_200">
              <td className="py-5">경로당</td>
              <td className="py-5">02-0000-0000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
