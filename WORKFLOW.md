# 📜 Workflow do Projeto Bioma Vivo

Este documento descreve o fluxo de trabalho padrão para desenvolvimento, revisão e publicação no projeto **Bioma Vivo**.

---

## 1️⃣ Abrir uma Issue
- **O que é:** Uma *issue* representa uma tarefa, melhoria ou correção.
- **Como abrir:**
  1. No GitHub, vá até a aba **Issues** → **New Issue**.
  2. Escolha o template adequado (ex: bug, feature).
  3. Dê um título claro e objetivo.
  4. Descreva o que precisa ser feito, contexto e critérios de aceitação.
- **Regra:** Sempre que for começar algo novo, abra uma issue antes de codar.

---

## 2️⃣ Criar uma Branch
- **O que é:** Uma cópia do código para desenvolver sem afetar o código estável.
- **Padrão de nome:**  
```

tipo/numero-da-issue-descricao-curta

````
Exemplos:
- `feat/12-canvas-lagarto`
- `fix/8-corrigir-erro-patas`

- **Como criar (a partir da `dev`):**
```bash
git checkout dev
git pull origin dev
git checkout -b feat/12-canvas-lagarto
````

---

## 3️⃣ Fazer Commits

* **O que é:** Registro de alterações no código.
* **Quando commitar:** Ao terminar uma parte lógica e testada.
* **Formato da mensagem (Conventional Commits):**

  ```
  tipo: descrição curta
  ```

  Exemplos:

  * `feat: adicionar movimento do lagarto`
  * `fix: corrigir cálculo de ângulo das patas`
  * `docs: atualizar README com instruções de instalação`

---

## 4️⃣ Abrir Pull Request (PR)

* **O que é:** Solicitação para juntar alterações de uma branch na `dev` ou `main`.
* **Como abrir:**

  1. Subir branch para o GitHub:

     ```bash
     git push origin feat/12-canvas-lagarto
     ```
  2. No GitHub, abrir **Pull Request** e vincular à issue.
  3. Descrever mudanças e marcar revisores.

---

## 5️⃣ Revisar e Mesclar

* Conferir se:

  * Passou nos testes.
  * Código segue o padrão.
  * Issue associada está concluída.
* Mesclar na branch de destino (`dev` normalmente).

---

## 6️⃣ Versionar e Publicar

* **Quando:** Ao integrar no `main` uma nova versão funcional.
* **Padrão de versão:** [SemVer](https://semver.org/lang/pt-BR/):

  * `MAJOR.MINOR.PATCH` (ex: `1.2.3`)
  * `0.x.x` para versões iniciais.
* Atualizar `CHANGELOG.md` e criar release no GitHub.

---

## 7️⃣ Kanban

* **Colunas:**

  * **Backlog**: Ideias e tarefas futuras.
  * **To Do**: Tarefas prontas para iniciar.
  * **In Progress**: O que está em andamento.
  * **Review**: PRs aguardando revisão.
  * **Done**: Concluído e mesclado.

