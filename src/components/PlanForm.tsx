import React, { useState } from 'react';
import { InstrumentType, PlatformType, MaintenancePlan } from '../types';

interface PlanFormProps {
  onSubmit: (instrument: InstrumentType, platform: PlatformType, tag: string) => void;
  isLoading: boolean;
  history: MaintenancePlan[];
}

interface FormErrors {
  instrument?: string;
  platform?: string;
  tag?: string;
  general?: string;
}

const PlanForm: React.FC<PlanFormProps> = ({ onSubmit, isLoading, history }) => {
  const [instrument, setInstrument] = useState<string>('');
  const [platform, setPlatform] = useState<string>('');
  const [tag, setTag] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const normalizedTag = tag.trim().toUpperCase();
    
    if (!instrument) {
      newErrors.instrument = 'Selecione o tipo de instrumento.';
    }
    
    if (!platform) {
      newErrors.platform = 'Selecione o tipo de plataforma.';
    }
    
    if (!tag.trim()) {
      newErrors.tag = 'O TAG do equipamento é obrigatório.';
    } else if (tag.trim().length < 3) {
      newErrors.tag = 'O TAG deve ter pelo menos 3 caracteres.';
    }

    const isDuplicate = history.some(plan => 
      plan.instrumentType === instrument && 
      plan.platformType === platform && 
      plan.tag.toUpperCase() === normalizedTag
    );

    if (isDuplicate) {
      newErrors.general = `Já existe um plano gerado para o instrumento ${instrument} com a TAG ${normalizedTag} nesta unidade.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(instrument as InstrumentType, platform as PlatformType, tag.trim());
    }
  };

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 no-print">
      <h2 className="text-lg font-semibold mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
        Gerar Novo Plano de Manutenção
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Instrumento</label>
          <select 
            value={instrument}
            onChange={(e) => { setInstrument(e.target.value); setErrors(prev => ({ ...prev, instrument: undefined })); }}
            className={`w-full bg-slate-50 border ${errors.instrument ? 'border-red-500' : 'border-slate-300'} rounded-lg p-2.5`}
          >
            <option value="">Selecione...</option>
            {Object.values(InstrumentType).map((val) => (<option key={val} value={val}>{val}</option>))}
          </select>
          {errors.instrument && <p className="mt-1 text-xs text-red-500">{errors.instrument}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Plataforma</label>
          <select 
            value={platform}
            onChange={(e) => { setPlatform(e.target.value); setErrors(prev => ({ ...prev, platform: undefined })); }}
            className={`w-full bg-slate-50 border ${errors.platform ? 'border-red-500' : 'border-slate-300'} rounded-lg p-2.5`}
          >
            <option value="">Selecione...</option>
            {Object.values(PlatformType).map((val) => (<option key={val} value={val}>{val}</option>))}
          </select>
          {errors.platform && <p className="mt-1 text-xs text-red-500">{errors.platform}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">TAG</label>
          <input 
            type="text"
            value={tag}
            onChange={(e) => { setTag(e.target.value); setErrors(prev => ({ ...prev, tag: undefined })); }}
            placeholder="Ex: PT-1010A"
            className={`w-full bg-slate-50 border ${errors.tag ? 'border-red-500' : 'border-slate-300'} rounded-lg p-2.5`}
          />
          {errors.tag && <p className="mt-1 text-xs text-red-500">{errors.tag}</p>}
        </div>

        {errors.general && (
          <div className="md:col-span-3 bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
            <p className="text-sm text-amber-800">{errors.general}</p>
          </div>
        )}

        <div className="md:col-span-3">
          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white ${
              isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Processando...' : 'Gerar Plano de Manutenção'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default PlanForm;
