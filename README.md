![Offshore Maintenance Pro](./images/github-header.png)

# Offshore Maintenance Pro

> Sistema inteligente para geração automatizada de planos de manutenção preventiva e checklists técnicos para instrumentação em plataformas offshore (FPSO/Fixas)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb)](https://react.dev/)
[![Google GenAI](https://img.shields.io/badge/Google_GenAI-1.39-orange)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/license-Private-red)]()

## 🌐 Demo ao Vivo

**➡️ [Acesse a aplicação em produção](https://offshore-maintenance-pro.vercel.app/)**

Experimente o sistema completo de geração de planos de manutenção com IA em tempo real.

---

## 🎯 Visão Geral

O **Offshore Maintenance Pro** é uma aplicação web desenvolvida para automatizar a criação de documentação técnica de manutenção preventiva em plataformas offshore. Utilizando inteligência artificial (Google Gemini), o sistema gera planos detalhados em conformidade com Normas Regulamentadoras brasileiras e padrões internacionais (ISA/IEC).

### Principais Características

- 🤖 **IA Integrada**: Utiliza Google Gemini 3 Pro para geração inteligente de conteúdo técnico
- 📋 **Checklists Automatizados**: Procedimentos de teste e manutenção específicos por tipo de instrumento
- 🛢️ **Foco Offshore**: Otimizado para FPSO e plataformas fixas de petróleo e gás
- ⚙️ **Personalizável**: Configurações de equipe e papéis customizáveis
- 📊 **Dashboard Gerencial**: Visualização de histórico e métricas de atividade técnica
- 💾 **Armazenamento Local**: Histórico persistente de planos gerados
- 🖨️ **Exportação**: Visualização otimizada para impressão e PDF

## 🏗️ Arquitetura Técnica

### Stack Tecnológico

- **Frontend**: React 19.2 + TypeScript 5.8
- **Build Tool**: Vite 6.2
- **IA**: Google Generative AI SDK 1.39
- **Deploy**: Vercel (configuração otimizada)
- **Estilização**: CSS-in-JS com Tailwind (via index.css)

### Estrutura do Projeto

```
Offshore_Maintenance_Pro/
├── components/          # Componentes React modulares
│   ├── Layout.tsx
│   ├── PlanForm.tsx
│   ├── PlanDisplay.tsx
│   └── SettingsPanel.tsx
├── services/           # Camada de serviços
│   └── geminiService.ts  # Integração com Google GenAI
├── types.ts            # Definições TypeScript
├── App.tsx             # Componente principal
├── index.tsx           # Entry point React
├── index.css           # Estilos globais
├── vite.config.ts      # Configuração Vite
├── tsconfig.json       # Configuração TypeScript
└── vercel.json         # Deploy Vercel
```

## 🚀 Funcionalidades

### 1. Geração de Planos de Manutenção

- **Tipos de Instrumentos Suportados**:
  - Sensores de nível
  - Transmissores de pressão
  - Válvulas de controle
  - Analisadores
  - Detectores de gás
  - E outros instrumentos industriais

- **Tipos de Plataforma**:
  - FPSO (Floating Production Storage and Offloading)
  - Plataformas Fixas

### 2. Dashboard de Atividades

- Métricas consolidadas (total de planos, plataformas, instrumentos)
- Histórico detalhado com filtros
- Visualização rápida de tags monitoradas

### 3. Conteúdo Técnico Gerado

Cada plano inclui:

- 📝 **Procedimentos de Teste**: Step-by-step detalhado
- 🔧 **Especificações Técnicas**: Parâmetros e calibrações
- ⚠️ **Normas de Segurança**: Conformidade com NRs
- 👥 **Equipe Necessária**: Papéis e responsabilidades
- 📅 **Frequências**: Periodicidade recomendada

## ⚙️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Chave API do Google Generative AI

### Instalação

```bash
# Clone o repositório
git clone https://github.com/celloweb-ai/Offshore_Maintenance_Pro.git

# Navegue até o diretório
cd Offshore_Maintenance_Pro

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.local.example .env.local
# Edite .env.local e adicione sua VITE_GEMINI_API_KEY
```

### Configuração da API Key

Edite o arquivo `.env.local`:

```env
VITE_GEMINI_API_KEY=sua_chave_api_aqui
```

### Execução Local

```bash
# Modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📖 Como Usar

1. **Acesse a aplicação** e navegue até a aba "Plans"
2. **Preencha o formulário**:
   - Selecione o tipo de instrumento
   - Escolha o tipo de plataforma
   - Insira a TAG do equipamento
3. **Clique em "Gerar Plano"** e aguarde a IA processar
4. **Visualize o plano gerado** com todos os detalhes técnicos
5. **Exporte para PDF** usando a função de impressão do navegador
6. **Consulte o histórico** na aba "Dashboard"

## 🔒 Segurança

- Chaves API armazenadas em variáveis de ambiente
- `.gitignore` configurado para proteger credenciais
- Armazenamento local no navegador para dados sensíveis

## 🛠️ Desenvolvimento

### Scripts Disponíveis

```json
{
  "dev": "vite",           // Servidor de desenvolvimento
  "build": "vite build",   // Build de produção
  "preview": "vite preview" // Preview local do build
}
```

### Estrutura de Tipos

O arquivo `types.ts` define interfaces TypeScript para:

- `MaintenancePlan`: Estrutura completa do plano
- `InstrumentType`: Tipos de instrumentos suportados
- `PlatformType`: FPSO ou Plataforma Fixa
- `UserSettings`: Configurações personalizáveis

## 🌐 Deploy

O projeto está configurado para deploy na **Vercel** com otimizações para SPA React.

**Aplicação em Produção**: [https://offshore-maintenance-pro.vercel.app/](https://offshore-maintenance-pro.vercel.app/)

```bash
# Deploy via Vercel CLI
vercel --prod
```

## 📋 Roadmap

- [ ] Integração com APIs de ERP/CMMS
- [ ] Suporte multilíngue (EN/ES)
- [ ] Exportação direta para PDF
- [ ] Templates customizáveis
- [ ] Integração com bancos de dados externos
- [ ] Sistema de notificações de manutenção

## 👨‍💻 Autor

Desenvolvido por **celloweb-ai** | [GitHub Profile](https://github.com/celloweb-ai)

## 📄 Licença

Este projeto é privado. Todos os direitos reservados.

---

<div align="center">
  
**Desenvolvido com ❤️ para a indústria offshore brasileira**

</div>
