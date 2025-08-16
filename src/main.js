/**
 * Bioma Vivo - Main Application
 * Sistema principal que gerencia canvas, input e game loop
 */

// Input System - Corrige o problema "Input.mouse não existe"
const Input = {
    mouse: {
        x: 0,
        y: 0,
        isDown: false,
        lastClickTime: 0
    },
    keys: {}
};

// Variáveis globais
let canvas;
let ctx;
let lizard;
let environment;
let isRunning = true;
let fps = 60;
let lastFrameTime = 0;

// Performance monitoring
const performance_monitor = {
    frameCount: 0,
    lastSecond: Date.now(),
    currentFPS: 0
};

/**
 * Inicialização da aplicação
 */
function init() {
    setupCanvas();
    setupEventListeners();
    
    // Criar objetos principais
    lizard = new Lizard(canvas);
    environment = new Environment(canvas);
    
    console.log('🦎 Bioma Vivo iniciado!');
    console.log('Lagarto:', lizard.getInfo());
    console.log('Ambiente:', environment.getTimeInfo());
    
    // Iniciar game loop
    gameLoop();
}

/**
 * Configurar canvas responsivo
 */
function setupCanvas() {
    canvas = document.getElementById('biomaCanvas');
    ctx = canvas.getContext('2d');
    
    resizeCanvas();
    
    // Redimensionar canvas quando janela muda
    window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Reposicionar lagarto se necessário
    if (lizard) {
        lizard.end.x = Math.min(lizard.end.x, canvas.width);
        lizard.end.y = Math.min(lizard.end.y, canvas.height);
    }
}

/**
 * Configurar event listeners para input
 */
function setupEventListeners() {
    // Mouse events
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        Input.mouse.x = e.clientX - rect.left;
        Input.mouse.y = e.clientY - rect.top;
    });
    
    canvas.addEventListener('mousedown', (e) => {
        Input.mouse.isDown = true;
        
        // Detectar clique duplo
        const now = Date.now();
        if (now - Input.mouse.lastClickTime < 300) {
            onDoubleClick();
        } else {
            onClick();
        }
        Input.mouse.lastClickTime = now;
    });
    
    canvas.addEventListener('mouseup', () => {
        Input.mouse.isDown = false;
    });
    
    canvas.addEventListener('mouseleave', () => {
        Input.mouse.isDown = false;
    });
    
    // Keyboard events
    document.addEventListener('keydown', (e) => {
        Input.keys[e.code] = true;
        handleKeyPress(e.code);
    });
    
    document.addEventListener('keyup', (e) => {
        Input.keys[e.code] = false;
    });
    
    // Touch events para dispositivos móveis
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        Input.mouse.x = touch.clientX - rect.left;
        Input.mouse.y = touch.clientY - rect.top;
    });
    
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        onClick();
    });
}

/**
 * Manipuladores de eventos
 */
function onClick() {
    lizard.changeColor();
    console.log('🎨 Cor alterada para:', lizard.colors[lizard.currentColorIndex]);
}

function onDoubleClick() {
    // Future feature: zoom ou mini-ambiente
    console.log('🔍 Duplo clique detectado');
}

function handleKeyPress(code) {
    switch(code) {
        case 'Space':
            toggleDayNight();
            break;
        case 'KeyP':
            togglePause();
            break;
        case 'KeyI':
            showInfo();
            break;
        case 'KeyR':
            resetLizard();
            break;
    }
}

/**
 * Funções de controle
 */
function toggleDayNight() {
    environment.toggleDayNight();
    console.log('🌅 Modo alterado para:', environment.isDayTime ? 'Dia' : 'Noite');
}

function togglePause() {
    isRunning = !isRunning;
    if (isRunning) {
        gameLoop();
    }
    console.log('⏸️ Jogo', isRunning ? 'despausado' : 'pausado');
}

function showInfo() {
    const info = {
        lagarto: lizard.getInfo(),
        ambiente: environment.getTimeInfo(),
        performance: {
            fps: performance_monitor.currentFPS,
            canvas: `${canvas.width}x${canvas.height}`
        }
    };
    console.log('ℹ️ Informações do Bioma:', info);
}

function resetLizard() {
    lizard.initializeNodes();
    lizard.end.x = canvas.width / 2;
    lizard.end.y = canvas.height / 2;
    console.log('🔄 Lagarto resetado');
}

/**
 * Game Loop principal
 */
function gameLoop(currentTime = 0) {
    if (!isRunning) return;
    
    // Controle de FPS
    const deltaTime = currentTime - lastFrameTime;
    if (deltaTime < 1000 / fps) {
        requestAnimationFrame(gameLoop);
        return;
    }
    lastFrameTime = currentTime;
    
    // Update
    update(deltaTime);
    
    // Render
    render();
    
    // Performance monitoring
    updatePerformanceMonitor();
    
    // Continue loop
    requestAnimationFrame(gameLoop);
}

function update(deltaTime) {
    // Atualizar sistema de ambiente
    environment.update();
    
    // Atualizar lagarto
    lizard.update();
    
    // Efeito de vento ao arrastar mouse
    if (Input.mouse.isDown) {
        environment.addWindEffect(Input.mouse.x, Input.mouse.y);
    }
}

function render() {
    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Renderizar ambiente (fundo, partículas, etc.)
    environment.draw();
    
    // Renderizar lagarto
    lizard.draw();
    
    // Debug info (se necessário)
    if (Input.keys['KeyD']) {
        drawDebugInfo();
    }
}

function drawDebugInfo() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(10, canvas.height - 120, 200, 110);
    
    ctx.fillStyle = 'white';
    ctx.font = '12px monospace';
    ctx.fillText(`FPS: ${performance_monitor.currentFPS}`, 20, canvas.height - 100);
    ctx.fillText(`Mouse: ${Input.mouse.x}, ${Input.mouse.y}`, 20, canvas.height - 80);
    ctx.fillText(`Lagarto: ${lizard.nodes.length} segmentos`, 20, canvas.height - 60);
    ctx.fillText(`Ambiente: ${environment.isDayTime ? 'Dia' : 'Noite'}`, 20, canvas.height - 40);
    ctx.fillText(`Partículas: ${environment.particles.length}`, 20, canvas.height - 20);
}

function updatePerformanceMonitor() {
    performance_monitor.frameCount++;
    const now = Date.now();
    
    if (now - performance_monitor.lastSecond >= 1000) {
        performance_monitor.currentFPS = performance_monitor.frameCount;
        performance_monitor.frameCount = 0;
        performance_monitor.lastSecond = now;
    }
}

/**
 * Funções globais para botões da UI
 */
window.toggleDayNight = toggleDayNight;
window.togglePause = togglePause;
window.showInfo = showInfo;

// Inicializar quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', init);

// Prevenir scroll com espaço
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
    }
});

console.log('🌟 Bioma Vivo v0.1.0-alpha carregado!');