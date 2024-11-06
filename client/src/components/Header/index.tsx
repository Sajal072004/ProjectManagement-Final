"use client"
import ProjectHeader from '@/src/app/projects/ProjectHeader';
import React, { useState } from 'react'

type Props = {
  name:string;
  buttonComponent?:any;
  isSmallText?:boolean
}



const Header = ({name, buttonComponent, isSmallText}: Props) => {
  const [activeTab , setActiveTab] = useState("Board");
  return (
    <div className='mb-5 flex w-full items-center justify-between'>
      <h1 className={`${isSmallText ? "text-lg": "text-2xl"} font-semibold dark:text-white`}>
        {name}
      </h1>
      {buttonComponent}
      <div>
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  )
}

export default Header