"use client"

import { useState } from "react"

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("overview")

  const renderNavTab = (tabName, displayName) => (
    <button
      className={`px-4 py-2 rounded transition ${
        activeTab === tabName ? "bg-white text-black font-medium" : "hover:bg-gray-800 text-white"
      }`}
      onClick={() => {
        setActiveTab(tabName)
        window.location.hash = tabName
      }}
    >
      {displayName}
    </button>
  )

  return (
    <nav className="bg-black text-white p-4 shadow-md border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/Logo.png"
            alt="Logo"
            className="h-8 w-auto"
          />
        </div>
        <div className="flex space-x-4">
          {renderNavTab("overview", "Overview")}
          {renderNavTab("jobs", "Jobs")}
          {renderNavTab("applications", "Applications")}
        </div>
      </div>
    </nav>
  )
}

export default Navbar