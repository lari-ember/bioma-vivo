# Guia de Desenvolvimento - Bioma Vivo

## 📚 Conceitos Fundamentais de Git/GitHub

### O que são Branches?
- **Branch** = ramificação do código, como uma linha de desenvolvimento paralela
- `main` = branch principal (produção)
- `dev` = branch de desenvolvimento
- `feature/nome` = branches para funcionalidades específicas

### Quando fazer Commits?
- ✅ **Commits pequenos e focados**: uma funcionalidade ou correção por vez
- ✅ **Commits frequentes**: sempre que algo funciona
- ❌ **Evitar**: commits gigantes que mudam tudo
- ❌ **Evitar**: commits de uma linha trivial (como adicionar um ponto)

### Exemplos de Commits Apropriados:
```
✅ feat: add lizard color changing functionality
✅ fix: correct syntax errors in lizard movement
✅ docs: add development workflow guide
✅ refactor: improve canvas rendering performance
❌ update README.md (muito vago)
❌ fix everything (muito grande)
```

## 🏷️ Sistema de Versionamento

### Semantic Versioning (SemVer)
- **MAJOR.MINOR.PATCH** (ex: 1.2.3)
- **MAJOR**: mudanças incompatíveis
- **MINOR**: novas funcionalidades compatíveis
- **PATCH**: correções de bugs

### Fases de Desenvolvimento:
1. **0.1.0-alpha**: versão inicial, funcionalidades básicas
2. **0.2.0-alpha**: mais funcionalidades, ainda instável
3. **0.1.0-beta**: versão para testes, mais estável
4. **1.0.0**: primeira versão estável para produção

### Exemplo de Progressão:
```
0.1.0-alpha → 0.2.0-alpha → 0.3.0-alpha → 
0.1.0-beta → 0.2.0-beta → 1.0.0
```

## 🔄 Fluxo de Trabalho (Workflow)

### 1. Desenvolvimento
```bash
git checkout dev
git pull origin dev
# fazer mudanças
git add .
git commit -m "feat: add new feature"
git push origin dev
```

### 2. Pull Request (PR)
- Quando feature está pronta
- De `dev` para `main`
- Code review antes de merge

### 3. Release
- Tag na branch `main`
- Automático via semantic-release

## 🎯 Estrutura do Projeto

```
bioma-vivo/
├── src/                 # Código-fonte
│   ├── index.html      # Página principal
│   ├── main.js         # Sistema principal
│   ├── lizard.js       # Classe do lagarto
│   └── environment.js  # Sistema ambiental
├── assets/             # Recursos (imagens, sons)
├── docs/               # Documentação
├── .github/           # GitHub workflows
└── package.json       # Dependências
```

## 🚀 Como Executar

1. **Desenvolvimento Local**:
   ```bash
   cd src/
   python -m http.server 8000
   # Abrir http://localhost:8000
   ```

2. **PyCharm**:
   - Abrir o arquivo `src/index.html`
   - Clicar com botão direito → "Open in Browser"

## 🎮 Controles

- **Mouse**: Move o lagarto
- **Clique**: Muda cor do lagarto
- **Espaço**: Alterna dia/noite
- **P**: Pausa/despause
- **I**: Mostra informações
- **R**: Reset do lagarto
- **D** (segurar): Debug info

## 🐛 Debugging

1. **Console do Browser** (F12):
   ```javascript
   // Ver informações do lagarto
   lizard.getInfo()
   
   // Ver informações do ambiente
   environment.getTimeInfo()
   ```

2. **Performance**:
   - Segurar tecla 'D' para debug visual
   - Console mostra FPS e estatísticas

## 📋 Próximos Passos

### Versão 0.2.0-alpha:
- [ ] Mais animais (caranguejo, borboleta)
- [ ] Sistema de estados (fome, sono, curiosidade)
- [ ] Efeitos de clima (chuva, vento)

### Versão 0.3.0-alpha:
- [ ] Integração com calendário
- [ ] Persistência de estado
- [ ] Otimizações de performance

### Versão 1.0.0:
- [ ] Integração com wallpaper do Pop!_OS
- [ ] Sistema completo de bioma
- [ ] Documentação completa

## 🔧 Ferramentas Recomendadas

- **Editor**: PyCharm (configurado)
- **Browser**: Firefox/Chrome (dev tools)
- **Testing**: Servidor local HTTP
- **Git**: Terminal ou PyCharm integrado

## 📖 Recursos para Aprender

- [Git Guide](https://git-scm.com/docs)
- [Semantic Versioning](https://semver.org/)
- [HTML5 Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [JavaScript ES6+](https://developer.mozilla.org/en-US/docs/Web/JavaScript)