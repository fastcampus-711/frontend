"use client"

import { useRouter } from "next/navigation"
import Tab from "@/components/tab/Tab"
import Image from "next/image"
import heroViewImg from "@/public/img/hero_view.png"
import aerialViewImg from "@/public/img/aerial_view.png"
import patchViewImg from "@/public/img/patch_view.png"
import gardenViewImg from "@/public/img/garden_view.png"
import squareViewImg from "@/public/img/square_view.png"
import decoInroImg from "@/public/img/deco_intro.png"

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
    <div className="flex flex-col gap-10 max-w-[1200px] m-auto">
      <div className="py-8">
        <p className="text-grey_900 text-[32px] font-semibold">아파트소개</p>
      </div>
      <Tab
        tabData={tabsData}
        activeTab={"view"}
        handleTabChange={handleTabChange}
      />
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4 items-center">
          <span className="text-grey_900 text-[32px] leading-[38px] font-medium">
            뛰어난 외관과 단지설계
          </span>
          <span className="text-main_color text-[56px] leading-[64px] font-bold">
            “혁신적인 라이프를 건축합니다”
          </span>
          <div className="text-grey_600 text-2xl font-medium text-center">
            <p>
              고급거주지에 어울리는 뛰어난 외관과 취향에 맞게 선택하는 평면까지
            </p>
            <p>앞선 라이프철학과 기술력으로 새로운 생활환경을 선보입니다.</p>
          </div>
        </div>
        <div>
          <div>
            <Image
              src={heroViewImg.src}
              alt="커뮤니티시설"
              width={1200}
              height={860}
            />
          </div>
        </div>
        <div className="pt-6 pb-24">
          <p className="text-grey_900 text-2xl font-medium mb-12">단지설계</p>
          <div className="flex flex-wrap gap-x-6 gap-y-12">
            <div className="flex basis-1/2 flex-1 flex-col max-w-[588px]">
              <span className="text-main_color text-2xl font-semibold mb-6 border-b border-grey_900">
                모비우스형 특화외관
              </span>
              <span className="text-grey_700 text-xl">
                판교 고급거주지의 만족을 높이는 모비우스 형태의 외관 설계
              </span>
            </div>
            <div className="flex basis-1/2 flex-1 flex-col max-w-[588px]">
              <span className="text-main_color text-2xl font-semibold mb-6 border-b border-grey_900">
                단지 내 편의시설
              </span>
              <span className="text-grey_700 text-xl">
                외출하는 번거로움 없이 즐기는 가깝고 편리한 단지 내 편의시설
              </span>
            </div>
            <div className="flex basis-1/2 flex-1 flex-col max-w-[588px]">
              <span className="text-main_color text-2xl font-semibold mb-6 border-b border-grey_900">
                다양한 맞춤형 평면
              </span>
              <span className="text-grey_700 text-xl">
                입주민의 취향과 개성에 따라 공간을 선택하고 변형할 수 있는 평면
              </span>
            </div>
            <div className="flex basis-1/2 flex-1 flex-col max-w-[588px]">
              <span className="text-main_color text-2xl font-semibold mb-6 border-b border-grey_900">
                개방감 높은 천장고
              </span>
              <span className="text-grey_700 text-xl">
                개방감과 여유로움을 위한 3m 천장고(거실 기준)으로 다양한
                인테리어 적용 가능
              </span>
              <span className="text-grey_300 text-sm">*일부실 제외</span>
            </div>
          </div>
        </div>
        <div>
          <Image
            src={aerialViewImg.src}
            alt="커뮤니티시설"
            width={1200}
            height={860}
          />
        </div>
        <div className="pt-6 pb-24 ">
          <p className="text-grey_900 text-2xl font-medium mb-12">조경설계</p>
          <div className="flex flex-wrap gap-x-6 gap-y-12">
            <div className="relative flex basis-1/2 flex-1 flex-col gap-6 max-w-[384px]">
              <Image
                src={decoInroImg.src}
                alt="장식"
                width={42}
                height={42}
                className="absolute top-[-20px] left-[-20px] -z-10"
              />
              <span className="text-main_color text-2xl font-semibold">
                옥상텃밭
              </span>
              <span className="text-grey_700 text-xl font-medium">
                여러가지 채소를 가꿀 수 있는 텃밭으로, 더 건강한 생활을 누릴 수
                있는 공간
              </span>
              <Image
                src={patchViewImg.src}
                alt="텃밭"
                width={384}
                height={264}
              />
            </div>
            <div className="relative flex basis-1/2 flex-1 flex-col gap-6 max-w-[384px]">
              <Image
                src={decoInroImg.src}
                alt="장식"
                width={42}
                height={42}
                className="absolute top-[-20px] left-[-20px] -z-10"
              />
              <span className="text-main_color text-2xl font-semibold">
                옥상정원
              </span>
              <span className="text-grey_700 text-xl font-medium">
                옥상 내 휴게공간과 텃밭, 초화원과 연계된 산책로를 통해 조경을
                즐길 수 있는 정원
              </span>
              <Image
                src={gardenViewImg.src}
                alt="정원"
                width={384}
                height={264}
              />
            </div>
            <div className="relative flex basis-1/2 flex-1 flex-col gap-6 max-w-[384px]">
              <Image
                src={decoInroImg.src}
                alt="장식"
                width={42}
                height={42}
                className="absolute top-[-20px] left-[-20px] -z-10"
              />
              <span className="text-main_color text-2xl font-semibold">
                야외광장
              </span>
              <span className="text-grey_700 text-xl font-medium">
                공개공지 내 다양한 커뮤니티 활동(이벤트)를 위해 조성된 광장
              </span>
              <Image
                src={squareViewImg.src}
                alt="광장"
                width={384}
                height={264}
              />
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  )
}
