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
import CommunitySearch from "@/components/CommunitySearch"

export default function Home() {
  return (
    <div className="flex flex-col gap-8 max-w-[1200px] m-auto mb-32">
      <div className="relative">
        <Image
          src={bannerMainImg.src}
          alt="매인베너"
          width={1200}
          height={380}
        />
      </div>
      <div className="flex gap-24 justify-center font-bold">
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
        <div className="flex flex-col items-center gap-2">
          <Image
            src={voteIcon.src}
            alt="주민투표아이콘"
            width={64}
            height={64}
          />
          <span className="text-grey_900 text-xl font-semibold">주민투표</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Image
            src={carIcon.src}
            alt="방문차량아이콘"
            width={64}
            height={64}
          />
          <span className="text-grey_900 text-xl font-semibold">방문차량</span>
        </div>
      </div>
      <div className="flex w-full gap-6">
        <div className="w-2/5">
          <Link href={"/notice"}>
            <div className="h-14 flex justify-between items-center px-4 mb-6 border-b bg-grey_50 rounded-lg">
              <div className="flex gap-4 items-center">
                <span className="text-grey_900 text-2xl font-semibold leading-6">
                  공지사항
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </Link>
          <div>
            <div className="flex px-2 py-4">
              <div className="flex items-center justify-center w-32 text-grey_300 text-center border-r border-grey_200 align-middle">
                공동생활
              </div>
              <p className="flex-1 px-2 text-grey_900 text-lg font-medium truncate">
                다 같이 사용하는 아파트입니다. 층간소음에 유의해주시기를
                바랍니다.
              </p>
            </div>
            <div className="flex px-2 py-4">
              <div className="flex items-center justify-center w-32 text-grey_300 text-center border-r border-grey_200 align-middle">
                공사안내
              </div>
              <p className="flex-1 px-2 text-grey_900 text-lg font-medium truncate">
                지하주차장 누수 문제로 공사합니다. 5월 3일 (10:00~12:00)
              </p>
            </div>
            <div className="flex px-2 py-4">
              <div className="flex items-center justify-center w-32 text-grey_300 text-center border-r border-grey_200 align-middle">
                관리비
              </div>
              <p className="flex-1 px-2 text-grey_900 text-lg font-medium truncate">
                4월 관리비 고지서 우편함에 있습니다.
              </p>
            </div>
            <div className="flex px-2 py-4">
              <div className="flex items-center justify-center w-32 text-grey_300 text-center border-r border-grey_200 align-middle">
                선거관리위원회
              </div>
              <p className="flex-1 px-2 text-grey_900 text-lg font-medium truncate">
                동대표 투표 진행으로 선거위원 뽑습니다. 참여 부탁드립니다
              </p>
            </div>
            <div className="flex px-2 py-4">
              <div className="flex items-center justify-center w-32 text-grey_300 text-center border-r border-grey_200 align-middle">
                기타
              </div>
              <p className="flex-1 px-2 text-grey_900 text-lg font-medium truncate">
                어린이를 위한 작은 도서관 시행합니다.
              </p>
            </div>
          </div>
        </div>
        <div className="w-3/5">
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </Link>
          <div>
            <SubMenuBar
              option="community"
              category="frees"
            />
          </div>
          <div>
            <div className="flex px-2 py-4">
              <div className="flex items-center justify-center w-32 text-grey_300 text-center border-r border-grey_200 align-middle">
                아파트/동네소식
              </div>
              <p className="flex-1 px-2 text-grey_900 text-lg font-medium truncate">
                고3인데, 동네에 조용하게 공부할만한 스터디카페 추천해주세요
              </p>
            </div>
            <div className="flex px-2 py-4">
              <div className="flex items-center justify-center w-32 text-grey_300 text-center border-r border-grey_200 align-middle">
                아파트/동네소식
              </div>
              <p className="flex-1 px-2 text-grey_900 text-lg font-medium truncate">
                작은 도서관 진행해서 아이들 데리고 가봤습니다~^^
              </p>
            </div>
            <div className="flex px-2 py-4">
              <div className="flex items-center justify-center w-32 text-grey_300 text-center border-r border-grey_200 align-middle">
                아파트/동네소식
              </div>
              <p className="flex-1 px-2 text-grey_900 text-lg font-medium truncate">
                지하주차장 누수로 깜짝 놀랐네요.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-6">
        <div className="w-2/5">
          <Link href={"/community/frees"}>
            <div className="h-14 flex justify-between items-center px-4 mb-6 border-b bg-grey_50 rounded-lg">
              <div className="flex gap-4 items-center">
                <span className="text-grey_900 text-2xl font-semibold leading-6">
                  일정표
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </Link>
          <div>
            <SubMenuBar
              option="community"
              category=""
            />
          </div>
          <div>
            <div className="flex px-2 py-4">
              <p className="flex-1 px-2 text-grey_900 text-lg font-medium truncate">
                고3인데, 동네에 조용하게 공부할만한 스터디카페 추천해주세요
              </p>
            </div>
            <div className="flex px-2 py-4">
              <p className="flex-1 px-2 text-grey_900 text-lg font-medium truncate">
                작은 도서관 진행해서 아이들 데리고 가봤습니다~^^
              </p>
            </div>
            <div className="flex px-2 py-4">
              <p className="flex-1 px-2 text-grey_900 text-lg font-medium truncate">
                지하주차장 누수로 깜짝 놀랐네요.
              </p>
            </div>
          </div>
        </div>
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
              <Image
                src={googlePlayImg.src}
                alt="구글플레이"
                width={190}
                height={56}
              />
              <Image
                src={appStoreImg.src}
                alt="앱스토어"
                width={175}
                height={56}
              />
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
