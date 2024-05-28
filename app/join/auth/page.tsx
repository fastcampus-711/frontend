"use client"
import { useRouter } from "next/navigation";
import Checkbox from "../component/Checkbox";

export default function AuthPage() {
    const router = useRouter();

    const onClickNextButton = () => {
        router.push("/join/input")
    }
    
    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <div className="pt-[50px]"></div>
                <div className="w-[486px] h-[440px] flex-col justify-start items-start gap-8 inline-flex">
                    <div className="w-[486px] justify-between items-center inline-flex">
                        <div className="justify-start items-center flex">
                            <div className="w-[120px] h-10 text-neutral-800 text-[22px] font-medium font-['Pretendard']">본인인증</div>
                        </div>
                        <div className="border-b border-neutral-400 justify-start items-center flex">
                            <div className="h-5 text-right text-neutral-400 text-sm font-normal font-['Pretendard']">본인인증없이 회원가입</div>
                        </div>
                    </div>

                    <div className="h-10 flex-col justify-start items-start gap-8 flex ">
                        <div className="w-[486px] justify-start items-center inline-flex">
                            <div className="w-[120px] h-8 text-zinc-600 text-base font-normal font-['Pretendard']">이름</div>
                            <input className="grow shrink basis-0 h-10 px-4 bg-stone-50 rounded-[7px] border border-gray-200"/>
                        </div>
                        <div className="w-[486px] justify-start items-center inline-flex">
                            <div className="w-[120px] h-8 text-zinc-600 text-base font-normal font-['Pretendard']">주민번호</div>
                            <div className="w-[270px] h-10 justify-start items-center gap-4 inline-flex">
                                <input className="w-[120px] h-10 px-4 bg-stone-50 rounded-[7px] border border-gray-200"/>
                                <div className="text-neutral-400 text-base font-normal font-['Pretendard']">-</div>
                                <input className="w-[29px] h-10 px-4 bg-stone-50 rounded-lg border border-gray-200"/>
                                <div className="text-neutral-400 text-base font-normal font-['Pretendard'] tracking-[4px]">******</div>
                            </div>
                            {/* <input className="grow shrink basis-0 h-10 bg-stone-50 rounded-[7px] border border-gray-200"/> */}
                        </div>
                        <div className="w-[486px] justify-start items-center inline-flex">
                            <div className="w-[120px] h-8 text-zinc-600 text-base font-normal font-['Pretendard']">성별</div>
                            <div className="h-5 justify-start items-center gap-6 inline-flex">
                                <Checkbox use="check" label="남자"/>
                                <Checkbox use="check" label="여자"/>
                                {/* <span className="justify-start items-start gap-1 flex">
                                    <img src={autologin_checkbox_Icon.src} className="w-5 h-5 pl-[2.25px] pr-[2.92px] pt-[2.25px] pb-[2.92px] justify-center items-center flex" />
                                    <label className="text-center text-zinc-600 text-base font-normal font-['Pretendard']">남자</label>
                                </span>
                                <span className="justify-start items-start gap-1 flex">
                                    <img src={autologin_checkbox_Icon.src} className="w-5 h-5 pl-[2.25px] pr-[2.92px] pt-[2.25px] pb-[2.92px] justify-center items-center flex" />
                                    <label className="text-center text-zinc-600 text-base font-normal font-['Pretendard']">여자</label>
                                </span> */}
                            </div>
                        </div>
                        <div className="w-[486px] justify-start items-center inline-flex">
                            <div className="w-[120px] h-8 text-zinc-600 text-base font-normal font-['Pretendard']">통신사 선택</div>
                            <div className="h-[88px] flex-col justify-start items-start gap-2 inline-flex">
                                <div className="justify-start items-start gap-2 inline-flex">
                                <div className="hover:cursor-pointer w-[62px] px-4 py-2.5 bg-stone-50 rounded-lg border border-gray-200 justify-start items-center gap-6 flex">
                                <div className="text-zinc-600 text-base font-normal font-['Pretendard']">SKT</div>
                                </div>
                                <div className="hover:cursor-pointer w-[52px] px-4 py-2.5 bg-stone-50 rounded-lg border border-gray-200 justify-start items-center gap-6 flex">
                                <div className="text-zinc-600 text-base font-normal font-['Pretendard']">KT</div>
                                </div>
                                <div className="hover:cursor-pointer w-[77px] px-4 py-2.5 bg-stone-50 rounded-lg border border-gray-200 justify-start items-center gap-6 flex">
                                <div className="text-zinc-600 text-base font-normal font-['Pretendard'] whitespace-nowrap">LG U+</div>
                                </div>
                                </div>
                                <div className="justify-start items-start gap-2 inline-flex">
                                <div className="hover:cursor-pointer w-[107px] px-4 py-2.5 bg-stone-50 rounded-lg border border-gray-200 justify-start items-center gap-6 flex">
                                <div className="text-zinc-600 text-base font-normal font-['Pretendard'] whitespace-nowrap">SKT 알뜰폰</div>
                                </div>
                                <div className="hover:cursor-pointer w-[98px] px-4 py-2.5 bg-stone-50 rounded-lg border border-gray-200 justify-start items-center gap-6 flex">
                                <div className="text-zinc-600 text-base font-normal font-['Pretendard'] whitespace-nowrap">KT 알뜰폰</div>
                                </div>
                                <div className="hover:cursor-pointer w-[123px] px-4 py-2.5 bg-stone-50 rounded-lg border border-gray-200 justify-start items-center gap-6 flex">
                                <div className="text-zinc-600 text-base font-normal font-['Pretendard'] whitespace-nowrap">LG U+ 알뜰폰</div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[486px] justify-start items-center inline-flex">
                            <div className="w-[120px] h-8 text-zinc-600 text-base font-normal font-['Pretendard']">휴대폰 번호</div>
                            <input className="w-[239px] h-10 px-4 bg-stone-50 rounded-lg border border-gray-200 justify-start items-center inline-flex"
                                   placeholder="- 없이 입력"/>
                            <span className="pr-2" />
                            <button className="w-[120px] h-10 px-2 bg-zinc-600 rounded-lg justify-start items-center gap-2 inline-flex
                                               text-zinc-100 text-base font-normal font-['Pretendard'] whitespace-nowrap">인증번호 요청</button>
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