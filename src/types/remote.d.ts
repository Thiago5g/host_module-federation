declare module 'remote/App' {
  interface User {
    id: string
    nome: string
    email: string
    avatar: string
    cargo: string
    departamento: string
  }

  interface RemoteAppProps {
    authToken?: string | null
    authUser?: User | null
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
