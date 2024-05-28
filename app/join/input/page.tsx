"use client"

import { useRouter } from "next/navigation";

export default function AuthPage() {
    const router = useRouter();

    const onClickNextButton = () => {
    }
    
    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <div className="pt-[50px]"></div>
                <div className="w-[486px] h-[440px] flex-col justify-start items-start gap-8 inline-flex">
                    <div className="h-10 flex-col justify-start items-start gap-8 flex ">
                        <div className="w-[486px] justify-start items-center inline-flex">
                            <div className="w-[120px] h-8 text-zinc-600 text-base font-normal font-['Pretendard']">이름</div>
                            <div className="w-[336px] h-8 text-neutral-800 text-base font-semibold font-['Pretendard']">김패캠</div>
                        </div>
                        <div className="w-[486px] justify-start items-center inline-flex">
                            <div className="w-[120px] h-8 text-zinc-600 text-base font-normal font-['Pretendard']">휴대폰 번호</div>
                            <div className="w-[336px] h-8 text-neutral-800 text-base font-semibold font-['Pretendard']">010-1234-1234</div>
                        </div>
                        <div className="w-[486px] h-16 justify-start items-center inline-flex">
                            <div className="w-[120px] h-8 text-zinc-600 text-base font-normal font-['Pretendard']">아이디</div>
                            <div className="flex-col inline-flex">
                                <input className="grow h-10 px-4 bg-stone-50 rounded-[7px] border border-gray-200"/>
                                <label className="text-neutral-400 text-sm font-normal font-['Pretendard']">6글자 이상의 영문, 숫자,_만 입력할 수 있습니다.</label>
                            </div>
                            
                        </div>
                        <div className="w-[486px] justify-start items-center inline-flex">
                            <div className="w-[120px] h-8 text-zinc-600 text-base font-normal font-['Pretendard']">비밀번호</div>
                            <input className="grow shrink basis-0 h-10 px-4 bg-stone-50 rounded-[7px] border border-gray-200"/>
                        </div>
                        <div className="w-[486px] justify-start items-center inline-flex">
                            <div className="w-[120px] h-8 text-zinc-600 text-base font-normal font-['Pretendard']">비밀번호 확인</div>
                            <div className="flex-col inline-flex">
                                <input className="h-10 px-4 bg-stone-50 rounded-[7px] border border-gray-200"/>
                                <label className="text-neutral-400 text-sm font-normal font-['Pretendard'] whitespace-nowrap">확인란에 입력할 비밀번호는 상단 내용과 동일해야 합니다.</label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="pt-[50px] pb-[102px] flex-col justify-start items-start gap-4 flex">
                        <button className="w-[486px] px-[200px] py-6 bg-dark_color rounded 
                                        justify-center items-center gap-2.5 inline-flex 
                                        text-center text-white text-lg font-semibold font-['Pretendard']"
                                onClick={onClickNextButton}>다음</button>
                </div>
            </div>
        </div>
    );
}