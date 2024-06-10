export default function BankModal({isOpen, onClose, content} : {isOpen: boolean, onClose: ()=>void, content: boolean}) {
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
            {!content ? 
                <div className="text-center text-zinc-900 text-xl font-semibold">
                    등록된 납부 은행이 없습니다.
                </div>
            : 
            <div className="h-[162px] px-6 flex flex-col justify-start items-start gap-6">
                <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <img className="w-16 h-16 rounded-full border border-gray-300" src="https://via.placeholder.com/69x69" alt="Bank Logo" />
                    <div className="flex flex-col gap-2">
                    <div className="text-gray-900 text-base font-medium">경남은행</div>
                    <div className="text-gray-900 text-base font-medium">134-13-123456-123</div>
                    </div>
                </div>
                <button className="px-3 py-2 bg-white rounded-full border border-gray-300 flex gap-2 items-center">
                    <div className="w-4 h-4"></div>
                    <div className="text-gray-500 text-base font-medium">복사</div>
                </button>
                </div>
                <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <img className="w-16 h-16 rounded-full border border-gray-300" src="https://via.placeholder.com/69x69" alt="Bank Logo" />
                    <div className="flex flex-col gap-2">
                    <div className="text-gray-900 text-base font-medium">케이뱅크</div>
                    <div className="text-gray-900 text-base font-medium">134-13-123456-123</div>
                    </div>
                </div>
                <button className="px-3 py-2 bg-white rounded-full border border-gray-300 flex gap-2 items-center">
                    <div className="w-4 h-4"></div>
                    <div className="text-gray-500 text-base font-medium">복사</div>
                </button>
                </div>
            </div>
            }
        </div> 
    </div>
</div>
)


}