"use client"

import { useRouter } from "next/navigation"
import Tab from "@/components/tab/Tab"
import Image from "next/image"
import heroCommunityImg from "@/public/img/hero_community.png"

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
        activeTab={"community"}
        handleTabChange={handleTabChange}
      />
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4 items-center">
          <span className="text-grey_900 text-[32px] leading-[38px] font-medium">
            즐거움이 가득한 힐스테이트의 특권
          </span>
          <span className="text-main_color text-[56px] leading-[64px] font-bold">
            “다양한 라이프스타일을 위한 문화공간”
          </span>
          <div className="text-grey_600 text-2xl font-medium text-center">
            <p>입주민의 다양한 라이프스타일을 고려한 세심한 커뮤니티 설계로</p>
            <p>
              이웃과 가족들에게 자랑하고 싶은 취믹와 여가를 누리실 수 있습니다.
            </p>
          </div>
        </div>
        <div>
          <div>
            <Image
              src={heroCommunityImg.src}
              alt="커뮤니티시설"
              width={1200}
              height={860}
            />
          </div>
        </div>
        <div>
          <p className="text-grey_900 text-2xl font-medium mb-12">커뮤니티</p>
          <div className="flex flex-wrap gap-y-12">
            <div className="flex basis-1/2 flex-1 flex-col">
              <span className="text-main_color text-2xl font-semibold mb-2">
                피트니스/GX룸
              </span>
              <span className="text-grey_700 text-xl">
                가족의 건강한 몸과 마음을 키우는 체력단련 공간
              </span>
            </div>
            <div className="flex basis-1/2 flex-1 flex-col">
              <span className="text-main_color text-2xl font-semibold mb-2">
                실내골프연습장/스크린골프
              </span>
              <span className="text-grey_700 text-xl">
                계절에 상관없이 골프를 즐길 수 있는 공간
              </span>
            </div>
            <div className="flex basis-1/2 flex-1 flex-col">
              <span className="text-main_color text-2xl font-semibold mb-2">
                갤러리
              </span>
              <span className="text-grey_700 text-xl">
                다양한 취미를 가진 입주민들의 작품을 전시할 수 있는 공간
              </span>
            </div>
            <div className="flex basis-1/2 flex-1 flex-col">
              <span className="text-main_color text-2xl font-semibold mb-2">
                취미실
              </span>
              <span className="text-grey_700 text-xl">
                입주민들의 취미를 위해 다양한 용도로 활용 가능한 공간
              </span>
              <span className="text-grey_300 text-sm">
                (탁구/당구, 클래스룸, 시네마룸, 대형창고 등으로 활용 가능하며
                용도는 변경될 수 있습니다.)
              </span>
            </div>
            <div className="flex basis-1/2 flex-1 flex-col">
              <span className="text-main_color text-2xl font-semibold mb-2">
                맘스키즈카페
              </span>
              <span className="text-grey_700 text-xl">
                날씨와 상관없이 아이들이 실내에서 놀 수 있는 공간
              </span>
            </div>
            <div className="flex basis-1/2 flex-1 flex-col">
              <span className="text-main_color text-2xl font-semibold mb-2">
                북카페
              </span>
              <span className="text-grey_700 text-xl">
                아늑한 환경에서 독서 및 학습을 할 수 있는 공간
              </span>
            </div>
            <div className="flex basis-1/2 flex-1 flex-col">
              <span className="text-main_color text-2xl font-semibold mb-2">
                게스트룸
              </span>
              <span className="text-grey_700 text-xl">
                언제든 손님을 여유롭고 편하게 맞을 수 있는 공간
              </span>
            </div>
            <div className="flex basis-1/2 flex-1 flex-col">
              <span className="text-main_color text-2xl font-semibold mb-2">
                코인세탁실
              </span>
              <span className="text-grey_700 text-xl">
                대형 빨래와 손쉬운 건조를 원스톱으로 해결하는 편리한 공간
              </span>
            </div>
            <div className="flex basis-1/2 flex-1 flex-col">
              <span className="text-main_color text-2xl font-semibold mb-2">
                계절창고
              </span>
              <span className="text-grey_700 text-xl">
                계절용품을 보관하여 공간의 효율성을 높이는 공간
              </span>
            </div>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
