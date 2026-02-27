import { useEffect } from 'react';
import { AppProvider, useApp } from './store/context';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DrawPage } from './pages/DrawPage';
import { TicketsPage } from './pages/TicketsPage';
import { HistoryPage } from './pages/HistoryPage';
import './styles/index.css';

function AppContent() {
  const { state } = useApp();

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Header />
      <main className="flex-1 overflow-auto pb-20">
        {state.tab === 'draw' && <DrawPage />}
        {state.tab === 'tickets' && <TicketsPage />}
        {state.tab === 'history' && <HistoryPage />}
      </main>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
