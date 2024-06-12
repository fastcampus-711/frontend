import Image from "next/image"
import copy from "@/public/icon/copy.svg"
import bank1 from "@/public/icon/bank_1.svg"
import bank2 from "@/public/icon/bank_2.svg"

export default function BankModal({isOpen, onClose, content} : {isOpen: boolean, onClose: ()=>void, content: boolean}) {
    if(!isOpen) return null

return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="w-[500px] bg-white rounded-2xl overflow-hidden">
                <div className="flex bg-main_color text-white text-lg font-medium justify-between items-center px-6 py-4">
                    <div className="w-6 h-6"></div>
                    <div className="text-center flex-grow">알림</div>
                    <button className="w-6 h-6 flex justify-center items-center" onClick={onClose}>
                        <p>X</p>
                    </button>
                </div>
                <div className="px-6 py-8">
                    <div className="text-center text-grey_500 text-xl font-semibold mb-3">
                        우리 단지는 2개의 은행 계좌에 납부할 수 있습니다.
                    </div>
                    <div className="text-center text-grey_500 text-lg font-normal mb-6">
                        계좌이체 시 보내는 사람의<br />세대주명 또는 동호수를 입력해주세요.
                    </div>
                    {!content ? 
                        <div className="text-center text-grey_900 text-xl font-semibold">
                            등록된 납부 은행이 없습니다.
                        </div>
                    : 
                    <div className="h-[162px] px-6 flex flex-col justify-start items-start gap-6">
                        <div className="w-full flex justify-between items-center">
                            <div className="inline-flex gap-5 items-center">
                                <Image
                                    src={bank1.src}
                                    alt="은행1"
                                    width={65}
                                    height={65}
                                />
                                <div className="flex flex-col gap-2">
                                    <div className="text-grey_900 text-base font-medium">경남은행</div>
                                    <div className="text-grey_900 text-base font-medium">134-13-123456-123</div>
                                </div>
                            </div>
                            <button className="flex px-3 py-2 bg-white rounded-full border border-grey_300 gap-[13px] items-center">
                                <Image
                                    src={copy.src}
                                    alt="복사 아이콘"
                                    width={20}
                                    height={20}
                                />
                                <div className="text-grey_300 text-base font-medium">복사</div>
                            </button>
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <div className="inline-flex gap-5 items-center">
                                <Image
                                    src={bank2.src}
                                    alt="은행2"
                                    width={65}
                                    height={65}
                                />
                                <div className="flex flex-col gap-2">
                                    <div className="text-grey_900 text-base font-medium">케이뱅크</div>
                                    <div className="text-grey_900 text-base font-medium">134-13-123456-123</div>
                                </div>
                            </div>
                            <button className="flex px-3 py-2 bg-white rounded-full border border-grey_300 gap-[13px] items-center">
                                <Image
                                    src={copy.src}
                                    alt="복사 아이콘"
                                    width={20}
                                    height={20}
                                />
                                <div className="text-grey_300 text-base font-medium">복사</div>
                            </button>
                        </div>
                    </div>
                    }
                </div> 
            </div>
        </div>
        )
}