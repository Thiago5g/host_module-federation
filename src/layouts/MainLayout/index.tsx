import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Footer } from '../../components/Footer';

const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto bg-white">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
