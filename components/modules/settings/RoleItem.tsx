import Button from '@/components/ui/Button/Button'
import React, { FC } from 'react'

const RoleItem:FC = () => {
  return (
    <div className='p-4 bg-[#F8F8F8] flex justify-between items-center rounded-lg'>
        <div>
            <p className='text-xl font-medium'>Super Admin</p>
            <p className='text-sm font-medium'>All Permissions</p>
        </div>
        <div>
            <Button title='View' variant='text'/>
        </div>
    </div>
  )
}

export default RoleItem