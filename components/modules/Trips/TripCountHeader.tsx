import React, { FC } from 'react'

interface Props {
    title: string;
    count: number
}

const TripCountHeader:FC<Props> = ({ title, count }) => {
  return (
    <div className='font-bold mb-3'>
        <p className='text-lg'>{title} {`[${count}]`}</p>
    </div>
  )
}

export default TripCountHeader