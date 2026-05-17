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

---

## 6. Ciclo de Vida de uma Release

1. **Criar** `release/<versão>` a partir de `develop`
2. **Bump** de versão em `package.json`, `index.js` e similares
3. **Preparar** CHANGELOG e ajustes finais (sem novas features)
4. **Merge** em `main` via `--no-ff`
5. **Tag** semântica anotada na `main` (`git tag -a vX.Y.Z`)
6. **Merge** de volta em `develop` para sincronizar alterações
7. **Deletar** a branch de release

### Exemplo — release/1.0.0

```bash
git checkout -b release/1.0.0 develop
# bump versão, CHANGELOG...
git checkout main
git merge --no-ff release/1.0.0
git tag -a v1.0.0 -m "Release v1.0.0"
git checkout develop
git merge --no-ff release/1.0.0
git branch -d release/1.0.0
```

---

## 7. Ciclo de Vida de um Hotfix

Hotfixes corrigem bugs críticos diretamente em produção, sem passar pelo fluxo normal.

1. **Criar** `hotfix/<descricao>` a partir de `main`
2. **Corrigir** o bug com commits cirúrgicos
3. **Bump** de versão patch (ex: 1.0.0 → 1.0.1)
4. **Merge** em `main` via `--no-ff`
5. **Tag** de patch na `main`
6. **Merge** em `develop` para garantir que a correção não seja perdida
7. **Deletar** a branch de hotfix

### Exemplo — hotfix/validacao-data-passagem

**Bug reportado:** O totem permitia check-in com passagens de datas passadas.
**Causa raiz:** Ausência de validação da data do voo no momento da leitura.
**Solução:** Adicionada função `validarDataPassagem()`.

```bash
git checkout -b hotfix/validacao-data-passagem main
# correção...
git checkout main
git merge --no-ff hotfix/validacao-data-passagem
git tag -a v1.0.1 -m "Hotfix v1.0.1"
git checkout develop
git merge --no-ff hotfix/validacao-data-passagem
git branch -d hotfix/validacao-data-passagem
```

---

## 8. Fluxo Visual GitFlow — PrettyFlights Totem

```
main:    ──●────────────────────────●──────────────────●──
           │ (commit inicial)       │ (tag: v1.0.0)    │ (tag: v1.0.1)
           │                    merge←release       merge←hotfix
           │                        │                   │
develop: ──●──●──●──────────────────●──────────────────●──
              │  │  feature merged  │  release synced  │  hotfix synced
              │  └──────────────────┘                  │
feature:      └──●──●──┘                               │
                                                        │
hotfix:                                         main───●──●──┘
```

---

*Documento mantido pela equipe de engenharia da PrettyFlights.*
*Versão atual do documento: 0.4.0*
