import { NextPage } from 'next'
import React from 'react'

import AppLayout from '@/layouts/AppLayout'
import ActionBar from '@/components/common/ActionBar'
import AddInspectorLayout from '@/components/modules/inspectors/AddInspectorLayout'
import AddInspectorForm from '@/components/modules/inspectors/AddInspectorForm'

const AddInspector:NextPage = () => {
  return (
    <AppLayout padding="0">
        <div className="lg:h-screen lg:overflow-hidden p-4">
        <ActionBar backButtonText='Cancel'/>

        <AddInspectorLayout>
            <p className="text-3xl font-semibold pb-8">Add New Inspector</p>
            <AddInspectorForm />
        </AddInspectorLayout>
      </div>
    </AppLayout>
  )
}

export default AddInspector