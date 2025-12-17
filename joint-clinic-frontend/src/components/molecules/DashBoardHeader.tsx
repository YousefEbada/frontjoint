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
    <header className='w-full flex flex-col md:flex-row justify-between items-center place-self-start gap-4 md:gap-0 border-b border-gray-200 pb-1 md:pb-4 lg:pl-[60px] md:mb-6'>
      <nav className='flex flex-row gap-4 md:gap-10 items-center justify-center self-start'>
        <BackTo href="/" text="Website" />
        {(nav || children) && <span className="text-3xl font-bold text-gray-300">|</span>}
        {children ? children : (nav &&
          <>
            <DashBoardLink
              linkHref={"/patient/main"}
              title={"Dashboard"}
            />
            <DashBoardLink
              linkHref={"/patient/progress"}
              title={"Progress"}
            />
          </>
        )}
      </nav>
      <div>
        {therapyName &&<Typography
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