import { useEffect, useState } from "react"

const DateTime = () => {

    const locale = 'en'
    const [now, setNow] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)    
            
        }
    })

    const day = now.toLocaleDateString(locale, {weekday: 'long'})
    const date = `${day} ${now.getDate()} ${now.toLocaleDateString(locale, { month: 'long' })} ${now.getFullYear()}`
    const time = now.toLocaleTimeString(locale, { hour: '2-digit', hour12: false, minute: '2-digit', second:'2-digit' })

    return (
        <div className="flex flex-row items-center justify-items-end w-auto">
            <h1 className="ml-2">{date}</h1>
            <h1 className="ml-6">{time}</h1>
        </div>
    )
}

export default DateTime