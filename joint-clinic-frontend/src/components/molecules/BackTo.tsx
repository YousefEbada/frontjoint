import React from 'react'
import Link from 'next/link'
import Typography from '../atoms/Typography'
import Arrow from '../icons/Arrow';

interface BackToProps {
  href: string;
  text: string;
}

const BackTo = ({ href, text }: BackToProps) => {
  return (
    <Link href={href} className="flex flex-row items-center justify-center gap-2 group">
      <Arrow direction="left" fill="#1e5598" className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
      <Typography variant='bodyRegular' className="text-[#1e5598] hover:underline">Back to {text}</Typography>
    </Link>
  )
}

export default BackTo