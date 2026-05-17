# GitFlow — Diretrizes do Projeto Totem de Check-in PrettyFlights

**Versão do documento:** 0.1.0
**Projeto:** Totem de Check-in — PrettyFlights v1.0.0
**Data de criação:** 2025-05-17

---

## 1. Introdução

Este documento descreve as diretrizes de uso do GitFlow adotadas no desenvolvimento
do Módulo do Totem de Check-in da PrettyFlights. O GitFlow é uma estratégia de
branching que organiza o fluxo de trabalho em torno de branches bem definidas,
garantindo rastreabilidade, paralelismo seguro e entregas controladas.

---

## 2. Estrutura de Branches

### 2.1 Branches Permanentes

| Branch    | Finalidade |
|-----------|-----------|
| `main`    | Código em produção. Toda tag de versão parte daqui. |
| `develop` | Integração contínua das features. Base para releases. |

### 2.2 Branches Temporárias

| Prefixo       | Criada a partir de | Mergeada em        | Finalidade |
|---------------|-------------------|--------------------|-----------|
| `feature/*`   | `develop`         | `develop`          | Novas funcionalidades |
| `release/*`   | `develop`         | `main` + `develop` | Preparação de versão |
| `hotfix/*`    | `main`            | `main` + `develop` | Correções emergenciais |
| `bugfix/*`    | `develop`         | `develop`          | Correções não urgentes |

---

## 3. Convenção de Commits

Seguimos o padrão **Conventional Commits**:

```
<tipo>(escopo): mensagem curta no imperativo

Tipos: feat, fix, chore, docs, test, refactor, style, ci
```

---

## 4. Regras Gerais

- Nunca fazer commit direto em `main` ou `develop`
- Pull Requests obrigatórios para merge em branches permanentes
- Tags semânticas (SemVer) criadas apenas na `main`

---

## 5. Ciclo de Vida de uma Feature

1. **Criar** branch `feature/<nome>` a partir de `develop`
2. **Desenvolver** em commits atômicos e bem descritos
3. **Testar** localmente antes de abrir Pull Request
4. **Merge** via `--no-ff` em `develop` para preservar histórico
5. **Deletar** a branch de feature após o merge

### Exemplo — feature/leitura-passagem

```bash
git checkout -b feature/leitura-passagem develop
# ... desenvolvimento ...
git checkout develop
git merge --no-ff feature/leitura-passagem
git branch -d feature/leitura-passagem
```

Esta feature implementou o módulo de leitura e validação do código de
barras/QR Code da passagem do passageiro no totem físico.
