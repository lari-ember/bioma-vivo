## **Checklist de Release Manual**

### **1️⃣ Atualizar versão**

* [ ] Abrir `package.json`
* [ ] Alterar `"version"` para nova versão (ex: `1.2.0`)
* [ ] Salvar arquivo

---

### **2️⃣ Criar commit**

* [ ] No terminal do PyCharm:

```bash
git add package.json
git commit -m "chore(release): X.Y.Z"
```

*(Troque `X.Y.Z` pela nova versão)*

---

### **3️⃣ Criar tag**

* [ ] No terminal:

```bash
git tag vX.Y.Z
git push origin main --tags
```

---

### **4️⃣ Criar release no GitHub**

* [ ] Abrir página do repositório → **Releases**
* [ ] **Draft a new release**
* [ ] Selecionar tag criada (`vX.Y.Z`)
* [ ] Preencher título e changelog (o que mudou)
* [ ] **Publish release**

---

💡 Dica: sempre use **`feat:`, `fix:`, `chore:`** nos commits durante o desenvolvimento — isso facilita depois escrever o changelog.
