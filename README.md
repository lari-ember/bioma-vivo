# Bioma Vivo

Wallpaper animado e interativo para Linux (Pop!_OS), simulando um ecossistema dinâmico que muda conforme hora do dia, clima e interações do usuário.

## 🦎 Funcionalidades Atuais (v0.1.0-alpha)

- **Lagarto de 8 patas** que segue o cursor do mouse
- **Sistema dia/noite** com mudança visual completa
- **Cores dinâmicas** - clique para alterar cor do lagarto
- **Partículas ambientais** (pólen e folhas flutuantes)
- **Performance otimizada** com controle de FPS
- **Controles responsivos** (mouse, teclado e botões)

## 🎮 Como Usar

### Execução Local
```bash
cd src/
python3 -m http.server 8000
# Abrir http://localhost:8000
```

### Controles
- **Mouse**: Move o lagarto
- **Clique**: Muda cor do lagarto  
- **Espaço**: Alterna dia/noite
- **P**: Pausa/despause
- **I**: Mostra informações no console
- **D** (segurar): Debug visual

## 🐧 Usar como Wallpaper no Pop!_OS

Ver [Guia de Wallpaper](docs/WALLPAPER_POPOS.md) para instruções completas de integração com Wayland.

## 🗂 Estrutura do Projeto
```
bioma-vivo/
├── src/                    # Código-fonte
│   ├── index.html         # Interface principal
│   ├── main.js           # Sistema principal e game loop
│   ├── lizard.js         # Classe do lagarto
│   └── environment.js    # Sistema ambiental
├── docs/                 # Documentação
│   ├── DESENVOLVIMENTO.md # Guia de desenvolvimento  
│   └── WALLPAPER_POPOS.md # Guia para Pop!_OS
└── assets/              # Recursos futuros
```

## 🛠 Tecnologias
- **HTML5 Canvas** - Renderização 2D
- **JavaScript ES6+** - Lógica e animações
- **CSS3** - Estilos e temas
- **Git/GitHub** - Versionamento e workflow
- **Semantic Release** - Automação de versões

## 📋 Roadmap

### v0.2.0-alpha
- [ ] Caranguejo que anda lateralmente
- [ ] Borboletas psicodélicas
- [ ] Sistema de estados dos animais (fome, sono)

### v0.3.0-alpha  
- [ ] Integração com calendário Google
- [ ] Formigas construtoras
- [ ] Peixes em lago virtual

### v1.0.0
- [ ] Integração completa com Pop!_OS
- [ ] API de clima real
- [ ] Persistência de dados
- [ ] Múltiplos biomas

## 🚀 Para Desenvolvedores

Ver [Guia de Desenvolvimento](docs/DESENVOLVIMENTO.md) para:
- Conceitos de Git/GitHub
- Fluxo de trabalho
- Padrões de commit
- Sistema de versionamento

## 📸 Screenshots

O lagarto segue suavemente o cursor, possui animação de patas realista e muda de cor ao clicar. O ambiente alterna entre modo dia (céu azul, sol, partículas douradas) e noite (céu escuro, lua, estrelas).

## 🎯 Objetivo Final
Criar um wallpaper "vivo" que simule um ecossistema real, com animais autônomos, clima dinâmico e interações naturais para tornar o desktop mais interessante e relaxante.

## 📜 Licença
[MIT License](LICENSE) - Livre para uso pessoal e comercial.

