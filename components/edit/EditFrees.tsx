import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { AppDispatch } from "@/redux/store"
import { setCategory } from "@/redux/slices/categorySlice"
import PrimaryButton from "../button/PrimaryButton"
import DropDown from "../dropdown/DropDown"
import closeIcon from "@/public/icon/close.svg"
import imgIcon from "@/public/icon/img.svg"
import Image from "next/image"
import GreyButton from "../button/GreyButton"

type Options = {
  value: number
  name: string
}

export default function EditFrees() {
  const router = useRouter()
  const currentPost = useSelector((state: any) => state.post.currentPost)
  const category = useSelector((state: any) => state.category)
  const dispatch = useDispatch<AppDispatch>()
  const [selectedBoard, setSelectedBoard] = useState<number>(0)
  const [selectedType, setSelectedType] = useState<number>(0)
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [imageUrls, setImageUrls] = useState<string[]>([])

  const boardOptions: Options[] = [
    { value: 11, name: "자유게시판" },
    { value: 12, name: "나눔장터" },
    { value: 13, name: "QnA" }
  ]

  const typeOptions: Options[] = [
    { value: 12, name: "취미・운동" },
    { value: 13, name: "생활・편의" },
    { value: 14, name: "음식・카페" },
    { value: 15, name: "병원・약국" },
    { value: 16, name: "수리・시공" },
    { value: 17, name: "투자・부동산" },
    { value: 18, name: "교육・육아" },
    { value: 19, name: "아파트・동네소식" },
    { value: 20, name: "여행" },
    { value: 21, name: "살림정보" },
    { value: 22, name: "모임・동호회" },
    { value: 23, name: "기타" }
  ]

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ""
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  useEffect(() => {
    if (category.value === "frees") {
      setSelectedBoard(11)
    } else if (category.value === "markets") {
      setSelectedBoard(12)
    } else if (category.value === "qna") {
      setSelectedBoard(13)
    }
  }, [category.value])

  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.title)
      setContent(currentPost.content)
      setSelectedType(currentPost.category_id)
      if (currentPost.image_urls) {
        setImageUrls(currentPost.image_urls)
      }
    }
  }, [currentPost])

  const handleBoardChange = (value: number) => {
    setSelectedBoard(value)
    setSelectedType(0)
    if (value === 11) {
      dispatch(setCategory("frees"))
    } else if (value === 12) {
      dispatch(setCategory("markets"))
    } else if (value === 13) {
      dispatch(setCategory("qna"))
    }
  }

  // const handleBoardChange = (value: number) => {
  //   const confirmChange = window.confirm(
  //     "게시판을 변경할 경우, 지금까지 작성한 내용이 사라집니다."
  //   )

  //   if (confirmChange) {
  //     setSelectedBoard(value)
  //     setSelectedType(0)

  //     if (value === 11) {
  //       dispatch(setCategory("frees"))
  //     } else if (value === 12) {
  //       dispatch(setCategory("markets"))
  //     } else if (value === 13) {
  //       dispatch(setCategory("qnas"))
  //     }
  //   }
  // }

  const handleTypeChange = (value: number) => {
    setSelectedType(value)
  }

  const validateFile = (file: File): boolean => {
    const allowedExtensions = ["png", "jpg", "jpeg", "gif"]
    const maxSize = 10 * 1024 * 1024 // 10MB

    const extension = file.name.split(".").pop()?.toLowerCase()
    if (!extension || !allowedExtensions.includes(extension)) {
      alert("이미지는 PNG, JPG, GIF 형식만 업로드 가능합니다.")
      return false
    }

    if (file.size > maxSize) {
      alert("파일 크기는 최대 10MB를 넘을 수 없습니다.")
      return false
    }

    return true
  }

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const validFiles = Array.from(files).filter(validateFile)
      if (validFiles.length === 0) return

      const formData = new FormData()
      validFiles.forEach(file => {
        formData.append("files", file)
      })
      try {
        const response = await fetch("https://711.ha-ving.store/attach", {
          method: "POST",

          body: formData
        })
        console.log(formData)
        if (response.ok) {
          const data = await response.json()
          console.log(data)
          const newUrls = data.map((item: { url: string }) => item.url)
          setImageUrls(prev => [...prev, ...newUrls])
          console.log(newUrls)
        } else {
          console.error("이미지 업로드 실패")
        }
      } catch (error) {
        console.error("에러 발생:", error)
      }
    }
  }

  const handleImageDelete = (url: string) => {
    setImageUrls(prev => prev.filter(image => image !== url))
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const category_id = selectedType
    const title = formData.get("title")
    const content = formData.get("content")
    const visible = true
    const updatedItem: Partial<{
      category_id: number
      title: FormDataEntryValue | null
      content: FormDataEntryValue | null
      visible: boolean
      image_urls: string[]
      id?: number
    }> = {
      category_id: category_id,
      title: title,
      content: content,
      visible: visible,
      image_urls: imageUrls
    }

    let url = `https://711.ha-ving.store/boards/${category.value}/`
    let method = "POST"

    if (currentPost) {
      url = `https://711.ha-ving.store/boards/${category.value}/${currentPost.id}`
      method = "PUT"
      updatedItem.id = currentPost.id
    }
    console.log(updatedItem, url)
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzUxMiJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS83OTI3MDIyOD92PTQiLCJwYXNzd29yZCI6IiQyYSQxMCRleHhmWXAveXZzNHpiY3cyRFNDalZlREFDaTVlcWZma01HaDlsVWwwTXFBRWRUM2h5WDVEeSIsInBob25lIjoiMDEwMTExMTIyMjIiLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwibmlja25hbWUiOiJuaWNrbmFtZTEiLCJpZCI6MjEsInVzZXJuYW1lIjoidXNlciIsImF1dGgiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNzE3MDU5MjA5LCJleHAiOjE3MTk2NTEyMDl9.4bpxNGqYITfq2174mngAguJK3gQZ5gl7KzWB8N5eMQ4TV-e8_Ka7xlzCdGH8u6XEoiMywHZwJLM1_7tlAqtt0A"
        },
        body: JSON.stringify(updatedItem)
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log("게시물 등록 성공:", responseData)
        if (currentPost) {
          router.push(`/boards/${category.value}/${updatedItem.id}`)
        } else {
          router.push(`/boards/${category.value}/${responseData.data.id}`)
        }
      } else {
        console.error("게시물 등록을 실패했습니다.")
      }
    } catch (error) {
      console.error("에러 발생:", error)
    }
  }

  const handleGoBack = () => {
    if (
      confirm(
        "글 작성을 취소하시겠어요? 저장하지 않고 페이지를 벗어날 경우 지금까지 작성한 내용이 사라집니다."
      )
    ) {
      router.back()
    }
  }

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <table className="w-full">
          <tbody>
            <tr className="border-b border-grey_50">
              <td className="w-32 text-grey_900 text-lg font-medium">분류</td>
              <td className="flex items-center py-8">
                <div className="flex flex-1 gap-4">
                  <DropDown
                    label="게시판"
                    options={boardOptions}
                    event={handleBoardChange}
                    initialValue={selectedBoard}
                    disabled={!!currentPost}
                  />
                  <DropDown
                    label="분류"
                    options={typeOptions}
                    event={handleTypeChange}
                    initialValue={selectedType}
                    disabled={!!currentPost}
                  />
                </div>
              </td>
            </tr>
            <tr className="border-b border-grey_50">
              <td className="text-grey_900 text-lg font-medium align-top py-8">
                제목
              </td>
              <td className="py-8">
                <textarea
                  name="title"
                  placeholder="제목을 입력해주세요 (최대 100자)"
                  maxLength={100}
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full h-20 bg-grey_50 p-4 rounded-xl"
                />
              </td>
            </tr>
            <tr className="border-b border-grey_50">
              <td className="text-grey_900 text-lg font-medium align-top py-8">
                내용
              </td>
              <td className="py-8">
                <textarea
                  name="content"
                  placeholder={`게시글 작성시, 욕설, 비방, 허위사실 유포 등의 내용이 포함되어 있을 경우, 명예훼손으로 법적 처벌이 이루어질 수 있습니다. \n서로의 의견을 경청하고 존중해주시기 바랍니다. (최대 2,000자)`}
                  maxLength={2000}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="w-full h-40 bg-grey_50 p-4 rounded-xl"
                />
              </td>
            </tr>
            <tr className="border-b border-grey_50">
              <td className="text-grey_900 text-lg font-medium align-top py-8">
                첨부파일
              </td>
              <td className="py-8">
                <div className="flex flex-col gap-4">
                  <label htmlFor="file">
                    <div className="inline-flex gap-2 px-4 py-3 border border-[#053A3C] rounded-lg cursor-pointer">
                      <span>파일 첨부</span>
                      <Image
                        src={imgIcon.src}
                        alt="이미지아이콘"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "24px", height: "auto" }}
                      />
                    </div>
                  </label>
                  <input
                    id="file"
                    type="file"
                    onChange={handleImageChange}
                    multiple
                    className=" hidden"
                  />
                  {imageUrls && (
                    <div>
                      <div className="flex gap-4 max-w-[1080px] overflow-x-auto">
                        {imageUrls.map(imageUrl => (
                          <div
                            key={imageUrl}
                            className="flex w-60 px-4 py-3 border border-grey_200 rounded-lg">
                            <span className="truncate ">{imageUrl}</span>
                            <Image
                              src={closeIcon.src}
                              alt="닫기버튼"
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{ width: "24px", height: "auto" }}
                              onClick={() => handleImageDelete(imageUrl)}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        {imageUrls.map(imageUrl => (
                          <div
                            key={imageUrl}
                            className="flex items-center mt-2">
                            <div className="relative w-36 h-36">
                              <Image
                                src={imageUrl}
                                alt={imageUrl}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end py-8">
          <PrimaryButton
            label="확인"
            className="h-[44px] items-center leading-3"
            type="submit"
          />
        </div>
      </form>
      <div className="inline-flex pl-[1032px] py-8 translate-y-[-108px]">
        <GreyButton
          label="취소"
          onClick={handleGoBack}
        />
      </div>
    </div>
  )
}
