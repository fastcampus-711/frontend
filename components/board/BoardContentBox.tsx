// import Image from "next/image"

// type BoardContentBoxProps = {
//   content: string
// }

// export default function BoardContentBox(props: BoardContentBoxProps) {
//   const { content } = props
//   return (
//     <div className="flex flex-col gap-6 mb-20">
//       {/* <Image
//         src={
//           "https://aptners.s3.ap-southeast-1.amazonaws.com/file/63c432c7-ac92-46bc-b95f-fbbf47c08d23.png"
//         }
//         alt="게시판이미지"
//         width={0}
//         height={0}
//         sizes="100vw"
//         style={{ width: "100%", height: "auto" }} // optional
//       /> */}
//       <div className="w-full h-80 rounded-3xl bg-slate-200">img</div>
//       <p className="text-grey_900 text-xl font-medium">{content}</p>
//     </div>
//   )
// }
import Image from "next/image"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Pagination, Navigation } from "swiper/modules"

type BoardContentBoxProps = {
  content: string
}

export default function BoardContentBox(props: BoardContentBoxProps) {
  const { content } = props
  return (
    <div className="flex flex-col gap-6 mb-20">
      <Swiper
        pagination={{
          type: "progressbar"
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="w-full">
        {/* <Image
        src={
          "https://aptners.s3.ap-southeast-1.amazonaws.com/file/63c432c7-ac92-46bc-b95f-fbbf47c08d23.png"
        }
        alt="게시판이미지"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }} // optional
      /> */}
        <SwiperSlide>
          <div className="w-full h-[624px] bg-slate-200">Img 1</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[624px] bg-slate-200">Img 2</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[624px] bg-slate-200">Img 3</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[624px] bg-slate-200">Img 4</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[624px] bg-slate-200">Img 5</div>
        </SwiperSlide>
      </Swiper>
      <p className="text-grey_900 text-xl font-medium">{content}</p>
    </div>
  )
}
