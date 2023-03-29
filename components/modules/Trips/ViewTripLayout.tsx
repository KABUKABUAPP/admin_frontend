import React, { FC } from 'react'

interface Props {
    asideComponents?: React.ReactNode;
    mainComponents?: React.ReactNode
}

const ViewTripLayout:FC<Props> = ({ asideComponents, mainComponents }) => {
  return (
    <div className='flex gap-8 w-full mt-6 max-lg:flex-col max-lg:gap-4 max-lg:justify-center'>
        <aside className='w-[300px] max-lg:w-full'>
            {asideComponents}
        </aside>
        <main className='w-[calc(100%-300px)] max-lg:w-full h-screen'>
            {mainComponents}
        </main>
    </div>
  )
}

export default ViewTripLayout