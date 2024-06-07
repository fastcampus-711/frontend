import React from "react"

type TabData = {
  key: string
  label: string
}

type TabProps = {
  tabData: TabData[]
  activeTab: string
  handleTabChange: (tabKey: string) => void
}

const Tab: React.FC<TabProps> = ({ tabData, activeTab, handleTabChange }) => {
  return (
    <div className="flex text-lg">
      {tabData.map(tab => (
        <div
          key={tab.key}
          className={`${
            activeTab === tab.key
              ? "text-main_color border-main_color"
              : "text-grey_400 border-grey_200 "
          } flex flex-1 justify-center py-3 px-4 border-b-2 cursor-pointer`}
          onClick={() => handleTabChange(tab.key)}>
          {tab.label}
        </div>
      ))}
    </div>
  )
}

export default Tab
