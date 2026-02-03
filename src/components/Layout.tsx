import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onOpenSettings: () => void;
  activeTab: 'dashboard' | 'plans';
  onNavigate: (tab: 'dashboard' | 'plans') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onOpenSettings, activeTab, onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-900 text-white shadow-lg no-print">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-900"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Offshore Maintenance Pro</h1>
              <p className="text-xs text-slate-400">Plataformas de Petróleo & Gás</p>
            </div>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <div className="hidden md:flex space-x-6 h-full">
              <button 
                onClick={() => onNavigate('dashboard')}
                className={`transition-all duration-200 border-b-2 h-16 px-1 flex items-center ${
                  activeTab === 'dashboard' 
                    ? 'text-yellow-400 border-yellow-400' 
                    : 'text-slate-300 border-transparent hover:text-white'
                }`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => onNavigate('plans')}
                className={`transition-all duration-200 border-b-2 h-16 px-1 flex items-center ${
                  activeTab === 'plans' 
                    ? 'text-yellow-400 border-yellow-400' 
                    : 'text-slate-300 border-transparent hover:text-white'
                }`}
              >
                Planos
              </button>
            </div>
            <button 
              onClick={onOpenSettings}
              className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all border border-white/20 flex items-center space-x-2"
              title="Configurações do Sistema"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              <span className="hidden sm:inline">Configurações</span>
            </button>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-slate-100 border-t border-slate-200 py-6 no-print">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Offshore Maintenance Systems. Em conformidade com NR-10, NR-13 e NR-37.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
