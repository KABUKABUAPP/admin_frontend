import React, { FC } from 'react'

import SearchFilterBar from '@/components/common/SearchFilterBar'
import Button from '@/components/ui/Button/Button'
import AddIcon from '@/components/icons/AddIcon'
import Divider from '@/components/common/Divider'
import { useRouter } from 'next/router'

const StaffSearchFilterBar:FC = () => {
  const router = useRouter()

  return (
    <SearchFilterBar>
        <div className="flex justify-end mr-3">
          <Button title="Add New Staff" startIcon={<AddIcon />} onClick={()=>router.push(`/staffs/add-staff`)}/>
          <div className='ml-4 flex items-center justify-center'>
            <Divider height='80%'/>
          </div>
        </div>
    </SearchFilterBar>
  )
}

export default StaffSearchFilterBar