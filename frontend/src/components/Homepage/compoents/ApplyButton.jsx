import React from 'react'

export default function ApplyButton() {
  return (
    <button className="bg-[#1a237e] hover:bg-[#1a237e]/90 text-white rounded-full px-5 py-2 flex items-center gap-2  montserrat-main">
      Apply Now
      <span className="bg-white rounded-full p-2 flex  font-mono">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#1a237e" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7"/>
          <path d="M7 7h10v10"/>
        </svg>
      </span>
    </button>
  )
}

