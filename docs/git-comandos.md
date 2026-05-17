# Git — 20 Comandos Essenciais por Categoria

> Referência rápida com explicação e exemplos práticos para cada comando.

---

## 🗂️ Categoria 1: Configuração e Inicialização

### 1. `git config`
Configura opções do Git no escopo local, global ou de sistema (nome, e-mail, editor, aliases, etc.).

```bash
# Exemplo 1 — configurar identidade global
git config --global user.name "Ana Souza"
git config --global user.email "ana@prettyflights.com"

# Exemplo 2 — definir editor padrão e listar todas as configurações
git config --global core.editor "code --wait"
git config --list
```

---

### 2. `git init`
Inicializa um repositório Git em um diretório, criando a pasta `.git` com toda a estrutura interna.

```bash
# Exemplo 1 — inicializar repositório no diretório atual
cd totem-checkin/
git init

# Exemplo 2 — inicializar repositório bare (para uso como servidor remoto)
git init --bare /srv/repos/totem-checkin.git
```

---

### 3. `git clone`
Clona um repositório remoto para a máquina local, copiando todo o histórico e as branches.

```bash
# Exemplo 1 — clonar repositório pelo HTTPS
git clone https://github.com/prettyflights/totem-checkin.git

# Exemplo 2 — clonar em uma pasta com nome personalizado
git clone https://github.com/prettyflights/totem-checkin.git meu-totem
```

---

## 📸 Categoria 2: Staging e Commits

### 4. `git add`
Adiciona arquivos ou mudanças à área de staging (índice), preparando-os para o próximo commit.

```bash
# Exemplo 1 — adicionar arquivo específico
git add src/checkin/passagem.js

# Exemplo 2 — adicionar tudo de forma interativa (escolher hunk a hunk)
git add -p
```

---

### 5. `git commit`
Cria um snapshot permanente das mudanças em staging com uma mensagem descritiva.

```bash
# Exemplo 1 — commit com mensagem inline
git commit -m "feat(checkin): implementa leitura de QR Code da passagem"

# Exemplo 2 — adicionar ao staging e commitar arquivos rastreados em uma etapa
git commit -am "fix: corrige regex de validação do código de passagem"
```

---

### 6. `git status`
Mostra o estado atual do diretório de trabalho e da área de staging.

```bash
# Exemplo 1 — visualizar estado completo
git status

# Exemplo 2 — formato compacto (útil em scripts e terminais estreitos)
git status -s
```

---

### 7. `git diff`
Exibe as diferenças entre o diretório de trabalho, staging e commits.

```bash
# Exemplo 1 — ver o que mudou mas ainda não foi adicionado ao staging
git diff

# Exemplo 2 — comparar dois commits específicos
git diff v1.0.0 v1.0.1 -- src/checkin/passagem.js
```

---

## 🌿 Categoria 3: Branches

### 8. `git branch`
Cria, lista, renomeia ou deleta branches locais e remotas.

```bash
# Exemplo 1 — listar todas as branches (locais e remotas)
git branch -a

# Exemplo 2 — deletar branch local após merge concluído
git branch -d feature/leitura-passagem
```

---

### 9. `git checkout`
Navega entre branches, commits ou restaura arquivos do histórico.

```bash
# Exemplo 1 — criar e mudar para nova branch de feature
git checkout -b feature/selecao-assento develop

# Exemplo 2 — restaurar arquivo ao estado do último commit
git checkout -- src/checkin/passagem.js
```

---

### 10. `git switch`
Comando moderno (Git 2.23+) para trocar de branch, separando a responsabilidade do `checkout`.

```bash
# Exemplo 1 — mudar para a branch develop
git switch develop

# Exemplo 2 — criar e mudar para nova branch
git switch -c feature/impressao-boarding-pass
```

---

## 🔀 Categoria 4: Integração de Código

### 11. `git merge`
Integra o histórico de uma branch em outra, podendo criar um commit de merge explícito.

```bash
# Exemplo 1 — merge com commit explícito (padrão GitFlow)
git checkout develop
git merge --no-ff feature/leitura-passagem -m "merge: integra feature/leitura-passagem"

# Exemplo 2 — merge fast-forward (sem commit extra, histórico linear)
git merge --ff-only hotfix/typo-mensagem
```

---

### 12. `git rebase`
Reaplica commits de uma branch sobre outra, reescrevendo o histórico para maior linearidade.

```bash
# Exemplo 1 — rebasear feature sobre develop atualizada
git checkout feature/selecao-assento
git rebase develop

# Exemplo 2 — rebase interativo para limpar commits antes de abrir PR
git rebase -i HEAD~3
```

---

## 🌐 Categoria 5: Repositórios Remotos

### 13. `git remote`
Gerencia as conexões com repositórios remotos (adicionar, listar, remover, renomear).

```bash
# Exemplo 1 — adicionar remote de origem
git remote add origin https://github.com/prettyflights/totem-checkin.git

# Exemplo 2 — listar remotes com suas URLs
git remote -v
```

---

### 14. `git fetch`
Baixa objetos e referências do remoto sem alterar o diretório de trabalho local.

```bash
# Exemplo 1 — buscar atualizações de todos os remotes
git fetch --all

# Exemplo 2 — buscar e remover branches remotas que foram deletadas
git fetch --prune origin
```

---

### 15. `git pull`
Busca e integra mudanças do repositório remoto na branch atual (`fetch` + `merge` ou `rebase`).

```bash
# Exemplo 1 — pull padrão na branch atual
git pull origin develop

# Exemplo 2 — pull com rebase para manter histórico linear
git pull --rebase origin develop
```

---

### 16. `git push`
Envia commits locais para o repositório remoto.

```bash
# Exemplo 1 — enviar branch atual e definir upstream
git push -u origin develop

# Exemplo 2 — enviar tag específica para o remoto
git push origin v1.0.0
```

---

## 🔍 Categoria 6: Inspeção e Histórico

### 17. `git log`
Exibe o histórico de commits com várias opções de formatação e filtragem.

```bash
# Exemplo 1 — log resumido em uma linha com grafo de branches
git log --oneline --graph --all --decorate

# Exemplo 2 — log filtrando por autor e período
git log --author="Ana Souza" --since="2025-01-01" --until="2025-12-31"
```

---

### 18. `git tag`
Cria marcadores nomeados (tags) em commits específicos, usados para marcar versões de release.

```bash
# Exemplo 1 — criar tag anotada na versão atual
git tag -a v1.0.0 -m "Release v1.0.0 — Totem de Check-in PrettyFlights"

# Exemplo 2 — listar tags existentes com suas mensagens
git tag -l -n1
```

---

## 🛠️ Categoria 7: Desfazendo e Ajustando

### 19. `git reset`
Move o ponteiro HEAD (e opcionalmente a área de staging/diretório) para um commit anterior.

```bash
# Exemplo 1 — desfazer último commit mantendo as mudanças em staging
git reset --soft HEAD~1

# Exemplo 2 — descartar completamente as mudanças do último commit (cuidado!)
git reset --hard HEAD~1
```

---

### 20. `git stash`
Armazena temporariamente mudanças não commitadas para limpar o diretório de trabalho.

```bash
# Exemplo 1 — guardar mudanças com uma mensagem descritiva
git stash push -m "WIP: validação de assento no totem"

# Exemplo 2 — listar stashes e restaurar o mais recente
git stash list
git stash pop
```

---

## 📊 Resumo Visual

| # | Comando | Categoria | O que faz |
|---|---------|-----------|-----------|
| 1 | `git config` | Configuração | Define identidade e preferências |
| 2 | `git init` | Configuração | Inicializa repositório |
| 3 | `git clone` | Configuração | Clona repositório remoto |
| 4 | `git add` | Staging | Prepara mudanças para commit |
| 5 | `git commit` | Staging | Salva snapshot no histórico |
| 6 | `git status` | Staging | Mostra estado atual |
| 7 | `git diff` | Staging | Compara versões |
| 8 | `git branch` | Branches | Gerencia branches |
| 9 | `git checkout` | Branches | Navega entre branches/commits |
| 10 | `git switch` | Branches | Troca de branch (moderno) |
| 11 | `git merge` | Integração | Une histórico de branches |
| 12 | `git rebase` | Integração | Reaplica commits linearmente |
| 13 | `git remote` | Remoto | Gerencia conexões remotas |
| 14 | `git fetch` | Remoto | Baixa sem integrar |
| 15 | `git pull` | Remoto | Baixa e integra |
| 16 | `git push` | Remoto | Envia commits ao remoto |
| 17 | `git log` | Histórico | Inspeciona histórico |
| 18 | `git tag` | Histórico | Marca versões/releases |
| 19 | `git reset` | Desfazendo | Reverte para estado anterior |
| 20 | `git stash` | Desfazendo | Guarda mudanças temporariamente |
