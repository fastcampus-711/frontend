import { AppDispatch } from "@/redux/store"
import { useSelector, useDispatch } from "react-redux"
import { closeModal } from "@/redux/slices/modalSlice"
import closeWhiteIcon from "@/public/icon/close_white.svg"
import Image from "next/image"

type ConfirmProps = {
  title?: string
  content_title?: string
  content_description?: string
  onClick?: () => void
  onCancel?: () => void
}

export default function Confirm({
  title,
  content_title,
  content_description,
  onClick,
  onCancel
}: ConfirmProps) {
  const dispatch = useDispatch<AppDispatch>()
  const isModalOpen = useSelector((state: any) => state.modal.isOpen)

  const handleClose = () => {
    dispatch(closeModal())
    if (onCancel) {
      onCancel()
    }
  }

  if (!isModalOpen) {
    return null
  }

  return (
    <div className="w-[500px] rounded-2xl overflow-hidden shadow-md">
      <div className="flex justify-between px-6 py-4 bg-[#0D787A]">
        <div className="w-6"></div>
        <span className="text-white text-lg font-medium">{title}</span>
        <div>
          <Image
            src={closeWhiteIcon.src}
            alt="닫기아이콘"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "24px", height: "auto" }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-6 px-6 pt-6 pb-8 font-medium text-center">
        <p className="text-grey_900 text-xl">{content_title}</p>
        <p className="text-grey_500 text-lg ">{content_description}</p>
      </div>
      <div className="flex text-lg font-medium border-t border-grey_200">
        <div
          className="flex flex-1 justify-center px-6 py-5 text-grey_500 border-r border-grey_200"
          onClick={handleClose}>
          취소
        </div>
        <div
          className="flex flex-1 justify-center px-6 py-5 text-[#0D787A]"
          onClick={onClick}>
          확인
        </div>
      </div>
    </div>
  )
}
