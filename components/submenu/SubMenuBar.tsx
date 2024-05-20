export default function BoardSubMenuBar({option, category}: {option: string, category: string}) {
    const boardSubOptions: {value: string; name: string}[] = [
        {value:"freeboard", name:"자유 게시판"}, 
        {value:"sharemarket", name:"나눔장터"}, 
        {value:"qna", name:"QnA"}
    ];
    const noticeSubOptions = [
        {value:"notice", name:"공지사항"}, 
        {value:"schedule", name:"일정표"}
    ];
    const complaintOptions = [
        {value:"", name:"전체민원"}, 
        {value:"", name:"나의민원"}
    ];
    const feeOptions = [
        {value:"", name:"전체조회"}, 
        {value:"", name:"나의관리비"}
    ];

    const options = (option == "community" ? boardSubOptions 
    : (option == "notice" ? noticeSubOptions 
    : (option == "complaint" ? complaintOptions 
    : feeOptions)));
    
    return (
        // <div className="w-[1200px] h-14 justify-start items-start gap-[178px] inline-flex">
            <div className="justify-start items-start flex">
                <ul className="h-14 py-4 bg-white justify-center items-center gap-2.5 flex">
                    {options.map((opt) => (
                        <li key = {opt.value} className="me-2">
                            <a key={opt.value}
                                href={`/${option}/${opt.value}`} 
                                className={`w-24 h-6 px-6 py-4 text-center font-['Pretendard']
                                ${opt.value == category ? "text-dark_blue border-b-2 border-dark_blue text-[22px] font-semibold" :
                                "text-neutral-500 text-xl font-normal hover:text-[22px] hover:border-b-2 hover:border-gray-200 "} `}
                                >{opt.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        // </div>
    );

    // return (
    //     <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
    //         <ul className="flex flex-wrap -mb-px">
    //             {options.map((opt) => (
    //                 <li key = {opt.value} className="me-2">
    //                 <a 
    //                     key={opt.value}
    //                     href={`/${option}/${opt.value}`} 
    //                     className={`inline-block p-4 
    //                     border-b-2
    //                     rounded-t-lg 
    //                     ${opt.value == category ? "text-dark_blue border-dark_blue active dark:text-dark_blue dark:border-dark_blue" :
    //                     "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} `}
    //                     >{opt.name}</a>
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    // );
}