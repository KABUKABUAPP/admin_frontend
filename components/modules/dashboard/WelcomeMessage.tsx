import React, { FC } from 'react'

interface Props {
    name: string
}

const WelcomeMessage:FC<Props> = ({name}) => {
  return (
    <div>
        <p className='font-bold'>Hello {name}👋🏽</p>
    </div>
  )
}

export default WelcomeMessage