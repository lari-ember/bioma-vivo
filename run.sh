#!/bin/bash

# Bioma Vivo - Script de Execução
# Para executar o wallpaper animado localmente

echo "🦎 Iniciando Bioma Vivo..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Verificar se Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 não encontrado. Instale com:"
    echo "   sudo apt install python3"
    exit 1
fi

# Ir para o diretório do código
cd "$(dirname "$0")/src"

echo "📁 Diretório: $(pwd)"
echo "🌐 Servidor: http://localhost:8000"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🎮 CONTROLES:"
echo "   Mouse      → Move o lagarto"
echo "   Clique     → Muda cor"
echo "   Espaço     → Dia/Noite"
echo "   P          → Pausar"
echo "   I          → Info (console)"
echo "   Ctrl+C     → Sair"
echo ""
echo "🔗 Abrindo navegador em 3 segundos..."

# Iniciar servidor HTTP
python3 -m http.server 8000 &
SERVER_PID=$!

# Aguardar servidor inicializar
sleep 3

# Tentar abrir no navegador padrão
if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:8000
elif command -v firefox &> /dev/null; then
    firefox http://localhost:8000 &
elif command -v chromium-browser &> /dev/null; then
    chromium-browser http://localhost:8000 &
else
    echo "🌐 Abra manualmente: http://localhost:8000"
fi

echo ""
echo "✨ Bioma Vivo rodando! Pressione Ctrl+C para parar."

# Aguardar sinal de interrupção
trap "echo ''; echo '🛑 Parando servidor...'; kill $SERVER_PID; echo '👋 Bioma Vivo finalizado!'; exit 0" INT

# Manter script rodando
wait $SERVER_PID