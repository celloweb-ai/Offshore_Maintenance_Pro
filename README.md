<div align="center">
  <img src="imagens/github-header.png" alt="Offshore Maintenance Pro Banner" width="100%" />
</div>

<br/>

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61dafb)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646cff)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-orange)](https://ai.google.dev/)

</div>

<br/>

> Sistema avançado de geração de planos de manutenção preventiva e checklists técnicos para instrumentação em plataformas offshore, desenvolvido com IA generativa.

---

## 🎯 Sobre o Projeto

O **Offshore Maintenance Pro** é uma ferramenta especializada que utiliza inteligência artificial do Google Gemini para gerar automaticamente planos de manutenção preventiva técnica detalhados para instrumentação industrial em ambientes offshore (FPSOs e plataformas fixas).

Desenvolvido para engenheiros de instrumentação, técnicos de manutenção e supervisores, o sistema gera documentação técnica em conformidade com:

- **Normas Regulamentadoras Brasileiras**: NR-10, NR-13, NR-37
- **Normas Internacionais**: ISA, IEC, API
- **Boas práticas da indústria de Oil & Gas**

## ✨ Funcionalidades

### 🔧 Geração Inteligente de Planos

- Planos de manutenção personalizados por tipo de instrumento e TAG
- Procedimentos de teste passo a passo com referências normativas
- Especificações técnicas de calibração detalhadas
- Materiais, ferramentas e recursos necessários
- Precauções de segurança específicas para o ambiente offshore

### 📊 Dashboard Gerencial

- Histórico completo de planos gerados
- Métricas e estatísticas de manutenção
- Filtros por plataforma, instrumento e TAG
- Visualização e exportação de documentos

### ⚙️ Configurações Customizáveis

- Definição de pessoal técnico padrão da unidade
- Configuração de cargos de supervisão
- Adaptação aos recursos disponíveis em cada instalação

### 📄 Documentação Profissional

- Formatação otimizada para impressão (A4)
- Campos para assinaturas e validações
- Layout técnico com identidade visual profissional
- Pronto para uso em auditorias e inspeções

## 🛠️ Tecnologias

### Core

- **React 19.2.4** - Interface moderna e responsiva
- **TypeScript 5.8.2** - Tipagem estática para maior confiabilidade
- **Vite 6.2.0** - Build tool de alta performance

### IA e Integração

- **Google Gemini AI** (@google/genai 1.39.0) - Geração de conteúdo técnico
- **Structured Output** - Schema JSON validado para consistência

### Estilos

- **Tailwind CSS** - Estilização utilitária
- **Design System** customizado para aplicações industriais

## 🚀 Instalação e Configuração

### Pré-requisitos

- **Node.js** 18+ instalado
- Chave de API do **Google Gemini AI** ([obter aqui](https://ai.google.dev/))

### Passo a Passo

1. **Clone o repositório**

```bash
git clone https://github.com/celloweb-ai/offshore-maintenance-pro.git
cd offshore-maintenance-pro
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure a chave da API**

Crie um arquivo `.env.local` na raiz do projeto:

```env
GEMINI_API_KEY=sua_chave_api_aqui
```

4. **Execute o projeto em modo de desenvolvimento**

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview
```

## 📁 Estrutura do Projeto

```
offshore-maintenance-pro/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Layout.tsx       # Layout principal com navegação
│   │   ├── PlanForm.tsx     # Formulário de geração de planos
│   │   ├── PlanDisplay.tsx  # Exibição formatada de planos
│   │   └── SettingsPanel.tsx # Painel de configurações
│   ├── services/
│   │   └── geminiService.ts # Integração com Gemini AI
│   ├── types.ts             # Definições de tipos TypeScript
│   ├── App.tsx              # Componente principal
│   ├── index.tsx            # Entry point
│   └── index.css            # Estilos globais e impressão
├── imagens/                 # Assets de imagens
│   └── github-header.png    # Banner do repositório
├── index.html               # Template HTML
├── vite.config.ts           # Configuração do Vite
├── tsconfig.json            # Configuração TypeScript
├── package.json             # Dependências e scripts
└── .env.local.example       # Template de variáveis de ambiente
```

## 🎯 Tipos de Instrumentos Suportados

O sistema gera planos para os seguintes instrumentos:

- **Transmissor de Pressão**
- **Transmissor de Nível**
- **Transmissor de Temperatura**
- **Medidor de Vazão**
- **Válvula de Controle**
- **Válvula de Parada de Emergência (ESD)**
- **Detector de Gás** (Combustível/Tóxico)
- **Manômetro**

## 🏭 Tipos de Plataformas

- **Plataforma Fixa**
- **FPSO** (Floating Production Storage and Offloading)

## 📋 Exemplo de Uso

1. **Acesse a aba "Gerar Plano"**
2. **Selecione o tipo de instrumento** (ex: Transmissor de Pressão)
3. **Escolha o tipo de plataforma** (ex: FPSO)
4. **Informe a TAG do equipamento** (ex: PT-1010A)
5. **Clique em "Gerar Plano de Manutenção Técnica"**
6. **Aguarde a IA processar** (15-30 segundos)
7. **Visualize, edite ou imprima** o documento gerado

## 🔒 Segurança e Boas Práticas

- ✅ Nunca commite o arquivo `.env.local` com suas chaves
- ✅ Use `.env.local.example` como referência
- ✅ Mantenha suas dependências atualizadas
- ✅ Revise sempre os planos gerados antes do uso operacional

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: Nova funcionalidade'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e de uso restrito.

## 👤 Autor

**Marcus Vasconcellos**

- LinkedIn: [@marcusvasconcellos](https://www.linkedin.com/in/marcusvasconcellos)
- GitHub: [@celloweb-ai](https://github.com/celloweb-ai)
- Email: marcus@vasconcellos.net.br

## 🙏 Agradecimentos

- **Google Gemini AI** pela tecnologia de IA generativa
- Comunidade **React** e **TypeScript**
- Profissionais de instrumentação offshore que inspiraram este projeto

---

<div align="center">
  <sub>Desenvolvido com ❤️ para a indústria offshore brasileira</sub>
</div>