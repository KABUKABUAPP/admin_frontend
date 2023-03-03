import React from 'react'
import Head from 'next/head'

interface Props {
  title: string;
}

const AppHead:React.FC<Props> = ({title}) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}

export default AppHead