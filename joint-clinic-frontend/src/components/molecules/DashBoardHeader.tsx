import React from 'react'
import Typography from '@/components/atoms/Typography'
import DateTime from '@/components/molecules/DateTime'
import BackTo from './BackTo'
import DashBoardLink from '@/components/organisms/SideBar/DashBoardLink'

interface DashBoardHeaderProps {
  therapyName?: string,
  nav?: boolean,
  dateTime?: boolean,
  children?: React.ReactNode
}

const DashBoardHeader = ({ therapyName, nav, dateTime, children }: DashBoardHeaderProps) => {
  return (
    <header className='w-full grid grid-cols-2 md:flex md:flex-row md:items-center place-self-start gap-y-4 md:gap-y-0 border-b border-gray-200 pb-4 md:pb-4 lg:pl-[60px] md:mb-6'>

      {/* Left Part: BackTo + Separator */}
      <div className='col-start-1 row-start-1 flex items-center justify-self-start'>
        <BackTo href="/" text="Website" />
        {(nav || children) && (
          <span className="hidden md:block text-3xl font-bold text-gray-300 mx-4 md:mx-10">|</span>
        )}
      </div>

      {/* Center Part: Navigation Links */}
      {children ? <nav className='pl-5 mt-6 col-span-2 row-start-2 w-full md:col-auto md:row-auto md:w-auto flex flex-row gap-4 md:gap-10 items-center justify-start'>
        {children ? children : (nav &&
          <>
          </>
        )}
      </nav> : <></>}

      {/* Right Part: Therapy/DateTime */}
      <div className='col-start-2 row-start-1 flex flex-col items-end md:items-start justify-self-end md:ml-auto'>
        {therapyName && <Typography
          text={therapyName}
          variant="bodyBold"
          style={{
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: '#1e5598',
            display: 'inline-block'
          }}
        />}
        {dateTime && <DateTime />}
      </div>
    </header>
  )
}

export default DashBoardHeader