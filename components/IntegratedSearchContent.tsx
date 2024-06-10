"use client"

import Image from "next/image"
import moveIcon from "@/public/icon/integratedSearch_btn.svg"
import categoryIcon from "@/public/icon/categoryDepth.svg"
import NoticesItem from "@/components/NoticesItem"
import FreeBoardItem from "@/components/FreeBoardItem"
import ShareMarketItem from "@/components/ShareMarketItem"
import Link from "next/link"
import { useEffect } from "react"
import QnaItem from "./Qnaitem"
import AnswerStateTag from "./tag/AnswerStateTag"

type Reactions = {
    count_reaction_type_good: number
    count_reaction_type_bad: number
}

type Comment = {
    nickname: string
    date: string
    id: string
    content: string
    like: boolean
    likecount: string
    child_comment?: Comment[]
    }

type Post = {
    id: number
    user_id: number
    user_nickname: string
    category_name: string
    title: string
    content: string
    image_urls?: string[] | null
    visible: boolean
    reaction_columns: Reactions | null
    count_of_comments: string
    hits: number
    comment?: Comment[]
    created_at: string
    category_id: number
    reaction_type: boolean | null
    hot: boolean
    new: boolean
    status: string
    price: number
}

type dataType = {
    count: number
    data: {
        content: Post[]
    }
}

type categories = {
    FREES: dataType
    QNAS: dataType
    NOTICES: dataType
    COMPLAINT: dataType
    MARKETS: dataType
}

export default async function IntegratedSearchContent({
    responseData,
    keyword
}: {
    responseData: categories
    keyword: string 
}) {
    // const { keyword } = searchParams

    const highlightKeyword = (title: string, keyword: string) => {
        if (!keyword) return title
        const parts = title.split(new RegExp(`(${keyword})`, "gi"))
        return (
          <>
            {parts.map((part, index) => (
              <span
                key={index}
                style={
                  part.toLowerCase() === keyword.toLowerCase()
                    ? { color: "#0D787A" }
                    : {}
                }>
                {part}
              </span>
            ))}
          </>
        )
    }

    const getCount = () => {
        return (responseData.NOTICES.count 
            + responseData.FREES.count 
            + responseData.MARKETS.count 
            + responseData.QNAS.count 
            + responseData.COMPLAINT.count)
    }
      const convertDate = (dateString: string) => {
        const date = new Date(dateString)
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const day = date.getDate().toString().padStart(2, "0")
        const hours = date.getHours().toString().padStart(2, "0")
        const minutes = date.getMinutes().toString().padStart(2, "0")
        return `${year}.${month}.${day}`
      }
    
    return (
        <div className="max-w-[1200px] flex flex-col justify-center m-auto gap-10 pb-[200px]">
            <div className="max-w-[1200px] flex py-8 gap-6 items-center">
                <p className="text-grey_900 text-[32px] font-semibold">
                    통합검색
                </p>
                <span className="inline-flex font-medium text-[22px]">
                    <p className="text-main_color">{`'${keyword}'`}</p>
                    <p className="text-grey_300">에 대한 검색 결과가 </p>
                    <p className="text-main_color px-1">{getCount()}건</p>
                    <p className="text-grey_300"> 나왔습니다.</p>
                </span>
            </div>
            <div className="w-full flex flex-col m-auto gap-6">
                <div className="flex flex-col gap-6 p-6 rounded-2xl border border-grey_200">
                    <div className="flex h-14 py-1 justify-between items-center">
                        <p className="w-[300px] text-[22px] font-medium">공지사항 ({responseData.NOTICES.count})</p>
                        <Link className="inline-flex items-center gap-4 px-4 py-3 rounded border border-grey_200"
                            href={`/boards/notices?catid=0&keyword=${keyword}&page=1`}>
                            <p>공지사항 전체보기</p>
                            <Image
                                src={moveIcon.src}
                                alt="이동 아이콘"
                                width={10}
                                height={10}
                            />
                        </Link>
                    </div>
                    {responseData.NOTICES.count === 0 ? 
                        <div className="text-center text-base font-medium text-grey_700 pb-4">
                            검색된 게시글이 없습니다.
                        </div>
                    :
                    <table className="w-full">
                        <tbody className="divide-y">
                            <tr className="bg-grey_25 border-b border-grey_900 text-grey_700 text-center font-medium">
                                <td className="px-4 py-6 w-40 ">분류</td>
                                <td className="px-4 py-6">제목</td>
                                <td className="px-4 py-6 w-40">글쓴이</td>
                                <td className="px-4 py-6 w-20">공감수</td>
                                <td className="px-4 py-6 w-20">조회수</td>
                                <td className="px-4 py-6 w-32">등록일</td>
                            </tr>
                              {responseData.NOTICES.data.content.map(item => (
                                <NoticesItem
                                    key={item.id}
                                    id={item.id}
                                    user_nickname={item.user_nickname}
                                    category_name={item.category_name}
                                    title={item.title}
                                    image_urls={item.image_urls}
                                    visible={item.visible}
                                    count_reaction_type_good={
                                    item.reaction_columns
                                        ? item.reaction_columns.count_reaction_type_good
                                        : 0
                                    }
                                    count_of_comments={item.count_of_comments}
                                    hits={item.hits}
                                    created_at={item.created_at}
                                    ishot={item.hot}
                                    isnew={item.new}
                                />
                            ))}
                        </tbody>
                    </table>}
                </div>
                <div className="flex flex-col gap-6 p-6 rounded-2xl border border-grey_200">
                    <div className="flex h-14 py-1 justify-between items-center">
                        <span className="inline-flex gap-6 w-[300px] text-[22px] font-medium">
                            <p>소통공간 </p>
                            <Image
                                src={categoryIcon.src}
                                alt="소통공간 카테고리 아이콘"
                                width={10}
                                height={10}
                            />
                            <p>자유게시판 ({responseData.FREES.count})</p>
                        </span>
                        <Link className="inline-flex items-center gap-4 px-4 py-3 rounded border border-grey_200"
                            href={`/boards/frees?catid=0&keyword=${keyword}&page=1`}>
                            <p>자유게시판 전체보기</p>
                            <Image
                                src={moveIcon.src}
                                alt="이동 아이콘"
                                width={10}
                                height={10}
                            />
                        </Link>
                    </div>
                    {responseData.FREES.count === 0 ? 
                        <div className="text-center text-base font-medium text-grey_700 pb-4">
                            검색된 게시글이 없습니다.
                        </div>
                    :
                    <table className="w-full">
                        <tbody className="divide-y">
                            <tr className="bg-grey_25 border-b border-grey_900 text-grey_700 text-center font-medium">
                                <td className="px-4 py-6 w-40 ">분류</td>
                                <td className="px-4 py-6">제목</td>
                                <td className="px-4 py-6 w-40">글쓴이</td>
                                <td className="px-4 py-6 w-20">공감수</td>
                                <td className="px-4 py-6 w-20">조회수</td>
                                <td className="px-4 py-6 w-32">등록일</td>
                            </tr>
                            
                            {responseData.FREES.data.content.map(item => (
                                <FreeBoardItem
                                key={item.id}
                                id={item.id}
                                user_nickname={item.user_nickname}
                                category_name={item.category_name}
                                title={highlightKeyword(item.title, keyword)}
                                image_urls={item.image_urls}
                                visible={item.visible}
                                count_reaction_type_good={
                                    item.reaction_columns
                                    ? item.reaction_columns.count_reaction_type_good
                                    : 0
                                }
                                count_of_comments={item.count_of_comments}
                                hits={item.hits}
                                created_at={item.created_at}
                                ishot={item.hot}
                                isnew={item.new}
                                />
                            ))}
                            
                        </tbody>
                    </table>}
                </div>
                <div className="flex flex-col gap-6 p-6 rounded-2xl border border-grey_200">
                    <div className="flex h-14 py-1 justify-between items-center">
                        <span className="inline-flex gap-6 w-[300px] text-[22px] font-medium">
                            <p>소통공간 </p>
                            <Image
                                src={categoryIcon.src}
                                alt="소통공간 카테고리 아이콘"
                                width={10}
                                height={10}
                            />
                            <p>나눔장터 ({responseData.MARKETS.count})</p>
                        </span>
                        <Link className="inline-flex items-center gap-4 px-4 py-3 rounded border border-grey_200"
                            href={`/boards/markets?catid=0&keyword=${keyword}&page=1`}>
                            <p>나눔장터 전체보기</p>
                            <Image
                                src={moveIcon.src}
                                alt="이동 아이콘"
                                width={10}
                                height={10}
                            />
                        </Link>
                    </div>
                    {responseData.MARKETS.count === 0 ? 
                        <div className="text-center text-base font-medium text-grey_700 pb-4">
                            검색된 게시글이 없습니다.
                        </div>
                    :
                    <table className="w-full">
                        <tbody className="divide-y">
                            <div className="flex gap-x-6 gap-y-12 flex-wrap">
                                {responseData.MARKETS.data.content.map(item => (
                                <div
                                    key={item.id}
                                    className="flex-1 basis-2/5 max-w-[588px]">
                                    <Link href={`/boards/markets/${item.id}`}>
                                    <ShareMarketItem
                                        status={item.status}
                                        category_name={item.category_name}
                                        image_urls={item.image_urls}
                                        title={highlightKeyword(item.title, keyword)}
                                        price={item.price}
                                        user_nickname={item.user_nickname}
                                        hits={item.hits}
                                        created_at={item.created_at}
                                        ishot={item.hot}
                                        isnew={item.new}
                                    />
                                    </Link>
                                </div>
                                ))}
                            </div>
                        </tbody>
                    </table>}
                </div>
                <div className="flex flex-col gap-6 p-6 rounded-2xl border border-grey_200">
                    <div className="flex h-14 py-1 justify-between items-center">
                        <span className="inline-flex gap-6 w-[300px] text-[22px] font-medium">
                            <p>소통공간 </p>
                            <Image
                                src={categoryIcon.src}
                                alt="소통공간 카테고리 아이콘"
                                width={10}
                                height={10}
                            />
                            <p>QnA ({responseData.QNAS.count})</p>
                        </span>
                        <Link className="inline-flex items-center gap-4 px-4 py-3 rounded border border-grey_200"
                            href={`/boards/qna?catid=0&keyword=${keyword}&page=1`}>
                            <p>QnA 전체보기</p>
                            <Image
                                src={moveIcon.src}
                                alt="이동 아이콘"
                                width={10}
                                height={10}
                            />
                        </Link>
                    </div>
                    {responseData.QNAS.count === 0 ? 
                        <div className="text-center text-base font-medium text-grey_700 pb-4">
                            검색된 게시글이 없습니다.
                        </div>
                    :
                    <table className="w-full">
                        <tbody className="divide-y">
                            <tr className="bg-grey_25 border-b border-grey_900 text-grey_700 text-center font-medium">
                                <td className="px-4 py-6 w-40 ">답변상태</td>
                                <td className="px-4 py-6">제목</td>
                                <td className="px-4 py-6 w-40">글쓴이</td>
                                <td className="px-4 py-6 w-20">조회수</td>
                                <td className="px-4 py-6 w-32">등록일</td>
                            </tr>
                            {responseData.QNAS.data.content.map(item => (
                                <tr key={item.id} className="text-grey_400 text-center font-medium">
                                    <td className="px-4 py-6 w-40 ">
                                        <AnswerStateTag status={item.status} />
                                    </td>
                                    <td className="flex px-4 py-6 items-center text-left">
                                        <Link
                                            className="mr-2"
                                            href={item.visible ? `/boards/qna?catid=0&keyword=${keyword}&page=1` : "#"}>
                                            <p className="font-medium">{highlightKeyword(item.title, keyword)}</p>
                                        </Link>
                                    </td>
                                    <td className="px-4 py-6 w-40">{item.user_nickname}</td>
                                    <td className="px-4 py-6 w-20">{item.hits}</td>
                                    <td className="px-4 py-6 w-32">{convertDate(item.created_at)}</td>
                                </tr>
                                ))}
                        </tbody>
                    </table>}
                </div>
                <div className="flex flex-col gap-6 p-6 rounded-2xl border border-grey_200">
                    <div className="flex h-14 py-1 justify-between items-center">
                        <p className="w-[300px] text-[22px] font-medium">민원게시판 ({responseData.COMPLAINT.count})</p>
                        <Link className="inline-flex items-center gap-4 px-4 py-3 rounded border border-grey_200"
                            href={`/boards/complaint?catid=0&keyword=${keyword}&page=1`}>
                            <p>민원게시판 전체보기</p>
                            <Image
                                src={moveIcon.src}
                                alt="이동 아이콘"
                                width={10}
                                height={10}
                            />
                        </Link>
                    </div>
                    {responseData.COMPLAINT.count === 0 ? 
                        <div className="text-center text-base font-medium text-grey_700 pb-4">
                            검색된 게시글이 없습니다.
                        </div>
                    :
                    <table className="w-full">
                        <tbody className="divide-y">
                            <tr className="bg-grey_25 border-b border-grey_900 text-grey_700 text-center font-medium">
                                <td className="px-4 py-6 w-40 ">분류</td>
                                <td className="px-4 py-6">제목</td>
                                <td className="px-4 py-6 w-40">글쓴이</td>
                                <td className="px-4 py-6 w-20">공감수</td>
                                <td className="px-4 py-6 w-20">조회수</td>
                                <td className="px-4 py-6 w-32">등록일</td>
                            </tr>
                            {/* {responseData.map(item => (
                                <ComplaintItem
                                key={item.id}
                                id={item.id}
                                isanswer={item.isanswer}
                                isnew={item.isnew}
                                title={item.title}
                                content={item.content}
                                nickname={item.nickname}
                                date={item.date}
                                count_of_comments={item.count_of_comments}
                                comment={item.comment}
                                />
                            ))} */}
                        </tbody>
                    </table>}
                </div>
            </div>
            

        </div>
            

    )
}