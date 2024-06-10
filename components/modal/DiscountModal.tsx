export default function DiscountModal({isOpen, onClose} : {isOpen: boolean, onClose: ()=>void}) {
    if(!isOpen) return null
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="w-[500px] bg-white rounded-2xl overflow-hidden">
                <div className="bg-teal-700 text-white text-lg font-medium flex justify-between items-center px-6 py-4">
                    <div className="w-6 h-6"></div>
                    <div className="text-center flex-grow">알림</div>
                    <button className="w-6 h-6 flex justify-center items-center" onClick={onClose}>
                        <p>X</p>
                    </button>
                </div>
                <div className="px-6 py-8">
                    <div className="text-center text-zinc-900 text-xl font-semibold mb-3">
                        우리 단지는 00개의 은행 계좌에 납부할 수 있습니다.
                    </div>
                    <div className="text-center text-zinc-600 text-lg font-normal mb-6">
                        계좌이체 시 보내는 사람의<br />세대주명 또는 동호수를 입력해주세요.
                    </div>
                    <div className="w-96 h-72 pt-6 pb-8 bg-white flex-col justify-start items-center gap-6 inline-flex">
                        <div className="pb-1 rounded-lg border border-neutral-400 flex-col justify-start items-start flex">
                        <div className="w-96 px-4 py-3 bg-neutral-400 justify-center items-center gap-8 inline-flex">
                        <div className="grow shrink basis-0 text-center text-white text-sm font-medium font-['Pretendard'] tracking-wide">항목</div>
                        <div className="grow shrink basis-0 text-center text-white text-sm font-medium font-['Pretendard'] tracking-wide">금액</div>
                        </div>
                        <div className="self-stretch px-4 pt-3 pb-2 justify-center items-center gap-4 inline-flex">
                        <div className="grow shrink basis-0 text-center text-zinc-600 text-base font-medium font-['Pretendard']">전기 (다자녀)</div>
                        <div className="w-8 h-px origin-top-left rotate-90 border border-neutral-300"></div>
                        <div className="grow shrink basis-0 text-center text-zinc-600 text-base font-medium font-['Pretendard']">16,000원</div>
                        </div>
                        <div className="w-96 h-px origin-top-left rotate-180 border border-neutral-300"></div>
                        <div className="self-stretch px-4 py-2 justify-center items-center gap-4 inline-flex">
                        <div className="grow shrink basis-0 text-center text-zinc-600 text-base font-medium font-['Pretendard']">전기 (요금동결)</div>
                        <div className="w-8 h-px origin-top-left rotate-90 border border-neutral-300"></div>
                        <div className="grow shrink basis-0 text-center text-zinc-600 text-base font-medium font-['Pretendard']">6,604원</div>
                        </div>
                        </div>
                        </div>
                </div>
            </div>
        </div>
    )
}
