import React, { FC } from 'react'

interface Props {
    rider: string;
    driver: string
}

const RiderDriverCell:FC<Props> = ({ rider, driver }) => {
  return (
    <div>
      <div className="flex items-center pb-4 border-b border-b-[#E6E6E6]">
        <div>
          <p className="text-xs text-[#9A9A9A] mb-2">Rider</p>
          <p className="text-xs font-bold">{rider}</p>
        </div>
      </div>

      <div className="flex items-center pt-4">
        <div>
          <p className="text-xs text-[#9A9A9A] mb-2">Driver</p>
          <p className="text-xs font-bold">{driver}</p>
        </div>
      </div>
    </div>
  )
}

export default RiderDriverCell