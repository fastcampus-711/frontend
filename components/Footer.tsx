export default function Footer() {
  return (
    <footer className="bg-neutral-100 py-12 ">
      <div className="flex flex-col w-[1200px] m-auto gap-8">
        <div className="self-stretch justify-start items-center gap-10 inline-flex">
          <div className="text-zinc-400 text-sm font-medium font-['Pretendard'] tracking-wide">
            이용약관
          </div>
          <div className="text-zinc-400 text-sm font-medium font-['Pretendard'] tracking-wide">
            개인정보취급방침
          </div>
          <div className="text-zinc-400 text-sm font-medium font-['Pretendard'] tracking-wide">
            게시글 운영정책
          </div>
          <div className="text-zinc-400 text-sm font-medium font-['Pretendard'] tracking-wide">
            LICENSE
          </div>
          <div className="text-zinc-400 text-sm font-medium font-['Pretendard'] tracking-wide">
            앱 다운로드
          </div>
          <div className="text-zinc-400 text-sm font-medium font-['Pretendard'] tracking-wide">
            APTNER
          </div>
        </div>
        <div className="self-stretch justify-center items-start gap-[25px] inline-flex">
          <div className="h-[17px] justify-start items-center gap-[25px] flex">
            <div className="text-neutral-300 text-sm font-medium font-['Pretendard'] tracking-wide">
              문의 1600-3123
            </div>
            <div className="text-neutral-300 text-sm font-medium font-['Pretendard'] tracking-wide">
              팩스 02-6008-6879
            </div>
            <div className="text-neutral-300 text-sm font-medium font-['Pretendard'] tracking-wide">
              서비스문의 help@aptner.com
            </div>
          </div>
          <div className="grow shrink basis-0 text-neutral-300 text-sm font-medium font-['Pretendard'] tracking-wide">
            Copyright Aptner inc. All right reserved
          </div>
        </div>
      </div>
    </footer>
  )
}
