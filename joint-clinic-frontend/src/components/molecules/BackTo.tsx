import React from 'react'
import Link from 'next/link'
import Typography from '@/components/atoms/Typography'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';

interface BackToProps {
  href: string;
  text: string;
}

const BackTo = ({ href, text }: BackToProps) => {
  return (
    <Link href={href} className="flex flex-row items-center justify-center group w-fit">
      <FontAwesomeIcon icon={faCaretLeft} className="text-[#1e5598] w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      <Typography text={`Back to ${text}`} variant='bodyRegular' className="text-[#1e5598] hover:underline" />
    </Link>
  )
}

export default BackTo