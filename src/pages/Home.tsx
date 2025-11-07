import React, { useState, lazy, Suspense } from 'react';
import { useStore } from 'zustand';
import { globalStore, type GlobalState } from '../store/globalStore';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';

const RemoteButton = lazy(() => import('remote/Button'));

const Home: React.FC = () => {
    const { user, login, isAuthenticated } = useAuth();
    const [email, setEmail] = useState('joao.silva@tgx.com.br');
    const [senha, setSenha] = useState('123456');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, senha);
        } catch (error) {
            console.error('Erro no login:', error);
        } finally {
            setLoading(false);
        }
    };

    const { t, i18n } = useTranslation()
    const language = useStore(globalStore, (s: GlobalState) => s.language)
    const setLanguage = globalStore.getState().setLanguage

    return (
        <div className="space-y-6">
            <div className='flex flex-row justify-between'>
                <div className='flex flex-col'>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        {t('home_title')}
                    </h1>
                    <p className="text-lg text-gray-600">
                        {t('home_subtitle')}
                    </p>
                </div>
                <div className='flex gap-2'>
                    <span className='font-bold'>{t('language')}:</span>
                    <select
                        value={language}
                        onChange={(e) => {
                            const lng = e.target.value as 'pt' | 'en' | 'es'
                            setLanguage(lng)
                            i18n.changeLanguage(lng)
                        }}
                        className="text-xs bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-8 -mt-1"
                    >
                        <option value="en">English</option>
                        <option value="pt">Português</option>
                        <option value="es">Español</option>
                    </select>
                </div>

            </div>



            {!isAuthenticated && (
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-8 border border-indigo-100">
                    <div className="max-w-md mx-auto">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('login')}</h2>
                            <p className="text-gray-600">Sign in to test token sharing</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="******"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? t('signing_in') : t('sign_in')}
                            </button>

                            <p className="text-xs text-center text-gray-500 mt-4">
                                💡 {t('sign_tip')}
                            </p>
                        </form>
                    </div>
                </div>
            )}

            {isAuthenticated && user && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-6 border border-green-200">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                            {user.avatar}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-1">✅ Logged in successfully!</h3>
                            <div className="space-y-1 text-sm text-gray-700">
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Role:</strong> {user.role}</p>
                                <p><strong>Department:</strong> {user.department}</p>
                            </div>
                            <details className="mt-3">
                                <summary className="text-xs font-medium text-indigo-600 cursor-pointer hover:text-indigo-700">
                                    🔑 View JWT Token
                                </summary>
                                <div className="mt-2 p-3 bg-gray-900 rounded-lg">
                                    <code className="text-xs text-green-400 break-all font-mono">
                                        {useAuth().token}
                                    </code>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            )}


            <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {t('shared_counter_title')}
                </h2>
                <p className="text-gray-600 mb-6">
                    {t('shared_counter_desc')}
                </p>
                <SharedCounterHost />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Vite</h3>
                    </div>
                    <p className="text-gray-600">
                        Lightning-fast build tool with HMR for instant feedback during development.
                    </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">React + TypeScript</h3>
                    </div>
                    <p className="text-gray-700">
                        Type-safe React components with full TypeScript support and IntelliSense.
                    </p>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Tailwind CSS</h3>
                    </div>
                    <p className="text-gray-700">
                        Utility-first CSS framework for rapid UI development with consistent design.
                    </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Module Federation</h3>
                    </div>
                    <p className="text-gray-700">
                        Load remote components dynamically and share dependencies across apps.
                    </p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">{t('tech_zustand_title')}</h3>
                    </div>
                    <p className="text-gray-700">
                        {t('tech_zustand_desc')}
                    </p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-rose-100 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m2 6h6m-3-3v6M5 9h4m-2-2v4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">{t('tech_i18n_title')}</h3>
                    </div>
                    <p className="text-gray-700">
                        {t('tech_i18n_desc')}
                    </p>
                </div>
            </div>

            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-lg font-semibold text-indigo-900">
                            Try the Microfrontend page
                        </h3>
                        <p className="mt-2 text-indigo-700">
                            Click on "Microfrontend" in the sidebar to see remote components loaded from another application running on port 5001.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg border-2 border-purple-200 p-8">
                <div className="flex items-start gap-4 mb-6">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-3 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            🎨 Button Imported from Remote
                        </h3>
                        <p className="text-gray-600 mb-4">
                            This button was imported from the remote via Module Federation! It's being dynamically loaded from <code className="bg-purple-100 px-2 py-1 rounded text-purple-700 text-sm">remote/Button</code>
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <Suspense fallback={<div className="text-sm text-gray-500">Loading button...</div>}>
                                <RemoteButton variant="primary" onClick={() => alert('Primary Button from Remote!')}>
                                    Primary Remote
                                </RemoteButton>
                                <RemoteButton variant="success" onClick={() => alert('Success Button from Remote!')}>
                                    Success Remote
                                </RemoteButton>
                                <RemoteButton variant="danger" onClick={() => alert('Danger Button from Remote!')}>
                                    Danger Remote
                                </RemoteButton>
                                <RemoteButton variant="secondary" onClick={() => alert('Secondary Button from Remote!')}>
                                    Secondary Remote
                                </RemoteButton>
                            </Suspense>
                        </div>

                        <div className="mt-4 p-4 bg-purple-100/50 rounded-lg">
                            <p className="text-sm text-gray-700">
                                <span className="font-semibold">💡 Advantage:</span> The same Button component can be used in both the remote and the host, ensuring visual consistency and avoiding code duplication!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home

function SharedCounterHost() {
    const count = useStore(globalStore, (s: GlobalState) => s.count)
    const setCount = globalStore.getState().setCount
    return (
        <div className="flex items-center justify-center gap-4">
            <button
                onClick={() => setCount(count - 1)}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
            >-</button>
            <span className="text-5xl font-bold text-indigo-600 min-w-[120px] text-center">{count}</span>
            <button
                onClick={() => setCount(count + 1)}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
            >+</button>
        </div>
    )
}