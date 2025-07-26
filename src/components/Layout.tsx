import Header from './Header';
import Footer from './Footer';
import type React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-black">
      <Header title={title} />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
