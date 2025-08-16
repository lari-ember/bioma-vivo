# Como Usar como Wallpaper no Pop!_OS (Wayland)

## 🐧 Pop!_OS 22.04 LTS + Wayland

Seu sistema está rodando **Wayland** (padrão no Pop!_OS 22.04). Aqui estão as opções para usar o Bioma Vivo como wallpaper animado:

### Opção 1: Hanabi Extension (Recomendado)

1. **Instalar a extensão Hanabi**:
   ```bash
   # Baixar da GitHub
   git clone https://github.com/jeffshee/gnome-ext-hanabi.git
   cd gnome-ext-hanabi
   
   # Instalar
   make install
   ```

2. **Configurar o Bioma Vivo**:
   ```bash
   # No diretório do projeto
   cp -r src/ ~/.local/share/hanabi/bioma-vivo/
   ```

3. **Ativar**:
   - Abrir Extensions (`gnome-extensions-app`)
   - Ativar "Hanabi"
   - Selecionar pasta do Bioma Vivo

### Opção 2: mpvpaper (Alternativa)

1. **Instalar mpvpaper**:
   ```bash
   sudo apt update
   sudo apt install mpv
   
   # Compilar mpvpaper
   git clone https://github.com/GhostNaN/mpvpaper.git
   cd mpvpaper
   meson build
   ninja -C build
   sudo ninja -C build install
   ```

2. **Converter para vídeo (temporário)**:
   ```bash
   # Gravar o canvas como vídeo
   ffmpeg -f x11grab -r 30 -s 1920x1080 -i :0.0 bioma-vivo.mp4
   ```

3. **Usar como wallpaper**:
   ```bash
   mpvpaper -o "loop" eDP-1 bioma-vivo.mp4
   ```

### Opção 3: Servidor Local + Browser em Kiosk

1. **Script de execução**:
   ```bash
   #!/bin/bash
   # ~/bin/bioma-vivo.sh
   
   cd ~/bioma-vivo/src
   python3 -m http.server 8000 &
   SERVER_PID=$!
   
   sleep 2
   
   chromium-browser --app=http://localhost:8000 \
       --start-fullscreen \
       --no-toolbar \
       --disable-web-security \
       --disable-features=VizDisplayCompositor
   
   kill $SERVER_PID
   ```

2. **Tornar executável**:
   ```bash
   chmod +x ~/bin/bioma-vivo.sh
   ```

3. **Configurar como aplicação de inicialização**:
   - Abrir "Startup Applications"
   - Adicionar `~/bin/bioma-vivo.sh`

## ✅ Solução Recomendada: Hanabi

A extensão **Hanabi** é a melhor opção porque:
- ✅ Nativa para Wayland/GNOME
- ✅ Suporte a HTML5/WebGL
- ✅ Performance otimizada
- ✅ Integração completa com sistema

## 🔧 Verificar se é Wayland

```bash
echo $XDG_SESSION_TYPE
# Deve retornar: wayland
```

## 📱 Testes Recomendados

1. **Testar localmente primeiro**:
   ```bash
   cd src/
   python3 -m http.server 8000
   # Abrir http://localhost:8000
   ```

2. **Verificar performance**:
   - Pressionar 'D' para debug
   - FPS deve estar > 30
   - CPU < 20%

3. **Testar interações**:
   - Mouse move → lagarto segue
   - Clique → muda cor
   - Espaço → dia/noite

## 🚨 Troubleshooting

### Performance baixa?
- Reduzir partículas em `environment.js`
- Diminuir FPS em `main.js`
- Usar `requestIdleCallback` para otimizar

### Não aparece o wallpaper?
1. Verificar se Wayland está ativo
2. Reiniciar GNOME Shell: `Alt+F2` → `r`
3. Verificar logs: `journalctl -f`

### Conflito com outros wallpapers?
- Desabilitar outras extensões de wallpaper
- Resetar configurações: `dconf reset -f /org/gnome/desktop/background/`

## 📚 Documentação Oficial

- [Hanabi Documentation](https://github.com/jeffshee/gnome-ext-hanabi)
- [mpvpaper](https://github.com/GhostNaN/mpvpaper)
- [Pop!_OS Docs](https://pop-os.github.io/docs/)
- [GNOME Wayland](https://wiki.gnome.org/Initiatives/Wayland)