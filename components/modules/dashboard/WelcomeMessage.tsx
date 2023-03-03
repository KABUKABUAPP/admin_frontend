import React, { FC } from 'react'

interface Props {
    name: string
}

const WelcomeMessage:FC<Props> = ({name}) => {
  return (
    <div>
        <p className='font-bold'>Hello {name}👋🏽</p>
        <p className='text-xs mt-2'>Here's your insight for today</p>
    </div>
  )
}

export default WelcomeMessage