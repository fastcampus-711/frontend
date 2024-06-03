import LoginContent from "@/components/LoginContent";

export default async function Page() {
  return (
    <div className="max-w-[1200px] m-auto">
      <div className="w-full border-b border-grey_600">
        <p className="px-5 py-[22px] text-grey_900 text-[22px] font-normal">로그인</p>
      </div>
      <div className="flex flex-col py-20 justify-center items-center">
        <LoginContent />
      </div>
    </div>
  )
}