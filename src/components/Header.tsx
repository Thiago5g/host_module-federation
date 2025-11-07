import { useAuth } from '../hooks/useAuth'

export const Header = () => {
    const { user, logout } = useAuth()

    return (
        <header className="bg-white border-b shadow-sm">
            <div className="mx-auto px-4 h-[50px]">
                <div className="h-full flex items-center justify-between">
  <img
                      src="/TGX-LOGO.png"
                      alt="TGX Solution"
                      className="h-10 ml-14 w-auto object-contain select-none"
                      loading="lazy"
                    />
                    <div className="flex items-center gap-3 ml-auto">
                        {user && (
                            <>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white grid place-items-center text-[10px] font-semibold">
                                        {user.avatar}
                                    </div>
                                    <span className="text-sm text-gray-700 hidden sm:inline">{user.name}</span>
                                </div>
                                <button
                                    onClick={logout}
                                    className="text-xs text-red-600 hover:text-red-700 font-medium cursor-pointer"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
