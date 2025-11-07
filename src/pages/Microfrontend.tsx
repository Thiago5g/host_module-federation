import { lazy, Suspense } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useStore } from 'zustand'
import { globalStore, type GlobalState } from '../store/globalStore'

// Safer lazy import with error logging to surface network/CORS issues for remoteEntry.js
const RemoteApp = lazy(async () => {
    try {
        // @ts-ignore - resolved at runtime by Module Federation
        return await import('remote/App')
    } catch (err) {
        console.error('[HOST] Failed to load remote/App. Check that http://localhost:5001/assets/remoteEntry.js is reachable and CORS allows http://localhost:5173', err)
        throw err
    }
})

export default function Microfrontend() {
    const { token, user } = useAuth()
    const count = useStore(globalStore, (s: GlobalState) => s.count)
    const language = useStore(globalStore, (s: GlobalState) => s.language)

    return (
        <Suspense fallback={<div className="text-sm text-gray-600">Loading remote content...</div>}>
                    <RemoteApp 
                authToken={token}
                authUser={user}
                sharedCount={count}
                        language={language}
                onIncrement={() => {
                    const api = globalStore.getState()
                    api.setCount(api.count + 1)
                }}
                onDecrement={() => {
                    const api = globalStore.getState()
                    api.setCount(api.count - 1)
                }}
            />
        </Suspense>
    )
}