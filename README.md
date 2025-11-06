# Host Application - Module Federation

Este é o projeto **Host** configurado com:

- ⚡ **Vite** - Build tool
- ⚛️ **React 19** - Framework
- 📘 **TypeScript** - Type safety
- 🎨 **Tailwind CSS** - Styling
- 🔧 **ESLint** - Code quality
- 🔗 **Module Federation** - Micro-frontends

## 🚀 Como usar

### Desenvolvimento

```bash
npm run dev
```

O app estará disponível em `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
# ou
npm run serve
```

## 📦 Module Federation

Este projeto está configurado como **Host** e pode consumir módulos remotos.

### Configurando Remotes

Edite o arquivo `vite.config.ts` para adicionar aplicações remotas:

```typescript
federation({
  name: 'host',
  remotes: {
    remote_app: 'http://localhost:5001/assets/remoteEntry.js'
  },
  shared: ['react', 'react-dom']
})
```

### Consumindo Módulos Remotos

```typescript
// Importe componentes remotos dinamicamente
const RemoteComponent = React.lazy(() => import('remote_app/Component'));

// Use no seu componente
<Suspense fallback={<div>Loading...</div>}>
  <RemoteComponent />
</Suspense>
```

## 📁 Estrutura do Projeto

```
host/
├── src/
│   ├── App.tsx          # Componente principal
│   ├── main.tsx         # Entry point
│   └── index.css        # Tailwind imports
├── vite.config.ts       # Configuração Vite + Federation
├── tailwind.config.js   # Configuração Tailwind
├── tsconfig.json        # Configuração TypeScript
└── .eslintrc.cjs        # Configuração ESLint
```

## 🎨 Tailwind CSS

O Tailwind está totalmente configurado. Use classes utilitárias diretamente nos componentes:

```tsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Hello Tailwind!
</div>
```

## 🔍 Lint

```bash
npm run lint
```

## 📝 Notas

- O projeto usa React 19 com as últimas features
- Module Federation configurado com `@originjs/vite-plugin-federation`
- TypeScript strict mode habilitado
- Tailwind com JIT mode para builds otimizadas
```
