import FindIdContent from "@/components/FindIdContent"
import FindPwdContent from "@/components/FindPwdContent"

export default async function Page({
  params
}: {
  params: { category: string, item: string }
}) {
  const { category, item } = params

  let contentComponent
  let pageName

  if (item === "by-name-and-phone") {
    contentComponent = <FindIdContent page={category}/>
    pageName="아이디/비밀번호 찾기"
  } else if (item === "by-id-and-phone") {
    contentComponent = <FindPwdContent page={category}/>
    pageName="아이디/비밀번호 찾기"
  } else {
    contentComponent = null
    pageName="사용자"
  }

  return (
    <div className="max-w-[1200px] m-auto">
      <div className="w-full border-b border-grey_600">
        <p className="px-5 py-[22px] text-grey_900 text-[22px] font-normal">{pageName}</p>
      </div>
      <div className="flex flex-col py-20 justify-center items-center">
        {contentComponent}
      </div>
    </div>
  )
}
