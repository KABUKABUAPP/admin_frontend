import React, { FC } from 'react'

import Card from '@/components/common/Card'
import TextField from '@/components/ui/Input/TextField/TextField'
import Button from '@/components/ui/Button/Button'

const HubDetailsForm:FC = () => {
  return (
    <>
      <Card>
        <div className="flex flex-col gap-8 py-5">
          <TextField label="Hub name" placeholder="Name here" />
          <TextField label="Hub Address" placeholder="Address here" />
          <TextField label="House Address" placeholder="House Address here" />
          <div className="flex justify-between gap-3 max-sm:flex-col">
            <TextField
              label="City"
              placeholder="Lagos Island"
              className="w-full"
            />
            <TextField
              label="State"
              placeholder="Lagos State"
              className="w-full"
            />
          </div>

          <TextField label="Select Inspector" placeholder="Select Inspector here" />
        </div>
      </Card>

      <Button
        title="Create Hub"
        className="w-full !text-[16px] mt-6"
        size="large"
      />
    </>
  )
}

export default HubDetailsForm