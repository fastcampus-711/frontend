"use client"

import { useRouter } from "next/navigation"
import Tab from "@/components/tab/Tab"
import Image from "next/image"
import apartHomePageGreetingImg from "@/public/img/apart_homepage_greeting.png"
import mobileAppImg from "@/public/img/mobile_app_greeting.png"
import adminPageGreetingImg from "@/public/img/admin_page_greeting.png"
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
    <div className="flex flex-col gap-10 max-w-[1200px] m-auto mb-40">
      <div className="py-8">
        <p className="text-grey_900 text-[32px] font-semibold">아파트소개</p>
      </div>
      <Tab
        tabData={tabsData}
        activeTab={"greetings"}
        handleTabChange={handleTabChange}
      />
      <div className="flex flex-col justify-center items-center w-full h-[407px] text-grey_0 text-[56px] font-bold bg-[url('../public/img/hero_greeting.png')] bg-cover bg-no-repeat">
        <span>아파트너가 만드는</span>
        <span>더욱 편리하고 새로운 라이프스타일</span>
      </div>
      <div className="px-[144px]">
        <div className="flex p-12 gap-36">
          <div className="relative flex flex-col w-2/5 py-6">
            <Image
              src={decoInroImg.src}
              alt="장식"
              width={42}
              height={42}
              className="absolute top-[-1px] left-[-20px] -z-10"
            />
            <span className="text-main_color text-[32px] leading-[38px] font-semibold">
              참여
            </span>
            <span className="text-grey_300 text-[22px] leading-[26px] font-medium">
              PARTICIPATION
            </span>
          </div>
          <div className="flex items-center">
            <p className="text-grey_700 text-[22px] leading[26px]">
              탁월한 접근성으로 아파트 내 이루어지는 안건들을 투표나
              설문조사등을 통해 주민들이 쉽게 참여할 수 있습니다.
            </p>
          </div>
        </div>
        <div className="flex p-12 gap-36">
          <div className="relative flex flex-col w-2/5 py-6">
            <Image
              src={decoInroImg.src}
              alt="장식"
              width={42}
              height={42}
              className="absolute top-[-1px] left-[-20px] -z-10"
            />
            <span className="text-main_color text-[32px] leading-[38px] font-semibold">
              소통
            </span>
            <span className="text-grey_300 text-[22px] leading-[26px] font-medium">
              COMMUNICATION
            </span>
          </div>
          <div className="flex items-center">
            <p className="text-grey_700 text-[22px] leading[26px]">
              공동체 커뮤니케이션 수단으로서 사소한 분쟁뿐만 아니라 동호회,
              중고장터 같은 공간을 통한 소통 계기를 마련합니다.
            </p>
          </div>
        </div>

        <div className="flex p-12 gap-36">
          <div className="relative flex flex-col w-2/5 py-6">
            <Image
              src={decoInroImg.src}
              alt="장식"
              width={42}
              height={42}
              className="absolute top-[-1px] left-[-20px] -z-10"
            />
            <span className="text-main_color text-[32px] leading-[38px] font-semibold">
              투명
            </span>
            <span className="text-grey_300 text-[22px] leading-[26px] font-medium">
              TRANSPARENCY
            </span>
          </div>
          <div className="flex items-center">
            <p className="text-grey_700 text-[22px] leading[26px]">
              모바일 앱을 통한 입주민과의 소통으로 투명한 아파트 운영이
              가능해지며, 아파트 공동체 문화 활성화에 앞서나갈 수 있습니다.
            </p>
          </div>
        </div>
      </div>
      <div>
        <hr className="border borer-grey_50" />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center items-center">
            <span className="text-dark_color text-2xl font-semibold mb-2">
              아파트 홈페이지
            </span>
            <span className="text-grey_700 text-lg">아파트 개별 단지별</span>
            <span className="text-grey_700 text-lg">
              모바일 앱과 연동된 홈페이지 제공
            </span>
          </div>
          <div className="bg-gradient-to-tr from-[#E4F2F2] via-[#9BC8C8] to-[#70AEAE] rounded-lg">
            <Image
              src={mobileAppImg.src}
              alt="아파트홈페이지"
              width={588}
              height={400}
            />
          </div>
        </div>
        <div className="flex">
          <div className="bg-gradient-to-l from-[#E4F2F2] via-[#9BC8C8] to-[#70AEAE] rounded-lg">
            <Image
              src={apartHomePageGreetingImg.src}
              alt="모바일앱"
              width={588}
              height={400}
            />
          </div>
          <div className="flex flex-1 flex-col justify-center items-center">
            <span className="text-dark_color text-2xl font-semibold mb-2">
              모바일 앱
            </span>
            <span className="text-grey_700 text-lg">
              모바일 애플리케이션을 통한
            </span>
            <span className="text-grey_700 text-lg">
              전자투표, 설문조사, 관리비 조회 등
            </span>
            <span className="text-grey_700 text-lg">모바일 특화 기능 제공</span>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center items-center">
            <span className="text-dark_color text-2xl font-semibold mb-2">
              관리자 페이지
            </span>
            <span className="text-grey_700 text-lg">
              입주민관리, 아파트 소식 및 공지 알림,
            </span>
            <span className="text-grey_700 text-lg">
              전자투표, 설문조사, 관리비등록 등
            </span>
            <span className="text-grey_700 text-lg">
              아파트 관리 시스템 기능 제공
            </span>
          </div>
          <div className="bg-gradient-to-br from-[#E4F2F2] via-[#9BC8C8] to-[#70AEAE] rounded-lg">
            <Image
              src={adminPageGreetingImg.src}
              alt="관리자페이지"
              width={588}
              height={400}
            />
          </div>
        </div>
      </div>
      <div>
        <hr className="border borer-grey_50" />
      </div>
      <div className="flex flex-col gap-10 justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <span className="text-grey_900 text-2xl font-semibold mb-3">
            아파트너는 아파트 홈페이지와 모바일앱, 관리자페이지를 제공합니다.
          </span>
          <span className="text-grey_400 text-xl">
            맞춤형 아파트 모바일앱으로 즐겁고 편리한 아파트 생활을 누리세요.
          </span>
        </div>
        <div className="flex gap-12 text-white">
          <div className="flex gap-2 justify-center w-80 bg-dark_color py-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.3347 2.25227C11.5177 2.08976 11.754 2 11.9987 2C12.2435 2 12.4797 2.08976 12.6627 2.25227L21.6627 10.2523C21.8508 10.431 21.9621 10.6758 21.9731 10.9351C21.984 11.1943 21.8938 11.4477 21.7214 11.6416C21.549 11.8356 21.308 11.9549 21.0492 11.9744C20.7905 11.994 20.5342 11.9121 20.3347 11.7463L19.9987 11.4493V18.9993C19.9987 19.5297 19.788 20.0384 19.4129 20.4135C19.0378 20.7886 18.5291 20.9993 17.9987 20.9993H5.99871C5.46827 20.9993 4.95957 20.7886 4.58449 20.4135C4.20942 20.0384 3.99871 19.5297 3.99871 18.9993V11.4493L3.66271 11.7463C3.46316 11.9121 3.20696 11.994 2.94821 11.9744C2.68945 11.9549 2.44842 11.8356 2.27603 11.6416C2.10364 11.4477 2.01338 11.1943 2.02433 10.9351C2.03528 10.6758 2.14657 10.431 2.33471 10.2523L11.3347 2.25227ZM5.99871 9.66927V18.9993H8.99871V13.9993C8.99871 13.7341 9.10406 13.4797 9.2916 13.2922C9.47914 13.1046 9.73349 12.9993 9.99871 12.9993H13.9987C14.2639 12.9993 14.5183 13.1046 14.7058 13.2922C14.8933 13.4797 14.9987 13.7341 14.9987 13.9993V18.9993H17.9987V9.67027L11.9987 4.33727L5.99871 9.66927ZM12.9987 18.9993V14.9993H10.9987V18.9993H12.9987Z"
                fill="white"
              />
            </svg>
            www.aptner.com
          </div>
          <div className="flex gap-2 justify-center w-80 bg-dark_color py-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.6292 13.8905L17.0852 13.4375L16.0262 12.3735L15.5722 12.8265L16.6292 13.8905ZM18.6142 13.2475L20.5252 14.2865L21.2402 12.9685L19.3302 11.9305L18.6142 13.2475ZM20.8922 16.3505L19.4722 17.7635L20.5292 18.8265L21.9492 17.4145L20.8922 16.3505ZM18.6062 18.2175C17.1562 18.3535 13.4062 18.2325 9.34417 14.1945L8.28617 15.2575C12.7182 19.6645 16.9372 19.8805 18.7462 19.7115L18.6062 18.2175ZM9.34417 14.1945C5.47317 10.3445 4.83117 7.10747 4.75117 5.70247L3.25317 5.78747C3.35317 7.55547 4.14817 11.1435 8.28617 15.2575L9.34417 14.1945ZM10.7192 8.01447L11.0062 7.72847L9.95017 6.66547L9.66317 6.95047L10.7192 8.01447ZM11.2342 4.09347L9.97417 2.40947L8.77317 3.30947L10.0332 4.99247L11.2342 4.09347ZM5.73317 2.04247L4.16317 3.60247L5.22117 4.66647L6.79017 3.10647L5.73317 2.04247ZM10.1912 7.48247C9.66117 6.95047 9.66117 6.95047 9.66117 6.95247H9.65917L9.65617 6.95647C9.60896 7.00466 9.56643 7.05723 9.52917 7.11347C9.47517 7.19347 9.41617 7.29847 9.36617 7.43147C9.2444 7.77479 9.21408 8.14388 9.27817 8.50247C9.41217 9.36747 10.0082 10.5105 11.5342 12.0285L12.5922 10.9645C11.1632 9.54447 10.8232 8.68047 10.7602 8.27247C10.7302 8.07847 10.7612 7.98247 10.7702 7.96047C10.7752 7.94647 10.7772 7.94547 10.7702 7.95447C10.7614 7.96834 10.7513 7.98139 10.7402 7.99347L10.7302 8.00347C10.7269 8.00658 10.7236 8.00958 10.7202 8.01247L10.1912 7.48247ZM11.5342 12.0285C13.0612 13.5465 14.2102 14.1385 15.0762 14.2705C15.5192 14.3385 15.8762 14.2845 16.1472 14.1835C16.2987 14.1274 16.4405 14.0477 16.5672 13.9475C16.5844 13.9331 16.6011 13.9181 16.6172 13.9025L16.6242 13.8965L16.6272 13.8935L16.6282 13.8915C16.6282 13.8915 16.6292 13.8905 16.1002 13.3585C15.5702 12.8265 15.5732 12.8255 15.5732 12.8255L15.5752 12.8235L15.5772 12.8215L15.5832 12.8165L15.5932 12.8065C15.6052 12.7957 15.6179 12.7857 15.6312 12.7765C15.6412 12.7695 15.6382 12.7725 15.6242 12.7785C15.5992 12.7875 15.5012 12.8185 15.3042 12.7885C14.8902 12.7245 14.0202 12.3845 12.5922 10.9645L11.5342 12.0285ZM9.97417 2.40847C8.95417 1.04847 6.95017 0.832472 5.73317 2.04247L6.79017 3.10647C7.32217 2.57747 8.26617 2.63247 8.77317 3.30947L9.97417 2.40847ZM4.75217 5.70347C4.73217 5.35747 4.89117 4.99547 5.22117 4.66747L4.16217 3.60347C3.62517 4.13747 3.20217 4.89347 3.25317 5.78747L4.75217 5.70347ZM19.4722 17.7635C19.1982 18.0375 18.9022 18.1915 18.6072 18.2185L18.7462 19.7115C19.4812 19.6425 20.0822 19.2725 20.5302 18.8275L19.4722 17.7635ZM11.0062 7.72847C11.9912 6.74947 12.0642 5.20247 11.2352 4.09447L10.0342 4.99347C10.4372 5.53247 10.3772 6.23947 9.94917 6.66647L11.0062 7.72847ZM20.5262 14.2875C21.3432 14.7315 21.4702 15.7775 20.8932 16.3515L21.9512 17.4145C23.2912 16.0815 22.8782 13.8585 21.2412 12.9695L20.5262 14.2875ZM17.0852 13.4385C17.4692 13.0565 18.0872 12.9625 18.6152 13.2485L19.3312 11.9315C18.2472 11.3415 16.9032 11.5045 16.0272 12.3745L17.0852 13.4385Z"
                fill="white"
              />
            </svg>
            1600-3123
          </div>
        </div>
      </div>
    </div>
  )
}
