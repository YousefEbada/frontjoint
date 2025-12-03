import React from 'react'
import Typography from '@/components/atoms/Typography'
import DateTime from '@/components/molecules/DateTime'
import BackTo from './BackTo'
import DashBoardLink from '@/components/SideBar/DashBoardLink'

interface DashBoardHeaderProps {
  therapyName: string,
  nav?: boolean,
  children?: React.ReactNode
}

const DashBoardHeader = ({ therapyName, nav, children }: DashBoardHeaderProps) => {
  return (
    <header className='w-full flex flex-col md:flex-row justify-between items-center place-self-start gap-4 md:gap-0 border-b border-gray-200 pb-4 mb-6'>
      <nav className='flex flex-row gap-4 md:gap-10 items-center justify-center'>
        <BackTo href="/" text="Website" />
        {(nav || children) && <span className="text-3xl font-thin text-gray-300">|</span>}
        {children ? children : (nav &&
          <>
            <DashBoardLink
              linkHref={"/dashboard/main"}
              title={"Dashboard"}
            />
            <DashBoardLink
              linkHref={"/dashboard/progress"}
              title={"Progress"}
            />
          </>
        )}
      </nav>
      <div>
        <Typography
          variant="bodyBold"
          style={{
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            display: 'inline-block'
          }}
          gradient={true}
        >
          {therapyName}
        </Typography>
        <DateTime />
      </div>
    </header>
  )
}

export default DashBoardHeader