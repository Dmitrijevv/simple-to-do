import React from 'react'
import NavBar from '../NavBar/NavBar';

const DashboardLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className='bg-[#424242] min-h-screen text-white h-full'>
      <NavBar/>
      <div className=''>{children}</div>
    </div>
  )
}

export default DashboardLayout
