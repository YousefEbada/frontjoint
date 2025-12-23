"use client"
import React from 'react'
import dayjs from 'dayjs'
import Typography from '../atoms/Typography'

const DateTime = () => {
    const [formattedDate, setFormattedDate] = React.useState('')

    React.useEffect(() => {
        let timer: ReturnType<typeof setTimeout>

        const updateDate = () => {
            const now = dayjs()
            setFormattedDate(now.format('MMM DD, YYYY - h:mm A'))

            // Update when the next minute starts
            const delay = (60 - now.second()) * 1000
            timer = setTimeout(updateDate, delay)
        }

        updateDate()

        return () => clearTimeout(timer)
    }, [])

    return (
        <Typography
          text={formattedDate}
          variant='bodyRegular'
          gradient={true}
          style={{}}
        />
    )
}

export default DateTime