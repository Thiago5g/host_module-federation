import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        {
            path: '/',
            label: 'Home',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
        },
        {
            path: '/microfrontend',
            label: 'Microfrontend',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
        },
    ];

    return (
        <aside className="w-64 shrink-0 bg-gray-50 border-r">
            <div className="px-4 py-3 border-b">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-indigo-600 text-white grid place-items-center text-xs font-bold">TGX</div>
                    <span className="text-sm font-medium text-gray-700">Dashboard</span>
                </div>
            </div>
            <nav className="p-3">
                <ul className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`group flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                                        isActive
                                            ? 'bg-indigo-600 text-white'
                                            : 'text-gray-700 hover:bg-indigo-50'
                                    }`}
                                >
                                    <span className={`inline-flex ${isActive ? 'text-white' : 'text-indigo-600 group-hover:text-indigo-700'}`}>
                                        {item.icon}
                                    </span>
                                    <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}
