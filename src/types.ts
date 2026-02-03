export enum PlatformType {
  FIXED = 'Plataforma Fixa',
  FPSO = 'FPSO (Floating Production Storage and Offloading)'
}

export enum InstrumentType {
  PRESSURE_TRANSMITTER = 'Transmissor de Pressão',
  CONTROL_VALVE = 'Válvula de Controle',
  GAS_DETECTOR = 'Detector de Gás (Combustível/Tóxico)',
  LEVEL_TRANSMITTER = 'Transmissor de Nível',
  FLOW_METER = 'Medidor de Vazão',
  TEMPERATURE_TRANSMITTER = 'Transmissor de Temperatura',
  ESD_VALVE = 'Válvula de Parada de Emergência (ESD)',
  PRESSURE_GAUGE = 'Manômetro'
}

export interface UserSettings {
  defaultPersonnel: string;
  defaultSupervisorRole: string;
}

export interface MaintenanceStep {
  id: string;
  action: string;
  details: string;
  reference: string;
}

export interface TechnicalSpecs {
  rangeMin: number;
  rangeMax: number;
  unit: string;
  accuracy: string;
  expectedSignal: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  user: string;
  fieldName: string;
  oldValue: string;
  newValue: string;
}

export interface MaintenancePlan {
  id: string;
  instrumentType: InstrumentType;
  platformType: PlatformType;
  tag: string;
  intervalMonths: number;
  personnel: string[];
  materials: string[];
  standards: string[];
  testProcedures: MaintenanceStep[];
  safetyPrecautions: string[];
  technicalSpecifications: TechnicalSpecs;
  createdAt: string;
}

export interface AppState {
  currentPlan: MaintenancePlan | null;
  history: MaintenancePlan[];
  isLoading: boolean;
  error: string | null;
}
