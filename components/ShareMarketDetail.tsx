import AnsChoiceButton from "./button/AnsChoiceButton"
import BlackButton from "./button/BlackButton"
import BlackLinedButton from "./button/BlackLinedButton"
import GreyButton from "./button/GreyButton"
import LikeButton from "./button/LikeButton"
import NextButton from "./button/NextButton"
import NotUseFullButton from "./button/NotUseFullButton"
import PrevButton from "./button/PrevButton"
import PrimaryButton from "./button/PrimaryButton"
import SeeMoreButton from "./button/SeeMoreButton"
import UploadButton from "./button/UploadButton"
import UseFullButton from "./button/UseFullButton"
import AnswerStateTag from "./tag/AnswerStateTag"
import NewTag from "./tag/NewTag"
import TxStateTag from "./tag/TxStateTag"
import TxTypeTag from "./tag/TxTypeTag"

type ResponseData = {
  title: string
}[]

export default function ShareMarketDetail({
  responseData
}: {
  responseData: ResponseData
}) {
  console.log(responseData)
  return (
    <div>
      <h1>나눔장터 상세</h1>
      <PrimaryButton label="PrimaryButton" />
      <BlackButton label="BlackButton" />
      <GreyButton label="GreyButton" />
      <BlackLinedButton label="BlackLinedButton" />
      <LikeButton
        label="LikeButton"
        like={true}
      />
      <UploadButton />
      <SeeMoreButton />
      <TxTypeTag subcategory="used" />
      <TxStateTag issaled="onsale" />
      <NewTag />
      <AnswerStateTag answer="answerd" />
      <PrevButton />
      <NextButton />
      <UseFullButton
        usefull={true}
        usefullcount="24"
      />
      <NotUseFullButton
        usefull={true}
        notusefullcount="24"
      />
      <AnsChoiceButton ischoice={false} />
    </div>
  )
}
