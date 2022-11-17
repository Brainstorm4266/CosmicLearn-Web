import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function App() { //TODO: make this a single-page app, do not use /app/learn or stuff like that.
    const router = useRouter()

    useEffect(() => {
        router.push("/app#create")
    })
}