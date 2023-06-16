import Button from '@/components/ui/Button/Button'
import React, { FC } from 'react'
import RoleItem from './RoleItem'

const Roles:FC = () => {
  return (
    <div className='bg-[#FFFFFF] rounded-lg p-6 flex flex-col gap-6 h-full overflow-auto scrollbar-none'>
        <div className='flex justify-between items-center w-full'>
            <p className='text-2xl font-medium'>Roles</p>
            <div>
                <Button title='New Role' size='large'/>
            </div>
        </div>

        <RoleItem />
        <RoleItem />
        <RoleItem />
        <RoleItem />
    </div>
  )
}

export default Roles