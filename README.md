# DevConnect — Frontend

Projeto frontend da aplicação DevConnect: uma plataforma para desenvolvedores se conectarem, gerenciar perfil, projetos e relações.

**Status:** Em desenvolvimento

**Stack principal:** React, TypeScript, Vite, Emotion, MUI

## Visão geral

Este repositório contém a aplicação frontend do DevConnect. A arquitetura é baseada em Vite + React com TypeScript e utiliza Emotion para estilização e MUI para componentes onde aplicável. A comunicação com o backend é feita via Axios e a organização do código segue uma estrutura por features para facilitar manutenção e escalabilidade.

## Recursos principais

- Autenticação (signin / signup)
- Perfil do usuário (visualização e edição)
- Gerenciamento de projetos do usuário
- Relações (amigos/contatos)
- Organização modular por features e hooks

## Tecnologias

- React 19
- TypeScript
- Vite
- Emotion
- MUI
- Axios
- Zustand
- Vitest (testes)
- ESLint + Prettier (qualidade de código)
- Husky + Commitlint (qualidade de commits)

## Pré-requisitos

- Node.js (recomenda-se >= 18)
- npm ou yarn

## Instalação rápida

1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd devconnect-frontend
```

2. Instale as dependências

```bash
npm install
# ou
yarn
```

## Scripts úteis

Os scripts disponíveis (conforme `package.json`):

- `npm run dev` — inicia a aplicação em modo desenvolvimento (Vite)
- `npm run build` — compila TypeScript e gera build do Vite
- `npm run preview` — pré-visualiza o build de produção
- `npm run test` — executa os testes com Vitest
- `npm run lint` — roda o ESLint
- `npm run format` — formata o código com Prettier

Exemplo (desenvolvimento):

```bash
npm run dev
```

## Variáveis de ambiente

Crie um arquivo `.env` baseado em `.env.example` (se existir) com as URLs da API e chaves necessárias. Exemplo:

```
VITE_API_BASE_URL=https://api.exemplo.com
```

## Estrutura do projeto (resumo)

- `src/app` — entrada da aplicação e tema
- `src/features` — conjunto de features por domínio (auth, home, profile, relation, ...)
- `src/shared` — componentes compartilhados, rotas, contexto e infra (API/serviços)
- `src/types` — tipos TypeScript compartilhados

Para mais detalhes, navegue pelas pastas em `src`.

## Testes

O projeto utiliza `vitest`. Para executar os testes:

```bash
npm run test
```

## Padrões e qualidade

- Lint: ESLint
- Formatação: Prettier
- Hooks de commit: Husky + Commitlint

## Como contribuir

1. Abra uma issue descrevendo o problema ou feature.
2. Crie uma branch: `feature/nome-da-feature`.
3. Faça commits atômicos e siga o padrão de mensagens (Commitlint).
4. Abra um Pull Request com descrição clara das mudanças e instruções para teste.

## Deploy

O build é feito com Vite (`npm run build`). Ajuste a configuração de deploy conforme o ambiente (CDN, Netlify, Vercel, servidor estático, etc.).



## Demo

[![Assistir demo atual do projeto](https://img.youtube.com/vi/UMsZFdwbDxA/0.jpg)](https://youtu.be/UMsZFdwbDxA)


## Proximos passos
- Atualizar automaticamente quando bloquear na tela de relations
- Adicionar navegação de volta para Home
- 