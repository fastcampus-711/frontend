import Image from "next/image"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Pagination, Navigation } from "swiper/modules"

type BoardContentBoxProps = {
  content: string
  image_urls?: string[]
}

export default function BoardContentBox(props: BoardContentBoxProps) {
  const { content, image_urls = [] } = props
  return (
    <div className="flex flex-col gap-6 mb-20">
      <Swiper
        pagination={{
          type: "fraction"
        }}
        loop={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="w-full">
        {image_urls &&
          image_urls.map((item, index) => (
            <SwiperSlide key={index}>
              {/* <div className="w-full h-[624px] bg-slate-200">
              <Image
                src={item}
                alt="게시판이미지"
                fill
                style={{ objectFit: "contain" }}
              />
            </div> */}
              <div className="relative w-full h-[624px] bg-slate-200">
                <Image
                  src={item}
                  alt="게시판이미지"
                  fill
                  style={{ objectFit: "cover" }}
                  className="blur-lg"
                />
                <Image
                  src={item}
                  alt="게시판이미지"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <p className="text-grey_900 text-xl font-medium">{content}</p>
    </div>
  )
}
