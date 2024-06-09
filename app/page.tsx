import Image from "next/image"
import feeIcon from "@/public/icon/fee.svg"
import boardIcon from "@/public/icon/board.svg"
import voteIcon from "@/public/icon/vote.svg"
import carIcon from "@/public/icon/car.svg"
import Link from "next/link"
import SubMenuBar from "@/components/submenu/SubMenuBar"
import feeGraphImg from "@/public/img/fee_graph.png"
import logoKoreanImg from "@/public/img/logo_korean.png"
import googlePlayImg from "@/public/img/google_play.png"
import appStoreImg from "@/public/img/app_store.png"
import familyImg from "@/public/img/family.png"
import bannerMainImg from "@/public/img/banner_main.png"
import CommunitySection from "@/components/main/CommunitySection"
import NoticesSection from "@/components/main/NoticesSection"
import ScheduleSection from "@/components/main/ScheduleSection"

import { cookies } from "next/headers"

export default async function Home() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get("accesstoken") as string | undefined

  const freesRes = await fetch(
    `https://711.ha-ving.store/boards/frees?catid=0&page=1`,
    { cache: "no-store" }
  )
  const marketsRes = await fetch(
    `https://711.ha-ving.store/boards/markets?catid=0&page=1`,
    { cache: "no-store" }
  )
  const qnaRes = await fetch(
    `https://711.ha-ving.store/boards/qna?catid=0&page=1`,
    { cache: "no-store" }
  )
  const noticesRes = await fetch(
    `https://711.ha-ving.store/boards/notices?catid=0&page=1`,
    { cache: "no-store" }
  )

  const freesData = await freesRes.json()
  const marketsData = await marketsRes.json()
  const qnaData = await qnaRes.json()
  const noticesData = await noticesRes.json()

  return (
    <div className="flex flex-col gap-8 max-w-[1200px] m-auto mb-32">
      <div>
        <input
          type="hidden"
          id="accessToken"
          value={accessToken ? accessToken : "ㅇㅇ"}
        />
      </div>
      <div className="relative">
        <Image
          src={bannerMainImg.src}
          alt="매인베너"
          width={1200}
          height={380}
        />
      </div>
      <div className="flex gap-24 justify-center font-bold">
        <Link
          href={`/fee/my?year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}`}>
          <div className="flex flex-col items-center gap-2">
            <Image
              src={feeIcon.src}
              alt="관리비조회아이콘"
              width={64}
              height={64}
            />
            <span className="text-grey_900 text-xl font-semibold">
              관리비조회
            </span>
          </div>
        </Link>
        <Link href={"/complaints"}>
          <div className="flex flex-col items-center gap-2">
            <Image
              src={boardIcon.src}
              alt="민원게시판아이콘"
              width={64}
              height={64}
            />
            <span className="text-grey_900 text-xl font-semibold">
              민원게시판
            </span>
          </div>
        </Link>
        <Link href={"#"}>
          <div className="flex flex-col items-center gap-2">
            <Image
              src={voteIcon.src}
              alt="주민투표아이콘"
              width={64}
              height={64}
            />
            <span className="text-grey_900 text-xl font-semibold">
              주민투표
            </span>
          </div>
        </Link>
        <Link href={"#"}>
          <div className="flex flex-col items-center gap-2">
            <Image
              src={carIcon.src}
              alt="방문차량아이콘"
              width={64}
              height={64}
            />
            <span className="text-grey_900 text-xl font-semibold">
              방문차량
            </span>
          </div>
        </Link>
      </div>
      <div className="flex w-full gap-6">
        <NoticesSection noticesData={noticesData.data.posts.content} />
        <CommunitySection
          freesData={freesData.data.posts.content}
          marketsData={marketsData.data.posts.content}
          qnaData={qnaData.data.posts.content}
        />
      </div>
      <div className="flex w-full gap-6">
        <ScheduleSection
          freesData={freesData.data.posts.content}
          marketsData={marketsData.data.posts.content}
          qnaData={qnaData.data.posts.content}
        />
        <div className="w-3/5">
          <Link href={"/fee"}>
            <div className="h-14 flex justify-between items-center px-4 mb-6 border-b bg-grey_50 rounded-lg">
              <div className="flex gap-4 items-center">
                <span className="text-grey_900 text-2xl font-semibold leading-6">
                  관리비
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
          <div className="flex gap-6">
            <div>
              <Image
                src={feeGraphImg.src}
                alt="관리비그래프이미지"
                width={213}
                height={185}
              />
            </div>
            <div>
              <p className="text-grey_800 text-2xl font-semibold mb-6">
                2024년 4월 아파트 관리비
              </p>
              <p className="text-grey_800 text-lg font-medium">
                납부하실 금액은
              </p>
              <p className="text-grey_900 text-[40px] font-semibold mb-1">
                432,100원
              </p>
              <span className="text-grey_600 text-xl font-medium">
                전달에 비해{" "}
              </span>
              <span className="text-red-500 text-xl font-medium">
                40,000원 올랐어요!
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-16 rounded-xl border border-grey_25 mt-12">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-grey_900 text-[32px] font-semibold">
              아파트 생활이 쉬워지는 아파트 필수앱
            </p>
            <Image
              src={logoKoreanImg.src}
              alt="아파트너한글로고"
              width={190}
              height={61}
              className="mb-4"
            />
            <div className="flex gap-4">
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href={
                  "https://play.google.com/store/apps/details?id=kr.co.azsmart.apartner&hl=ko&pli=1"
                }>
                <Image
                  src={googlePlayImg.src}
                  alt="구글플레이"
                  width={190}
                  height={56}
                />
              </Link>
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href={
                  "https://apps.apple.com/kr/app/%EC%95%84%ED%8C%8C%ED%8A%B8%EB%84%88-no-1-%EC%95%84%ED%8C%8C%ED%8A%B8%EC%95%B1/id1243505765"
                }>
                <Image
                  src={appStoreImg.src}
                  alt="앱스토어"
                  width={175}
                  height={56}
                />
              </Link>
            </div>
          </div>
          <Image
            src={familyImg.src}
            alt="가족"
            width={466}
            height={260}
          />
        </div>
      </div>
    </div>
  )
}
