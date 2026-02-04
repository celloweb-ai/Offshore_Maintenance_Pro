import React, { useState, useRef, useEffect } from 'react';
import { MaintenancePlan, LogEntry } from '../types';

// Declaração para a biblioteca global carregada via CDN
declare var html2pdf: any;

interface PlanDisplayProps {
  plan: MaintenancePlan;
}

const STATUS_OPTIONS = [
  { value: 'Operacional', color: 'text-green-600', bg: 'bg-green-500', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  )},
  { value: 'Em Manutenção', color: 'text-blue-600', bg: 'bg-blue-500', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.532 1.532 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
  )},
  { value: 'Desligado', color: 'text-slate-600', bg: 'bg-slate-500', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v7a1 1 0 11-2 0V3a1 1 0 011-1zm4.243 3.172a1 1 0 011.414 0 8 8 0 11-11.314 0 1 1 0 111.414 1.414 6 6 0 108.486 0 1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )},
  { value: 'Requer Atenção', color: 'text-amber-600', bg: 'bg-amber-500', icon: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  )},
];

const NORM_DESCRIPTIONS: Record<string, string> = {
  'NR-10': 'Segurança em Instalações e Serviços em Eletricidade',
  'NR-13': 'Caldeiras, Vasos de Pressão, Tubulações e Tanques Metálicos de Armazenamento',
  'NR-37': 'Segurança e Saúde em Plataformas de Petróleo',
  'NR-12': 'Segurança no Trabalho em Máquinas e Equipamentos',
  'ISA': 'International Society of Automation (Padrões Globais de Automação e Controle)',
  'IEC': 'International Electrotechnical Commission (Normas Internacionais de Eletricidade e Eletrônica)',
  'API': 'American Petroleum Institute (Padrões Técnicos para a Indústria de Petróleo e Gás Natural)',
  'ISO': 'International Organization for Standardization (Normas de Qualidade e Processos Industriais)',
  'NR-33': 'Segurança e Saúde nos Trabalhos em Espaços Confinados',
  'NR-35': 'Trabalho em Altura',
};

// Truncated due to size limit - see full component in GitHub