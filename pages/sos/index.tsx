import { NextPage } from 'next'
import React from 'react'

import AppLayout from '@/layouts/AppLayout'
import CountHeader from '@/components/common/CountHeader'
import SearchFilterBar from '@/components/common/SearchFilterBar'
import SosTable from '@/components/modules/Sos/SosTable'

const SOS:NextPage = () => {
  return (
    <AppLayout>
        <CountHeader title='SOS Today' count={30}/>
        <SearchFilterBar />
        <SosTable />
    </AppLayout>
  )
}

export default SOS