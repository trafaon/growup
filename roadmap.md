# Roadmap do Web App de Plano de Desenvolvimento Individual (PDI) com o Modelo GROW

## 0. **Requisitos Técnicos**
### 0.1 **Compatibilidade**
- **Navegadores Suportados:**
  - Chrome (última versão)
  - Firefox (última versão)
  - Safari (última versão)
  - Edge (última versão)
- **Dispositivos:**
  - Desktop (min. 1024px)
  - Tablet (min. 768px)
  - Mobile (min. 320px)

### 0.2 **Requisitos de Sistema**
- Node.js 14.x ou superior
- NPM 6.x ou superior
- Conexão com internet estável

## 1. **Visão Geral do Projeto**
O objetivo do app é permitir que os usuários construam e acompanhem seus Planos de Desenvolvimento Individual utilizando o modelo GROW:
- **G (Goal)** - Definição de metas claras.
- **R (Reality)** - Entendimento da realidade atual.
- **O (Options)** - Exploração das opções disponíveis.
- **W (Way Forward/Will)** - Identificação do caminho e plano de ação para avançar.

O web app deve ser simples, intuitivo e focado na experiência do usuário, incentivando o uso constante.

---

## 2. **Funcionalidades Principais**
### 2.0 **Acessibilidade e Usabilidade**
- Suporte a navegação por teclado
- Atributos ARIA para leitores de tela
- Alto contraste para elementos importantes
- Feedback sonoro para ações críticas
- Textos com tamanho ajustável

### 2.1 **Autenticação**
- ✅ Login simplificado via **Google Account** (OAuth 2.0).
- ✅ Permitir logout a qualquer momento.

### 2.2 **Modelo GROW Estruturado**
Cada etapa do modelo deve ser exibida com clareza:
1. **Goal (Meta):**
   - ✅ Usuário define o objetivo que quer alcançar.
   - ✅ Campos para descrição objetiva e indicadores de sucesso.
   - **Exemplo de Uso:**
     ```
     Objetivo: "Desenvolver habilidades de liderança técnica"
     Indicadores: "Liderar 2 projetos técnicos nos próximos 6 meses"
     ```

2. **Reality (Realidade):**
   - ✅ Usuário descreve sua situação atual relacionada à meta.
   - ✅ Reflexão guiada com perguntas-padrão (e.g., "Quais os desafios enfrentados até agora?").
   - **Exemplo de Uso:**
     ```
     Situação Atual: "Atuo como desenvolvedor sênior sem experiência formal em liderança"
     Desafios: "Necessidade de melhorar comunicação e gestão de conflitos"
     ```

3. **Options (Opções):**
   - ✅ Campos para listar ideias de soluções e próximos passos possíveis.
   - ✅ Possibilidade de adicionar múltiplas soluções em um campo

4. **Way Forward/Will (Caminho ou Vontade):**
   - ✅ Definição do plano de ação prático com datas e atividades.
   - ✅ Campo de plano de ação detalhado

### 2.3 **Design com Identidade Visual**
- Paleta de cores harmoniosa e distinta para cada etapa do GROW:
   - ✅ **Goal:** Verde (progresso e crescimento).
   - ✅ **Reality:** Azul claro (reflexão e realidade).
   - ✅ **Options:** Amarelo (criatividade e possibilidades).
   - ✅ **Way Forward/Will:** Laranja (movimento e ação).
- ✅ Design responsivo e acessível

### 2.4 **Funcionalidades Extras**
- ✅ Salvamento automático em banco de dados com debounce
- ✅ Dashboard com listagem de PDIs e progresso
- ✅ Exportar o PDI em formato PDF
- ✅ Notificações para prazos próximos

### 2.5 **Funcionalidades Adicionais Implementadas**
- ✅ Múltiplos PDIs por usuário
- ✅ Sistema de progresso com checklist
- ✅ Histórico de progresso com timeline
- ✅ Exclusão de PDIs com confirmação
- ✅ Navegação entre PDIs
- ✅ Visualização de progresso em tempo real

### 2.6 **Segurança e Privacidade**
- Criptografia de dados sensíveis
- Conformidade com LGPD/GDPR
- Backups automáticos diários
- Logs de auditoria para ações críticas

### 2.7 **Resiliência**
- Cache local para operação offline
- Sincronização automática quando online
- Retry automático em falhas de rede
- Validação de dados em ambos os lados

---

## 3. **Tecnologias Implementadas**
- ✅ **Frontend:** React.js com Tailwind CSS
- ✅ **Autenticação:** Firebase Auth com Google OAuth 2.0
- ✅ **Banco de Dados:** Firebase Firestore
- ✅ **Exportação PDF:** jsPDF
- ✅ **Gerenciamento de Estado:** React Hooks (useState, useEffect)
- ✅ **Roteamento:** React Router v6
- ✅ **Data Formatting:** date-fns

---

## 4. **Documentação**
### 4.0 **Configuração do Ambiente**
```bash
# Instalação de dependências
npm install firebase react-router-dom react-firebase-hooks jspdf date-fns @tailwindcss/forms

# Configuração do Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 4.1 **Bibliotecas e Frameworks**
- [React.js](https://react.dev/) - Framework JavaScript para construção de interfaces
- [Node.js](https://nodejs.org/) - Ambiente de execução JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
  - [@tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms) - Plugin para estilização de formulários
- [Firebase](https://firebase.google.com/docs) - Plataforma de desenvolvimento
  - [Authentication](https://firebase.google.com/docs/auth) - Autenticação com Google
  - [Firestore](https://firebase.google.com/docs/firestore) - Banco de dados NoSQL
- [React Router](https://reactrouter.com/) - Roteamento para React
- [jsPDF](https://artskydj.github.io/jsPDF/docs/jsPDF.html) - Geração de PDFs
- [date-fns](https://date-fns.org/) - Utilitários para manipulação de datas
- [react-firebase-hooks](https://github.com/CSFrequency/react-firebase-hooks) - Hooks para Firebase

### 4.2 **Configurações Necessárias**
#### Firebase
```javascript:src/config/firebase.js
const firebaseConfig = {
  apiKey: "seu-api-key",
  authDomain: "seu-auth-domain",
  projectId: "seu-project-id",
  storageBucket: "seu-storage-bucket",
  messagingSenderId: "seu-sender-id",
  appId: "seu-app-id"
};
```

#### Tailwind CSS
```javascript:tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
```

### 4.3 **Estrutura do Projeto**
```
src/
├── components/          # Componentes reutilizáveis
│   ├── DeleteModal     # Modal de confirmação de exclusão
│   ├── NotificationBanner # Sistema de notificações
│   ├── PrivateRoute    # Proteção de rotas autenticadas
│   └── ProgressHistory # Histórico de progresso
├── config/
│   └── firebase.js     # Configuração do Firebase
├─��� pages/
│   ├── Dashboard       # Página principal do PDI
│   ├── Login          # Página de autenticação
│   └── PlansOverview  # Lista de PDIs
└── App.jsx            # Componente principal e rotas
```

### 4.4 **Funcionalidades Detalhadas**
- **Autenticação:**
  - Login com Google usando Firebase Auth
  - Proteção de rotas com PrivateRoute
  - Persistência de sessão
  - Redirecionamento automático

- **PDI GROW:**
  - Criação e edição de PDIs
  - Salvamento automático com debounce
  - Sistema de progresso com checklist
  - Histórico de alterações de progresso
  - Exportação para PDF
  - Múltiplos PDIs por usuário
  - Navegação entre PDIs

- **Notificações:**
  - Sistema de notificações para prazos
  - Verificação automática a cada hora
  - Notificações descartáveis
  - Alertas visuais não intrusivos

- **Interface:**
  - Design responsivo
  - Cores temáticas por seção
  - Feedback visual de ações
  - Modais de confirmação
  - Loading states

### 4.5 **Modelo de Dados (Firestore)**
```javascript
grows/
└── [documentId]/
     ├── title: string
     ├── userId: string
     ├── createdAt: timestamp
     ├── progress: number
     ├── progressHistory: array[
     │   └── {
     │       progress: number,
     │       timestamp: string,
     │       note?: string
     │   }
     │ ]
     ├── goal: {
     │   ├── objective: string
     │   └── indicators: string
     │ }
     ├── reality: {
     │   ├── currentSituation: string
     │   └── challenges: string
     │ }
     ├── options: {
     │   └── solutions: string
     │ }
     └── wayForward: {
         ├── actionPlan: string
         └── deadline: string
     }
```

### 4.6 **Fluxo de Dados**
1. **Autenticação:**
   - Login via Google → Firebase Auth → Redirecionamento para /plans

2. **Listagem de PDIs:**
   - Query Firestore por userId → Renderização dos cards de PDI

3. **Edição de PDI:**
   - Alterações no formulário → Debounce (1s) → Salvamento no Firestore

4. **Progresso:**
   - Atualização de checklist → Cálculo de progresso → Atualização do histórico

5. **Notificações:**
   - Verificação horária de deadlines → Exibição de notificações

### 4.7 **Boas Práticas Implementadas**
- Debounce para otimização de salvamento
- Proteção de rotas autenticadas
- Feedback visual para todas as ações
- Confirmação para ações destrutivas
- Salvamento automático para prevenir perda de dados
- Componentização para reusabilidade
- Responsividade em todas as telas

---

## 5. **Deployment e Manutenção**
### 5.1 **Ambiente de Produção**
- Hospedagem: Firebase Hosting
- CDN: Firebase CDN
- Certificado SSL automático
- Domínio personalizado

### 5.2 **Monitoramento**
- Firebase Analytics para uso
- Firebase Crashlytics para erros
- Console de logs centralizado
- Alertas automáticos para erros críticos

### 5.3 **Testes**
- Testes unitários com Jest
- Testes de integração com Testing Library
- Testes E2E com Cypress
- Cobertura mínima: 80%

---

## 6. **Roadmap de Evolução**
### 6.1 **MVP (Atual)**
- ✅ Autenticação básica
- ✅ CRUD de PDIs
- ✅ Modelo GROW
- ✅ Notificações básicas

### 6.2 **Fase 2 (Próxima)**
- Sistema de mentoria
- Compartilhamento de PDIs
- Dashboard analítico
- Push notifications

### 6.3 **Fase 3 (Futuro)**
- Integração com calendário
- Templates de PDI
- IA para sugestões
- App mobile nativo

