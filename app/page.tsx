export default function Home() {
  return (
    <div className="flex flex-col gap-8 max-w-[1200px] m-auto mb-32">
      <div className="w-full h-[400px] bg-slate-300"></div>
      <div className="flex gap-24 justify-center font-bold">
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 bg-slate-300"></div>
          <span>관리비조회</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 bg-slate-300"></div>
          <span>민원게시판</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 bg-slate-300"></div>
          <span>주민투표</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 bg-slate-300"></div>
          <span>방문차량</span>
        </div>
      </div>
      <div className="flex w-full gap-8">
        <div className="w-2/5">
          <div className="flex justify-between items-center p-4 mb-6 border-b border-slate-300">
            <div className="flex gap-4 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
                />
              </svg>
              <p className="text-zinc-900 text-2xl font-semibold">공지사항</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          <div className="flex flex-col gap-8 px-2 text-neutral-800 text-lg font-medium">
            <p>중요 / 내가 그린 기린 그림은 잘 그린 기린그림</p>
            <p>중요 / 내가 그린 기린 그림은 잘 그린 기린그림</p>
            <p>중요 / 내가 그린 기린 그림은 잘 그린 기린그림</p>
            <p>중요 / 내가 그린 기린 그림은 잘 그린 기린그림</p>
          </div>
        </div>
        <div className="w-3/5">
          <div className="flex justify-between p-4 mb-6 border-b border-slate-300">
            <div className="flex gap-4 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
                />
              </svg>
              <p className="text-zinc-900 text-2xl font-semibold">소통공간</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          <div className="flex flex-col gap-8 px-2 text-neutral-800 text-lg font-medium">
            <p>중요 / 내가 그린 기린 그림은 잘 그린 기린그림</p>
            <p>중요 / 내가 그린 기린 그림은 잘 그린 기린그림</p>
            <p>중요 / 내가 그린 기린 그림은 잘 그린 기린그림</p>
            <p>중요 / 내가 그린 기린 그림은 잘 그린 기린그림</p>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-8">
        <div className="w-2/5">
          <div className="flex justify-between p-4 mb-6 border-b border-slate-300">
            <div className="flex gap-4 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
                />
              </svg>
              <p className="text-zinc-900 text-2xl font-semibold">일정표</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          <div className="flex flex-col gap-8 px-2 text-neutral-800 text-lg font-medium">
            <p>중요 / 내가 그린 기린 그림은 잘 그린 기린그림</p>
            <p>중요 / 내가 그린 기린 그림은 잘 그린 기린그림</p>
            <p>중요 / 내가 그린 기린 그림은 잘 그린 기린그림</p>
            <p>중요 / 내가 그린 기린 그림은 잘 그린 기린그림</p>
          </div>
        </div>
        <div className="w-3/5">
          <div className="flex justify-between p-4 mb-6 border-b border-slate-300">
            <div className="flex gap-4 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
                />
              </svg>
              <p className="text-zinc-900 text-2xl font-semibold">관리비</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          <div>
            <p className="text-neutral-800 text-2xl font-semibold mb-6">
              2024년 4월 아파트 관리비
            </p>
            <p className="text-neutral-800 text-lg font-medium mb-3">
              납부하실 금액은
            </p>
            <p className="text-zinc-900 text-[40px] font-semibold mb-1">
              432,100원
            </p>
            <span className="text-neutral-700 text-xl font-medium">
              전달에 비해{" "}
            </span>
            <span className="text-red-500 text-xl font-medium">
              40,000원 올랐어요!
            </span>
          </div>
        </div>
      </div>
      <div className="px-12 py-11 bg-slate-300">
        <p>아파트너 서비스, 더 나은 입주민의 삶</p>
        <div className="flex gap-4 justify-end">
          <p>Google Play</p>
          <p>App Store</p>
        </div>
      </div>
    </div>
  )
}
