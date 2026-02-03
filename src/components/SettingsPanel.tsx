import React, { useState } from 'react';
import { UserSettings } from '../types';

interface SettingsPanelProps {
  onClose: () => void;
  onSave: (settings: UserSettings) => void;
  currentSettings: UserSettings;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose, onSave, currentSettings }) => {
  const [personnel, setPersonnel] = useState(currentSettings.defaultPersonnel);
  const [supervisor, setSupervisor] = useState(currentSettings.defaultSupervisorRole);

  const handleSave = () => {
    onSave({ defaultPersonnel: personnel, defaultSupervisorRole: supervisor });
    setTimeout(onClose, 500);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Configurações</h3>
        <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Pessoal Padrão</label>
          <input 
            type="text"
            value={personnel}
            onChange={(e) => setPersonnel(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Supervisor</label>
          <input 
            type="text"
            value={supervisor}
            onChange={(e) => setSupervisor(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <button onClick={onClose} className="flex-1 py-2 border rounded-lg">Cancelar</button>
          <button onClick={handleSave} className="flex-1 py-2 bg-blue-600 text-white rounded-lg">Salvar</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
