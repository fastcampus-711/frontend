// "use client"

// import Link from "next/link"
// import { useState } from "react"
// import { useRouter } from "next/navigation"

// import autologin_false_icon from "@/public/icon/auto_login_false.svg"
// import autologin_true_icon from "@/public/icon/auto_login_true.svg"

// export default function LoginContent() {
//   const [id, setId] = useState("")
//   const [pwd, setPwd] = useState("")
//   const [autoLogin, setAutoLogin] = useState(false)

//   const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
//     setId(event.currentTarget.value)
//   }

//   const handlePwdChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ): void => {
//     setPwd(event.currentTarget.value)
//   }

//   const router = useRouter()

//   const onClickJoinButton = () => {
//     router.push("/user/join/terms")
//   }

//   const width = 486
//   const height = 455

//   function inputComponent(text: string) {
//     return (
//       <input
//         required={true}
//         className="w-[486px] px-4 py-6 bg-grey_25
//                     rounded border border-gray-200
//                     text-grey_250 text-base font-normal"
//         placeholder={text}></input>
//     )
//   }
//   return (
//     <>
//       <div className="flex flex-col gap-20">
//         <div className="flex flex-col gap-10">
//           <div className="flex flex-col gap-2">
//             {inputComponent("아이디 입력")}
//             {inputComponent("비밀번호 입력")}
//           </div>
//           <div className="flex flex-col gap-4">
//             <button
//               className="w-[486px] px-[200px] py-6 gap-2.5
//                                     bg-main_color rounded
//                                     text-center text-white text-lg font-semibold"
//               onClick={() => {}}>
//               로그인
//             </button>
//             <div className="inline-flex justify-between">
//               <span
//                 className="inline-flex gap-1  hover:cursor-pointer"
//                 onClick={() => setAutoLogin(!autoLogin)}>
//                 <img
//                   src={
//                     autoLogin == false
//                       ? autologin_false_icon.src
//                       : autologin_true_icon.src
//                   }
//                 />
//                 <p
//                   className={`hover:cursor-pointer hover:text-grey_500 text-center text-base font-normal
//                                         ${autoLogin == false ? "text-grey_200" : "text-main_color"}`}>
//                   자동로그인
//                 </p>
//               </span>
//               <span className="justify-center items-center gap-2 inline-flex flex-end">
//                 <Link
//                   href="/user/find/by-name-and-phone"
//                   className="text-center text-neutral-300 text-base font-medium
//                                                         hover:text-grey_500">
//                   아이디찾기
//                 </Link>
//                 <p className="text-center w-4 rotate-90 border border-neutral-300"></p>
//                 <Link
//                   href="/user/find/by-id-and-phone"
//                   className="text-center text-neutral-300 text-base font-medium
//                                                         hover:text-grey_500">
//                   비밀번호찾기
//                 </Link>
//               </span>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col gap-4">
//           <p className="text-grey_200 text-base font-normal">
//             회원이 아니시라면?
//           </p>
//           <button
//             className="w-[486px] px-[200px] py-6 rounded border border-grey_250
//                         text-center text-grey_400 text-lg font-semibold"
//             onClick={onClickJoinButton}>
//             회원가입
//           </button>
//         </div>
//       </div>
//     </>
//   )
// }
"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { loginSuccess } from "@/redux/slices/authSlice"
import autologin_false_icon from "@/public/icon/auto_login_false.svg"
import autologin_true_icon from "@/public/icon/auto_login_true.svg"

export default function LoginContent() {
  const [id, setId] = useState("")
  const [pwd, setPwd] = useState("")
  const [autoLogin, setAutoLogin] = useState(false)
  const [error, setError] = useState("")
  const dispatch = useDispatch()

  const router = useRouter()

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setId(event.currentTarget.value)
  }

  const handlePwdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPwd(event.currentTarget.value)
  }

  const handleLogin = async () => {
    try {
      const response = await fetch("https://711.ha-ving.store/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: id, password: pwd })
      })

      if (response.ok) {
        console.log("로그인 성공")
        const responseData = await response.json()
        const accessToken = responseData.data.access_token
        const refreshToken = responseData.data.refresh_token
        // document.cookie = `accessToken=${accessToken}; path=/; domain=.ha-ving.store`
        document.cookie = `accessToken=${accessToken}; path=/; domain=.ha-ving.store;SameSite=None; Secure`
        localStorage.setItem("accessToken", accessToken)

        dispatch(
          loginSuccess({
            accessToken: accessToken,
            refreshToken: "refreshToken"
          })
        )
        router.push("/")
      } else {
        console.error("로그인 실패")
      }
    } catch (error) {
      console.error("에러 발생:", error)
    }
  }

  const onClickJoinButton = () => {
    router.push("/user/join/terms")
  }

  return (
    <>
      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <input
              required={true}
              className="w-[486px] px-4 py-6 bg-grey_25
                    rounded border border-gray-200 
                    text-grey_250 text-base font-normal"
              placeholder="아이디 입력"
              value={id}
              onChange={handleIdChange}
            />
            <input
              required={true}
              className="w-[486px] px-4 py-6 bg-grey_25
                    rounded border border-gray-200 
                    text-grey_250 text-base font-normal"
              placeholder="비밀번호 입력"
              type="password"
              value={pwd}
              onChange={handlePwdChange}
            />
          </div>
          <div className="flex flex-col gap-4">
            <button
              className="w-[486px] px-[200px] py-6 gap-2.5
                                    bg-main_color rounded 
                                    text-center text-white text-lg font-semibold"
              onClick={handleLogin}>
              로그인
            </button>
            <div className="inline-flex justify-between">
              <span
                className="inline-flex gap-1  hover:cursor-pointer"
                onClick={() => setAutoLogin(!autoLogin)}>
                <img
                  src={
                    autoLogin == false
                      ? autologin_false_icon.src
                      : autologin_true_icon.src
                  }
                />
                <p
                  className={`hover:cursor-pointer hover:text-grey_500 text-center text-base font-normal
                                        ${autoLogin == false ? "text-grey_200" : "text-main_color"}`}>
                  자동로그인
                </p>
              </span>
              <span className="justify-center items-center gap-2 inline-flex flex-end">
                <Link
                  href="/user/find/by-name-and-phone"
                  className="text-center text-neutral-300 text-base font-medium
                                                        hover:text-grey_500">
                  아이디찾기
                </Link>
                <p className="text-center w-4 rotate-90 border border-neutral-300"></p>
                <Link
                  href="/user/find/by-id-and-phone"
                  className="text-center text-neutral-300 text-base font-medium
                                                        hover:text-grey_500">
                  비밀번호찾기
                </Link>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-grey_200 text-base font-normal">
            회원이 아니시라면?
          </p>
          <button
            className="w-[486px] px-[200px] py-6 rounded border border-grey_250
                        text-center text-grey_400 text-lg font-semibold"
            onClick={onClickJoinButton}>
            회원가입
          </button>
        </div>
      </div>
      {error && <p>{error}</p>}
    </>
  )
}
