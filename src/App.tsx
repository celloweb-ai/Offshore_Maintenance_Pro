import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import PlanForm from './components/PlanForm';
import PlanDisplay from './components/PlanDisplay';
import SettingsPanel from './components/SettingsPanel';
import { MaintenancePlan, UserSettings } from './types';
import { generateMaintenancePlan } from './services/geminiService';
import type { InstrumentType, PlatformType } from './types';

interface AppState {
  currentPlan: MaintenancePlan | null;
  history: MaintenancePlan[];
  isLoading: boolean;
  error: string | null;
  activeTab: 'dashboard' | 'plans';
  showSettings: boolean;
  userSettings: UserSettings;
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentPlan: null,
    history: [],
    isLoading: false,
    error: null,
    activeTab: 'dashboard',
    showSettings: false,
    userSettings: {
      defaultPersonnel: 'Instrumentista, Ajudante de Instrumentação',
      defaultSupervisorRole: 'Supervisor de Manutenção'
    }
  });

  useEffect(() => {
    const savedHistory = localStorage.getItem('maintenance_history');
    const savedSettings = localStorage.getItem('user_settings');
    
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setState(prev => ({ ...prev, history: parsed }));
      } catch (e) {
        console.error('Failed to load history:', e);
      }
    }

    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setState(prev => ({ ...prev, userSettings: parsed }));
      } catch (e) {
        console.error('Failed to load settings:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (state.history.length > 0) {
      localStorage.setItem('maintenance_history', JSON.stringify(state.history));
    }
  }, [state.history]);

  useEffect(() => {
    localStorage.setItem('user_settings', JSON.stringify(state.userSettings));
  }, [state.userSettings]);

  const handleGeneratePlan = async (
    instrumentType: InstrumentType,
    platformType: PlatformType,
    tag: string
  ) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const plan = await generateMaintenancePlan(
        instrumentType,
        platformType,
        tag,
        state.userSettings
      );

      setState(prev => ({
        ...prev,
        currentPlan: plan,
        history: [plan, ...prev.history],
        isLoading: false,
        activeTab: 'plans'
      }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        error: err.message || 'Erro desconhecido ao gerar plano',
        isLoading: false
      }));
    }
  };

  const handleSelectPlan = (planId: string) => {
    const plan = state.history.find(p => p.id === planId);
    if (plan) {
      setState(prev => ({
        ...prev,
        currentPlan: plan,
        activeTab: 'plans'
      }));
    }
  };

  const handleSaveSettings = (settings: UserSettings) => {
    setState(prev => ({
      ...prev,
      userSettings: settings,
      showSettings: false
    }));
  };

  return (
    <Layout
      activeTab={state.activeTab}
      onNavigate={(tab) => setState(prev => ({ ...prev, activeTab: tab }))}
      onOpenSettings={() => setState(prev => ({ ...prev, showSettings: true }))}
    >
      {state.activeTab === 'dashboard' ? (
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="tech-card">
              <h3 className="text-sm font-medium text-slate-600">Total de Planos</h3>
              <p className="text-3xl font-bold text-blue-600">{state.history.length}</p>
            </div>
            <div className="tech-card">
              <h3 className="text-sm font-medium text-slate-600">Plataformas</h3>
              <p className="text-3xl font-bold text-green-600">
                {new Set(state.history.map(p => p.platformType)).size}
              </p>
            </div>
            <div className="tech-card">
              <h3 className="text-sm font-medium text-slate-600">Instrumentos</h3>
              <p className="text-3xl font-bold text-purple-600">
                {new Set(state.history.map(p => p.instrumentType)).size}
              </p>
            </div>
            <div className="tech-card">
              <h3 className="text-sm font-medium text-slate-600">Tags Monitoradas</h3>
              <p className="text-3xl font-bold text-amber-600">{state.history.length}</p>
            </div>
          </div>

          <div className="tech-card">
            <h2 className="text-xl font-bold mb-4">Histórico de Planos</h2>
            {state.history.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 px-4">Data</th>
                      <th className="text-left py-2 px-4">TAG</th>
                      <th className="text-left py-2 px-4">Instrumento</th>
                      <th className="text-left py-2 px-4">Plataforma</th>
                      <th className="text-left py-2 px-4">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.history.map(plan => (
                      <tr key={plan.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-2 px-4">
                          {new Date(plan.createdAt).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="py-2 px-4 font-mono font-semibold">{plan.tag}</td>
                        <td className="py-2 px-4">{plan.instrumentType}</td>
                        <td className="py-2 px-4">{plan.platformType}</td>
                        <td className="py-2 px-4">
                          <button
                            onClick={() => handleSelectPlan(plan.id)}
                            className="text-blue-600 hover:underline"
                          >
                            Visualizar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-slate-500 text-center py-8">Nenhum plano gerado ainda.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-6">
          <PlanForm
            onSubmit={handleGeneratePlan}
            isLoading={state.isLoading}
            history={state.history}
          />

          {state.error && (
            <div className="tech-card bg-red-50 border-red-200">
              <p className="text-red-700">{state.error}</p>
            </div>
          )}

          {state.currentPlan ? (
            <PlanDisplay plan={state.currentPlan} />
          ) : (
            <div className="tech-card text-center py-12">
              <p className="text-slate-500">
                Crie documentação técnica de alta precisão para manutenção offshore. Checklists automatizados baseados em NRs e melhores práticas da indústria.
              </p>
              <p className="text-sm text-slate-400 mt-2">
                Utilize o formulário acima ou a aba Dashboard para selecionar um documento existente.
              </p>
            </div>
          )}
        </div>
      )}

      {state.showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full">
            <SettingsPanel
              onClose={() => setState(prev => ({ ...prev, showSettings: false }))}
              onSave={handleSaveSettings}
              currentSettings={state.userSettings}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
