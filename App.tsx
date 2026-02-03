
import React, { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout.tsx';
import PlanForm from './components/PlanForm.tsx';
import PlanDisplay from './components/PlanDisplay.tsx';
import SettingsPanel from './components/SettingsPanel.tsx';
import { MaintenancePlan, InstrumentType, PlatformType, UserSettings } from './types.ts';
import { generateMaintenancePlan } from './services/geminiService.ts';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'plans'>('plans');
  const [currentPlan, setCurrentPlan] = useState<MaintenancePlan | null>(null);
  const [history, setHistory] = useState<MaintenancePlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  
  const [settings, setSettings] = useState<UserSettings>({
    defaultPersonnel: 'Instrumentista, Ajudante de Manutenção',
    defaultSupervisorRole: 'Supervisor de Manutenção'
  });
  
  const scrollTriggerRef = useRef(false);

  const isValidPlan = (plan: any): plan is MaintenancePlan => {
    if (!plan || typeof plan !== 'object') return false;
    const requiredFields = ['id', 'instrumentType', 'platformType', 'tag', 'testProcedures', 'technicalSpecifications', 'createdAt'];
    return requiredFields.every(field => field in plan);
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem('maintenance_history');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        if (Array.isArray(parsed)) setHistory(parsed.filter(isValidPlan));
      } catch (e) { console.error(e); }
    }
    const savedSettings = localStorage.getItem('maintenance_settings');
    if (savedSettings) {
      try { setSettings(JSON.parse(savedSettings)); } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    if (currentPlan && scrollTriggerRef.current) {
      const element = document.getElementById('plan-display-section');
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      scrollTriggerRef.current = false;
    }
  }, [currentPlan]);

  const handleSaveSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    localStorage.setItem('maintenance_settings', JSON.stringify(newSettings));
  };

  const handleGenerate = async (instrument: InstrumentType, platform: PlatformType, tag: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const plan = await generateMaintenancePlan(instrument, platform, tag, settings);
      if (isValidPlan(plan)) {
        setCurrentPlan(plan);
        scrollTriggerRef.current = true;
        const newHistory = [plan, ...history.filter(p => p.tag !== plan.tag)].slice(0, 10);
        setHistory(newHistory);
        localStorage.setItem('maintenance_history', JSON.stringify(newHistory));
      } else {
        throw new Error("Erro na estrutura do plano gerado.");
      }
    } catch (err: any) {
      setError(err.message || 'Erro inesperado.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadFromHistory = (plan: MaintenancePlan) => {
    setError(null);
    setActiveTab('plans');
    setCurrentPlan(plan);
    scrollTriggerRef.current = true;
  };

  const clearHistory = () => {
    if (window.confirm("Limpar histórico?")) {
      setHistory([]);
      localStorage.removeItem('maintenance_history');
      setCurrentPlan(null);
    }
  };

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-black text-slate-400 uppercase mb-2">Total de Planos</p>
          <h4 className="text-3xl font-black text-slate-900">{history.length}</h4>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-black text-slate-400 uppercase mb-2">Plataformas</p>
          <h4 className="text-3xl font-black text-blue-600">{new Set(history.map(h => h.platformType)).size}</h4>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-black text-slate-400 uppercase mb-2">Instrumentos</p>
          <h4 className="text-3xl font-black text-emerald-600">{new Set(history.map(h => h.instrumentType)).size}</h4>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-black text-slate-400 uppercase mb-2">Tags Monitoradas</p>
          <h4 className="text-3xl font-black text-amber-600">{history.length}</h4>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Histórico de Atividade Técnica</h3>
          <button onClick={clearHistory} className="text-xs text-red-500 font-bold hover:underline uppercase">Limpar Tudo</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-black">
              <tr>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">TAG</th>
                <th className="px-6 py-4">Instrumento</th>
                <th className="px-6 py-4">Plataforma</th>
                <th className="px-6 py-4">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {history.length > 0 ? history.map(plan => (
                <tr key={plan.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-600">{new Date(plan.createdAt).toLocaleDateString('pt-BR')}</td>
                  <td className="px-6 py-4 font-black text-blue-600 uppercase tracking-tighter">{plan.tag}</td>
                  <td className="px-6 py-4 text-slate-700">{plan.instrumentType}</td>
                  <td className="px-6 py-4 text-slate-500 text-xs">{plan.platformType}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => loadFromHistory(plan)}
                      className="text-blue-600 hover:text-blue-800 font-bold text-xs uppercase"
                    >
                      Visualizar
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">Nenhum plano gerado ainda.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderGenerator = () => (
    <div className="space-y-8">
      <section className="text-center md:text-left no-print animate-in fade-in duration-700">
        <div className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
          Engenharia de Instrumentação
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Gerador de Planos Preventivos
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl">
          Crie documentação técnica de alta precisão para manutenção offshore. 
          Checklists automatizados baseados em NRs e melhores práticas da indústria.
        </p>
      </section>

      <PlanForm onSubmit={handleGenerate} isLoading={isLoading} history={history} />

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl no-print animate-in slide-in-from-left-4 duration-300">
          <p className="text-sm text-red-700 font-bold">{error}</p>
        </div>
      )}

      <div id="plan-display-section" className="scroll-mt-8">
        {currentPlan ? (
          <PlanDisplay plan={currentPlan} />
        ) : !isLoading && (
          <div className="bg-white rounded-2xl py-20 px-6 text-center border-2 border-dashed border-slate-200">
            <h3 className="text-slate-900 font-bold text-lg">Aguardando definição técnica</h3>
            <p className="text-slate-500 mt-2 max-w-sm mx-auto">
              Utilize o formulário acima ou a aba Dashboard para selecionar um documento existente.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Layout 
      onOpenSettings={() => setShowSettings(true)} 
      activeTab={activeTab}
      onNavigate={setActiveTab}
    >
      <div className="max-w-6xl mx-auto">
        {showSettings && (
          <SettingsPanel 
            currentSettings={settings}
            onClose={() => setShowSettings(false)}
            onSave={handleSaveSettings}
          />
        )}

        {activeTab === 'plans' ? renderGenerator() : renderDashboard()}

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 no-print opacity-60 hover:opacity-100 transition-opacity mt-12">
          <div className="flex items-center space-x-4 p-4 border border-slate-200 rounded-xl bg-white/50">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Base ISA/IEC Atualizada</span>
          </div>
          <div className="flex items-center space-x-4 p-4 border border-slate-200 rounded-xl bg-white/50">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Motor GenAI Gemini 3 Pro</span>
          </div>
          <div className="flex items-center space-x-4 p-4 border border-slate-200 rounded-xl bg-white/50">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Foco em Segurança Operacional</span>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default App;
