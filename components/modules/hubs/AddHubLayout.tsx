import React, { PropsWithChildren, FC } from 'react'

const AddHubLayout:FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="lg:h-[calc(100vh-100px)] lg:overflow-y-scroll pt-10 pb-10 scrollbar-none w-full max-w-[500px]">
      {children}
    </div>
  )
}

export default AddHubLayout