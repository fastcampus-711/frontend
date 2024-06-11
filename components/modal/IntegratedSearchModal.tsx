"use client"

import Image from "next/image"
import closeIcon from "@/public/icon/close.svg"
import closeIcon_thick from "@/public/icon/close_thick.svg"
import searchIcon from "@/public/icon/search.svg"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"


type keyInterface = {
    id: number
    text: string
}
export default function IntegratedSearchModal({isOpen, onClose, content} : {isOpen: boolean, onClose: ()=> void, content: boolean}) {
    const [searchWord, setSearchWord] = useState("")
    const [saveKeyword, setSaveKeyword] = useState<keyInterface[]>([])
    const [space, isSpace] = useState("") 
    const router = useRouter()

    const handleSearch = () => {
        if(searchWord === "" || searchWord.charAt(0) === " ") {
            isSpace("첫 글자에 공백 없이 최소 1글자 이상 입력해주세요.")
        } else {
            handleAddKeyword(searchWord)
            isSpace("")
            router.push(`/integratedSearch?keyword=${searchWord}`)
            onClose()
        }
    }

    useEffect(() => {
        if(typeof window !== undefined || typeof window !== "undefined") {
            const result = localStorage.getItem("keywords") || "[]"
            setSaveKeyword(JSON.parse(result))
        }
    },[])

    useEffect(() => {
        localStorage.setItem("keywords", JSON.stringify(saveKeyword))
    }, [saveKeyword])

    const handleAddKeyword = (text: string) => {
        const checkWord = saveKeyword.find((data) => data.text === text)
        if(!checkWord) {
            const newKeyword = {
                id: Date.now(),
                text: text
            }
            setSaveKeyword([newKeyword, ...saveKeyword])
        } else if(checkWord) {
            const newKeyword = {
                id: Date.now(),
                text: text
            }
            const filtered = saveKeyword.filter((data) => data.text !== text)
            setSaveKeyword([newKeyword, ...filtered])
        }
    }
    const handleRemoveKeyword = (id: number) => {
        const nextKeyword = saveKeyword.filter((keyword) => {
            return keyword.id != id
        })
        setSaveKeyword(nextKeyword)
        if(searchWord !== "") {
            setSearchWord("")
        }
    }
    const handleClearKeywords = () => {
        setSaveKeyword([])
    }
    if(!isOpen) return null
    
    return (
        <div className="flex fixed inset-0 bg-grey_800 bg-opacity-50 justify-center items-start z-50">
            <div className="w-[1080px] bg-white rounded-2xl overflow-hidden mt-[200px] ">
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
                                    <button onClick={() => {
                                        handleSearch()
                                        
                                        setSearchWord("")
                                    }}>
                                        <Image
                                            src={searchIcon.src}
                                            alt="검색아이콘"
                                            width={40}
                                            height={40}
                                        />
                                    </button>
                                </div>
                                
                            </div>
                            <p className={`text-point_1`}>{space}</p>
                            <div className="flex flex-col gap-6">
                                <div className="text-xl font-medium">최근 검색어</div>
                                <div className="inline-flex flex-wrap gap-8">
                                    {saveKeyword.length ? (saveKeyword.map((word) => (
                                        <li key={word.id}
                                            className="inline-flex h-14 px-5 py-4 bg-grey_50 rounded-2xl items-center gap-4 ">
                                            <p className="text-grey_500 text-xl font-medium hover:cursor-pointer"
                                                onClick={() => setSearchWord(word.text)}>{word.text}</p>
                                            <button onClick={() => handleRemoveKeyword(word.id)}>
                                                <Image
                                                    src={closeIcon.src}
                                                    alt="닫기아이콘"
                                                    width={24}
                                                    height={24}
                                                />
                                            </button>
                                        </li>
                                    ))): (
                                        <div>최근 검색어가 없습니다.</div>
                                    )}
                                    {/* <div className="inline-flex h-14 px-5 py-4 bg-grey_50 rounded-2xl items-center gap-4">
                                        <div className="text-grey_500 text-xl font-medium">test</div>
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
                                        <div className="text-grey_500 text-xl font-medium">123</div>
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
                                        <div className="text-grey_500 text-xl font-medium">456</div>
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
                                        <div className="text-grey_500 text-xl font-medium">789</div>
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
                                        <div className="text-grey_500 text-xl font-medium">100</div>
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
                                        <div className="text-grey_500 text-xl font-medium">104</div>
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
                                        <div className="text-grey_500 text-xl font-medium">1004</div>
                                        <button>
                                            <Image
                                                src={closeIcon.src}
                                                alt="닫기아이콘"
                                                width={24}
                                                height={24}
                                            />
                                        </button>
                                    </div> */}

                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}