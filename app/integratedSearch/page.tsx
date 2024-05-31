import Image from "next/image"
import moveIcon from "@/public/icon/integratedSearch_btn.svg"
import categoryIcon from "@/public/icon/categoryDepth.svg"

export default function IntegratedSearchPage() {
    const searchWord = "아파트"
    const searchCount = 26

    const noticeCount = 4
    const freesCount = 5
    const marketsCount = 5
    const qnasCount = 6
    const complaintsCount = 6

    return (
        <div className="max-w-[1200px] flex flex-col justify-center m-auto gap-10 pb-[200px]">
            <div className="max-w-[1200px] flex py-8 gap-6 items-center">
                <p className="text-grey_900 text-[32px] font-semibold">
                    통합검색
                </p>
                <span className="inline-flex font-medium text-[22px]">
                    <p className="text-main_color">{searchWord}</p>
                    <p className="text-grey_300">에 대한 검색 결과가 </p>
                    <p className="text-main_color px-1">{searchCount}건</p>
                    <p className="text-grey_300"> 나왔습니다.</p>
                </span>
            </div>
            <div className="w-full flex flex-col m-auto gap-6">
                <div className="flex flex-col gap-6 p-6 rounded-2xl border border-grey_200">
                    <div className="flex h-14 py-1 justify-between items-center">
                        <p className="w-[300px] text-[22px] font-medium">공지사항 ({noticeCount})</p>
                        <button className="inline-flex items-center gap-4 px-4 py-3 rounded border border-grey_200">
                            <p>공지사항 전체보기</p>
                            <Image
                                src={moveIcon.src}
                                alt="이동 아이콘"
                                width={10}
                                height={10}
                            />
                        </button>
                    </div>
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
                            <tr className="text-grey_400 text-center font-medium">
                                <td className="px-4 py-6 text-grey_300">분류1</td>
                                <td className="px-4 py-6 font-medium text-grey_700">제목1</td>
                                <td className="px-4 py-6 text-grey_700">글쓴이1</td>
                                <td className="px-4 py-6 text-grey_700">123</td>
                                <td className="px-4 py-6 text-grey_700">456</td>
                                <td className="px-4 py-6 text-grey_700">등록일1</td>
                            </tr>
                            <tr className="text-grey_400 text-center font-medium">
                                <td className="px-4 py-6 text-grey_300">분류1</td>
                                <td className="px-4 py-6 font-medium text-grey_700">제목1</td>
                                <td className="px-4 py-6 text-grey_700">글쓴이1</td>
                                <td className="px-4 py-6 text-grey_700">123</td>
                                <td className="px-4 py-6 text-grey_700">456</td>
                                <td className="px-4 py-6 text-grey_700">등록일1</td>
                            </tr>
                            <tr className="text-grey_400 text-center font-medium">
                                <td className="px-4 py-6 text-grey_300">분류1</td>
                                <td className="px-4 py-6 font-medium text-grey_700">제목1</td>
                                <td className="px-4 py-6 text-grey_700">글쓴이1</td>
                                <td className="px-4 py-6 text-grey_700">123</td>
                                <td className="px-4 py-6 text-grey_700">456</td>
                                <td className="px-4 py-6 text-grey_700">등록일1</td>
                            </tr>
                            <tr className="text-grey_400 text-center font-medium">
                                <td className="px-4 py-6 text-grey_300">분류1</td>
                                <td className="px-4 py-6 font-medium text-grey_700">제목1</td>
                                <td className="px-4 py-6 text-grey_700">글쓴이1</td>
                                <td className="px-4 py-6 text-grey_700">123</td>
                                <td className="px-4 py-6 text-grey_700">456</td>
                                <td className="px-4 py-6 text-grey_700">등록일1</td>
                            </tr>
                            {/* {responseData &&
                                responseData.map(item => (
                                <NoticeItem
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    category_id={item.category_id}
                                    count_of_comments={item.count_of_comments}
                                    nickname={item.nickname}
                                    count_of_good={item.reaction_columns.count_reaction_type_good}
                                    hits={item.hits}
                                    date={item.date}
                                    image_urls={item.image_urls}
                                    popular={item.popular}
                                    isnew={item.isnew}
                                />
                            ))} */}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col gap-6 p-6 rounded-2xl border border-grey_200">
                    <div className="flex h-14 py-1 justify-between items-center">
                        <span className="inline-flex gap-6 w-[300px] text-[22px] font-medium">
                            <p >소통공간 </p>
                            <Image
                                src={categoryIcon.src}
                                alt="소통공간 카테고리 아이콘"
                                width={10}
                                height={10}
                            />
                            <p>자유게시판 ({freesCount})</p>
                        </span>
                        
                        <button className="inline-flex items-center gap-4 px-4 py-3 rounded border border-grey_200">
                            <p>자유게시판 전체보기</p>
                            <Image
                                src={moveIcon.src}
                                alt="이동 아이콘"
                                width={10}
                                height={10}
                            />
                        </button>
                    </div>
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
                            <tr className="text-grey_400 text-center font-medium">
                                <td className="px-4 py-6 text-grey_300">분류1</td>
                                <td className="px-4 py-6 font-medium text-grey_700">제목1</td>
                                <td className="px-4 py-6 text-grey_700">글쓴이1</td>
                                <td className="px-4 py-6 text-grey_700">123</td>
                                <td className="px-4 py-6 text-grey_700">456</td>
                                <td className="px-4 py-6 text-grey_700">등록일1</td>
                            </tr>
                            <tr className="text-grey_400 text-center font-medium">
                                <td className="px-4 py-6 text-grey_300">분류1</td>
                                <td className="px-4 py-6 font-medium text-grey_700">제목1</td>
                                <td className="px-4 py-6 text-grey_700">글쓴이1</td>
                                <td className="px-4 py-6 text-grey_700">123</td>
                                <td className="px-4 py-6 text-grey_700">456</td>
                                <td className="px-4 py-6 text-grey_700">등록일1</td>
                            </tr>
                            <tr className="text-grey_400 text-center font-medium">
                                <td className="px-4 py-6 text-grey_300">분류1</td>
                                <td className="px-4 py-6 font-medium text-grey_700">제목1</td>
                                <td className="px-4 py-6 text-grey_700">글쓴이1</td>
                                <td className="px-4 py-6 text-grey_700">123</td>
                                <td className="px-4 py-6 text-grey_700">456</td>
                                <td className="px-4 py-6 text-grey_700">등록일1</td>
                            </tr>
                            <tr className="text-grey_400 text-center font-medium">
                                <td className="px-4 py-6 text-grey_300">분류1</td>
                                <td className="px-4 py-6 font-medium text-grey_700">제목1</td>
                                <td className="px-4 py-6 text-grey_700">글쓴이1</td>
                                <td className="px-4 py-6 text-grey_700">123</td>
                                <td className="px-4 py-6 text-grey_700">456</td>
                                <td className="px-4 py-6 text-grey_700">등록일1</td>
                            </tr>
                            {/* {responseData &&
                                responseData.map(item => (
                                <FreeBoardItem
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    category_id={item.category_id}
                                    count_of_comments={item.count_of_comments}
                                    nickname={item.nickname}
                                    count_of_good={item.reaction_columns.count_reaction_type_good}
                                    hits={item.hits}
                                    date={item.date}
                                    image_urls={item.image_urls}
                                    popular={item.popular}
                                    isnew={item.isnew}
                                />
                            ))} */}
                        </tbody>
                    </table>
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
                            <p>나눔장터 ({marketsCount})</p>
                        </span>
                        <button className="inline-flex items-center gap-4 px-4 py-3 rounded border border-grey_200">
                            <p>나눔장터 전체보기</p>
                            <Image
                                src={moveIcon.src}
                                alt="이동 아이콘"
                                width={10}
                                height={10}
                            />
                        </button>
                    </div>
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
                            <tr className="text-grey_400 text-center font-medium">
                                <td className="px-4 py-6 text-grey_300">분류1</td>
                                <td className="px-4 py-6 font-medium text-grey_700">제목1</td>
                                <td className="px-4 py-6 text-grey_700">글쓴이1</td>
                                <td className="px-4 py-6 text-grey_700">123</td>
                                <td className="px-4 py-6 text-grey_700">456</td>
                                <td className="px-4 py-6 text-grey_700">등록일1</td>
                            </tr>
                            <tr className="text-grey_400 text-center font-medium">
                                <td className="px-4 py-6 text-grey_300">분류1</td>
                                <td className="px-4 py-6 font-medium text-grey_700">제목1</td>
                                <td className="px-4 py-6 text-grey_700">글쓴이1</td>
                                <td className="px-4 py-6 text-grey_700">123</td>
                                <td className="px-4 py-6 text-grey_700">456</td>
                                <td className="px-4 py-6 text-grey_700">등록일1</td>
                            </tr>
                            <tr className="text-grey_400 text-center font-medium">
                                <td className="px-4 py-6 text-grey_300">분류1</td>
                                <td className="px-4 py-6 font-medium text-grey_700">제목1</td>
                                <td className="px-4 py-6 text-grey_700">글쓴이1</td>
                                <td className="px-4 py-6 text-grey_700">123</td>
                                <td className="px-4 py-6 text-grey_700">456</td>
                                <td className="px-4 py-6 text-grey_700">등록일1</td>
                            </tr>
                            <tr className="text-grey_400 text-center font-medium">
                                <td className="px-4 py-6 text-grey_300">분류1</td>
                                <td className="px-4 py-6 font-medium text-grey_700">제목1</td>
                                <td className="px-4 py-6 text-grey_700">글쓴이1</td>
                                <td className="px-4 py-6 text-grey_700">123</td>
                                <td className="px-4 py-6 text-grey_700">456</td>
                                <td className="px-4 py-6 text-grey_700">등록일1</td>
                            </tr>
                            {/* {responseData.map(item => (
                            <div
                                key={item.id}
                                className=" flex-1">
                                <Link href={`/community/markets/${item.id}`}>
                                <ShareMarketItem
                                    issaled={item.issaled}
                                    isnew={item.isnew}
                                    subcategory={item.subcategory}
                                    title={item.title}
                                    price={item.price}
                                    nickname={item.nickname}
                                    hits={item.hits}
                                    date={item.date}
                                />
                                </Link>
                            </div>
                            ))} */}
                        </tbody>
                    </table>
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
                            <p>QnA ({qnasCount})</p>
                        </span>
                        <button className="inline-flex items-center gap-4 px-4 py-3 rounded border border-grey_200">
                            <p>QnA 전체보기</p>
                            <Image
                                src={moveIcon.src}
                                alt="이동 아이콘"
                                width={10}
                                height={10}
                            />
                        </button>
                    </div>
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
                            <tr className="text-grey_400 text-center font-medium">
                                <td className="px-4 py-6 text-grey_300">분류1</td>
                                <td className="px-4 py-6 font-medium text-grey_700">제목1</td>
                                <td className="px-4 py-6 text-grey_700">글쓴이1</td>
                                <td className="px-4 py-6 text-grey_700">123</td>
                                <td className="px-4 py-6 text-grey_700">456</td>
                                <td className="px-4 py-6 text-grey_700">등록일1</td>
                            </tr>
                            <tr className="text-grey_400 text-center font-medium">
                                <td className="px-4 py-6 text-grey_300">분류1</td>
                                <td className="px-4 py-6 font-medium text-grey_700">제목1</td>
                                <td className="px-4 py-6 text-grey_700">글쓴이1</td>
                                <td className="px-4 py-6 text-grey_700">123</td>
                                <td className="px-4 py-6 text-grey_700">456</td>
                                <td className="px-4 py-6 text-grey_700">등록일1</td>
                            </tr>
                            <tr className="text-grey_400 text-center font-medium">
                                <td className="px-4 py-6 text-grey_300">분류1</td>
                                <td className="px-4 py-6 font-medium text-grey_700">제목1</td>
                                <td className="px-4 py-6 text-grey_700">글쓴이1</td>
                                <td className="px-4 py-6 text-grey_700">123</td>
                                <td className="px-4 py-6 text-grey_700">456</td>
                                <td className="px-4 py-6 text-grey_700">등록일1</td>
                            </tr>
                            <tr className="text-grey_400 text-center font-medium">
                                <td className="px-4 py-6 text-grey_300">분류1</td>
                                <td className="px-4 py-6 font-medium text-grey_700">제목1</td>
                                <td className="px-4 py-6 text-grey_700">글쓴이1</td>
                                <td className="px-4 py-6 text-grey_700">123</td>
                                <td className="px-4 py-6 text-grey_700">456</td>
                                <td className="px-4 py-6 text-grey_700">등록일1</td>
                            </tr>
                            {/* {responseData.map(item => (
                                <QnaItem
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
                    </table>
                </div>
                <div className="flex flex-col gap-6 p-6 rounded-2xl border border-grey_200">
                    <div className="flex h-14 py-1 justify-between items-center">
                        <p className="w-[300px] text-[22px] font-medium">민원게시판 ({complaintsCount})</p>
                        <button className="inline-flex items-center gap-4 px-4 py-3 rounded border border-grey_200">
                            <p>민원게시판 전체보기</p>
                            <Image
                                src={moveIcon.src}
                                alt="이동 아이콘"
                                width={10}
                                height={10}
                            />
                        </button>
                    </div>
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
                            <tr className="text-grey_400 text-center font-medium">
                                <td className="px-4 py-6 text-grey_300">분류1</td>
                                <td className="px-4 py-6 font-medium text-grey_700">제목1</td>
                                <td className="px-4 py-6 text-grey_700">글쓴이1</td>
                                <td className="px-4 py-6 text-grey_700">123</td>
                                <td className="px-4 py-6 text-grey_700">456</td>
                                <td className="px-4 py-6 text-grey_700">등록일1</td>
                            </tr>
                            <tr className="text-grey_400 text-center font-medium">
                                <td className="px-4 py-6 text-grey_300">분류1</td>
                                <td className="px-4 py-6 font-medium text-grey_700">제목1</td>
                                <td className="px-4 py-6 text-grey_700">글쓴이1</td>
                                <td className="px-4 py-6 text-grey_700">123</td>
                                <td className="px-4 py-6 text-grey_700">456</td>
                                <td className="px-4 py-6 text-grey_700">등록일1</td>
                            </tr>
                            <tr className="text-grey_400 text-center font-medium">
                                <td className="px-4 py-6 text-grey_300">분류1</td>
                                <td className="px-4 py-6 font-medium text-grey_700">제목1</td>
                                <td className="px-4 py-6 text-grey_700">글쓴이1</td>
                                <td className="px-4 py-6 text-grey_700">123</td>
                                <td className="px-4 py-6 text-grey_700">456</td>
                                <td className="px-4 py-6 text-grey_700">등록일1</td>
                            </tr>
                            <tr className="text-grey_400 text-center font-medium">
                                <td className="px-4 py-6 text-grey_300">분류1</td>
                                <td className="px-4 py-6 font-medium text-grey_700">제목1</td>
                                <td className="px-4 py-6 text-grey_700">글쓴이1</td>
                                <td className="px-4 py-6 text-grey_700">123</td>
                                <td className="px-4 py-6 text-grey_700">456</td>
                                <td className="px-4 py-6 text-grey_700">등록일1</td>
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
                    </table>
                </div>
            </div>
            

        </div>
            

    )
}