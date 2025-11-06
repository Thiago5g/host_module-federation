# Host Application - Module Federation

This is the **Host** project configured with:

- ⚡ **Vite** - Build tool
- ⚛️ **React 19** - Framework
- 📘 **TypeScript** - Type safety
- 🎨 **Tailwind CSS** - Styling
- 🔧 **ESLint** - Code quality
- 🔗 **Module Federation** - Micro-frontends

## 🚀 How to use

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
# or
npm run serve
```

## 📦 Module Federation

This project is configured as a **Host** and can consume remote modules.

### Configuring Remotes

Edit the `vite.config.ts` file to add remote applications:

```typescript
federation({
  name: 'host',
  remotes: {
    remote_app: 'http://localhost:5001/assets/remoteEntry.js'
  },
  shared: ['react', 'react-dom']
})
```

### Consuming Remote Modules

```typescript
// Import remote components dynamically
const RemoteComponent = React.lazy(() => import('remote_app/Component'));

// Use in your component
<Suspense fallback={<div>Loading...</div>}>
  <RemoteComponent />
</Suspense>
```

## 📁 Project Structure

```
host/
├── src/
│   ├── App.tsx          # Main component
│   ├── main.tsx         # Entry point
│   └── index.css        # Tailwind imports
├── vite.config.ts       # Vite + Federation config
├── tailwind.config.js   # Tailwind config
├── tsconfig.json        # TypeScript config
└── .eslintrc.cjs        # ESLint config
```

## 🎨 Tailwind CSS

Tailwind is fully configured. Use utility classes directly in components:

```tsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Hello Tailwind!
</div>
```

## 🔍 Lint

```bash
npm run lint
```

## 📝 Notes

- The project uses React 19 with the latest features
- Module Federation configured with `@originjs/vite-plugin-federation`
- TypeScript strict mode enabled
- Tailwind with JIT mode for optimized builds
```
