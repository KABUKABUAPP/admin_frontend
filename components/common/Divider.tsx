import React, { FC } from 'react'

interface Props {
    height?: string;
}

const Divider:FC<Props> = ({ height="100%" }) => {
  return (
    <div className='w-[1px] bg-[#D4D4D4]' style={{ height }}>

    </div>
  )
}

export default Divider