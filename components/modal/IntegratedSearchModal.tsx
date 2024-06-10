"use client"

import Image from "next/image"
import closeIcon from "@/public/icon/close.svg"
import closeIcon_thick from "@/public/icon/close_thick.svg"
import searchIcon from "@/public/icon/search.svg"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function IntegratedSearchModal({isOpen, onClose, content} : {isOpen: boolean, onClose: ()=> void, content: boolean}) {
    if(!isOpen) return null

    const [searchWord, setSearchWord] = useState("")
    const router = useRouter()
    const handleSearch = () => {
        router.push(`/integratedSearch?keyword=${searchWord}`)
        onClose()
    }
    return (
        <div className="flex fixed inset-0 bg-grey_800 bg-opacity-50 justify-center items-start z-50">
            <div className="max-w-[1080px] bg-white rounded-2xl overflow-hidden mt-[200px] ">
                <div className="w-full flex flex-col p-10 gap-6">
                    <div>
                        <div className="flex flex-col gap-6">
                            <div className="inline-flex self-stretch justify-between items-center border-b border-grey_200 pb-6">
                                <input className="grow shrink text-xl font-medium"
                                        value={searchWord}
                                        onChange={(e) => setSearchWord(e.target.value)}/>
                                <div className="flex items-center gap-6">
                                    <button className="w-8 h-8 p-2.5 bg-neutral-300 rounded-full"
                                            onClick={onClose}>
                                        <Image
                                            src={closeIcon_thick.src}
                                            alt="닫기아이콘"
                                            width={100}
                                            height={100}
                                        />
                                    </button>
                                    <button onClick={handleSearch}>
                                        <Image
                                            src={searchIcon.src}
                                            alt="검색아이콘"
                                            width={40}
                                            height={40}
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="text-xl font-medium">최근 검색어</div>
                                <div className="inline-flex flex-wrap gap-8">
                                    <div className="inline-flex h-14 px-5 py-4 bg-grey_50 rounded-2xl items-center gap-4">
                                        <div className="text-grey_500 text-xl font-medium">무늬는 포도가 먹고시픈뎅</div>
                                        <button>
                                            <Image
                                                src={closeIcon.src}
                                                alt="닫기아이콘"
                                                width={24}
                                                height={24}
                                            />
                                        </button>
                                    </div>
                                    
                                    <div className="inline-flex h-14 px-5 py-4 bg-grey_50 rounded-2xl items-center gap-4">
                                        <div className="text-grey_500 text-xl font-medium">국이 왜 이렇게 짜?</div>
                                        <button>
                                            <Image
                                                src={closeIcon.src}
                                                alt="닫기아이콘"
                                                width={24}
                                                height={24}
                                            />
                                        </button>
                                    </div>
                                    <div className="inline-flex h-14 px-5 py-4 bg-grey_50 rounded-2xl items-center gap-4">
                                        <div className="text-grey_500 text-xl font-medium">짜긴 뭐가 짜...</div>
                                        <button>
                                            <Image
                                                src={closeIcon.src}
                                                alt="닫기아이콘"
                                                width={24}
                                                height={24}
                                            />
                                        </button>
                                    </div>
                                    <div className="inline-flex h-14 px-5 py-4 bg-grey_50 rounded-2xl items-center gap-4">
                                        <div className="text-grey_500 text-xl font-medium">짜요 어머님 너무 쫄았나봐요</div>
                                        <button>
                                            <Image
                                                src={closeIcon.src}
                                                alt="닫기아이콘"
                                                width={24}
                                                height={24}
                                            />
                                        </button>
                                    </div>
                                    <div className="inline-flex h-14 px-5 py-4 bg-grey_50 rounded-2xl items-center gap-4">
                                        <div className="text-grey_500 text-xl font-medium">짜다니깐 쯧</div>
                                        <button>
                                            <Image
                                                src={closeIcon.src}
                                                alt="닫기아이콘"
                                                width={24}
                                                height={24}
                                            />
                                        </button>
                                    </div>
                                    <div className="inline-flex h-14 px-5 py-4 bg-grey_50 rounded-2xl items-center gap-4">
                                        <div className="text-grey_500 text-xl font-medium">호구마요?</div>
                                        <button>
                                            <Image
                                                src={closeIcon.src}
                                                alt="닫기아이콘"
                                                width={24}
                                                height={24}
                                            />
                                        </button>
                                    </div>
                                    <div className="inline-flex h-14 px-5 py-4 bg-grey_50 rounded-2xl items-center gap-4">
                                        <div className="text-grey_500 text-xl font-medium">호.박.고.구.마</div>
                                        <button>
                                            <Image
                                                src={closeIcon.src}
                                                alt="닫기아이콘"
                                                width={24}
                                                height={24}
                                            />
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}