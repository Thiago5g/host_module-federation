declare module 'remote/App' {
  interface User {
    id: string
    name: string
    email: string
    avatar: string
    role: string
    department: string
  }

  interface RemoteAppProps {
    authToken?: string | null
    authUser?: User | null
    sharedCount?: number
    onIncrement?: () => void
    onDecrement?: () => void
    language?: 'pt' | 'en' | 'es'
  }

  const App: React.ComponentType<RemoteAppProps>;
  export default App;
}

declare module 'remote/Button' {
  interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
    className?: string;
  }
  const Button: React.ComponentType<ButtonProps>;
  export default Button;
}
