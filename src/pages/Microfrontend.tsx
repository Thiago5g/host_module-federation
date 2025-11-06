import { lazy, Suspense } from 'react'
import { useAuth } from '../hooks/useAuth'

const RemoteApp = lazy(() => import('remote/App'))

export default function Microfrontend() {
    const { token, user } = useAuth()

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-xl font-semibold text-gray-800">Microfrontend (Module Federation)</h1>
                <p className="text-sm text-gray-500">Carregando o componente exposto pelo remote via Module Federation.</p>
            </div>
            <div className="rounded-md border bg-white p-4">
                <Suspense fallback={<div className="text-sm text-gray-600">Loading remote content...</div>}>
                    <RemoteApp authToken={token} authUser={user} />
                </Suspense>
            </div>
        </div>
    )
}