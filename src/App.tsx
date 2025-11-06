import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Microfrontend from './pages/Microfrontend';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/microfrontend" element={<Microfrontend />} />
      </Route>
    </Routes>
  );
}

export default App;
