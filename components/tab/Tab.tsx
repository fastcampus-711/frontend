import React from "react"

type TabData = {
  key: string
  label: string
}

type TabProps = {
  tabData: TabData[]
  activeTab: string
  width?: string
  handleTabChange: (tabKey: string) => void
}

const Tab: React.FC<TabProps> = ({
  tabData,
  activeTab,
  width,
  handleTabChange
}) => {
  return (
    <div className="flex text-lg">
      {tabData.map(tab => (
        <div
          key={tab.key}
          className={`${
            activeTab === tab.key
              ? "text-main_color border-main_color"
              : "text-grey_400 border-grey_200 "
          } ${width === "full" ? "w-full" : "w-[164px]"} flex justify-center py-3 px-4 border-b-2 cursor-pointer hover:text-main_color hover:border-main_color`}
          onClick={() => handleTabChange(tab.key)}>
          {tab.label}
        </div>
      ))}
    </div>
  )
}

export default Tab
