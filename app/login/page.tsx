
"use client"

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"

import autologin_checkbox_Icon from "@/public/icon/autologin_checkbox.svg"
import agree_checked_icon from "@/public/icon/agree_checked_checkbox.svg"

export default function Login() {
    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");
    const [autoLogin, setAutoLogin] = useState(false);

    const [loginInfo, setLoginInfo] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);

    const LoginCheck = () => {
        
        setPopupOpen(true);
        console.log("id: ",id," pwd: ",pwd);
    }

    const handleIdChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setId(event.currentTarget.value);
    };

    const handlePwdChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setPwd(event.currentTarget.value);
    };

    const handleSignin = async (): Promise<void> => {
        try {
            // const response = await {

            // };
            // const accessToken = response.data.data.acc

            console.log("로그인 성공");
        }
        catch(error) {
            console.log("로그인 실패", error);
        }
        return;
    };

    const router = useRouter();

    const onClickJoinButton = () => {
        router.push("/join/terms")
    }
    
    const width = 486;
    const height= 455;

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-auto w-[1200px] m-auto border-b border-neutral-700">
                <div className="px-[20px] py-[22px] text-black text-[22px] font-normal font-['Pretendard']">로그인</div>
            </div>

            <div className={`pt-[100px] w-[${width}px]  flex-col justify-center items-center gap-4 inline-flex`}>
                <div className="flex-col justify-start items-start gap-10 flex">
                    <div className="flex-col justify-start items-start gap-2 inline-flex">
                        <input required={true} 
                                className="w-[486px] px-4 py-6 bg-stone-50 
                                        rounded border border-gray-200 
                                        justify-start items-center gap-2.5 inline-flex 
                                        text-neutral-400 text-base font-normal font-['Pretendard']" 
                                placeholder="아이디 입력"
                                />
                        <input required={true} 
                                type="password"
                                className="w-[486px] px-4 py-6 bg-stone-50 
                                            rounded border border-gray-200 
                                            justify-start items-center gap-2.5 inline-flex 
                                            text-neutral-400 text-base font-normal font-['Pretendard']" 
                                placeholder="비밀번호 입력"
                                />
                    </div>
                </div>
                
                <div className="pt-10 flex-col justify-start items-start gap-4 flex">
                    <div>
                        <button className="w-[486px] px-[200px] py-6 bg-dark_color rounded 
                                    justify-center items-center gap-2.5 inline-flex 
                                    text-center text-white text-lg font-semibold font-['Pretendard']"
                                onClick={() => {
                                    // setOpenPopup(!isOpenPopup);
                                    LoginCheck();
                                }}>로그인</button>
                    </div>
                    <div className="w-[486px] justify-start items-start gap-[160px] inline-flex">
                        <span className="hover:cursor-pointer justify-center items-center gap-1 flex"
                              onClick={() => setAutoLogin(!autoLogin)}>
                            <img src={autoLogin == false ? autologin_checkbox_Icon.src : agree_checked_icon.src} />
                            <label className={`hover:cursor-pointer hover:text-zinc-600 text-center text-base font-normal font-['Pretendard'] 
                                                ${autoLogin == false ? "text-neutral-300" : "text-font_main"}`}>자동로그인</label>
                        </span>
                        <span className="justify-center items-center gap-2 inline-flex flex-end">
                            <Link href="/login/findUserInfo" className="text-center text-neutral-300 text-base font-medium font-['Pretendard']
                                                      hover:text-zinc-600">아이디찾기</Link>
                            <label className="text-center w-4 rotate-90 border border-neutral-300"></label>
                            <Link href="/login/findUserInfo" className="text-center text-neutral-300 text-base font-medium font-['Pretendard']
                                                      hover:text-zinc-600">비밀번호찾기</Link>
                        </span>
                    </div>
                </div>
                <div className="pt-20 pb-[102px] flex-col justify-start items-start gap-4 flex">
                    <div className="text-center text-neutral-300 text-base font-normal font-['Pretendard']">회원이 아니시라면?</div>
                    <button className="w-[486px] h-16 px-[200px] py-6 rounded border border-neutral-400 justify-center items-center gap-2.5 inline-flex
                        text-center text-stone-500 text-lg font-semibold font-['Pretendard']
                        hover:bg-gray-200 "
                        onClick={onClickJoinButton}>회원가입</button>
                </div>
            </div>
            {/* {popupOpen && <Popup2 isOpen={popupOpen} onClose={() => setPopupOpen(false) } 
            content1="글 작성을 취소하시겠어요?" content2="임시저장 혹은 저장하지 않고 페이지를 벗어날 경우, 지금까지 작성한 내용이 사라집니다." 
            button1="머무르기" button2="페이지에서 나가기"/>} */}
        </div>
  );
}