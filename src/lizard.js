/**
 * Lagarto de 8 Patas - Bioma Vivo
 * Implementação corrigida com estrutura de classe adequada
 */

class LizardNode {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.targetX = x;
        this.targetY = y;
    }
    
    updateRelative(useTarget = false, smooth = true) {
        if (useTarget && smooth) {
            // Movimento suave em direção ao target
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            this.x += dx * 0.1;
            this.y += dy * 0.1;
        }
    }
}

class Lizard {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Configurações do lagarto
        this.speed = 5;
        this.segmentDistance = 25;
        this.numSegments = 8; // 8 segmentos para 8 patas
        
        // Cores disponíveis
        this.colors = [
            '#32CD32', // Verde
            '#FFD700', // Dourado  
            '#FF6347', // Vermelho
            '#4169E1', // Azul
            '#DA70D6', // Orquídea
            '#FFA500', // Laranja
            '#8A2BE2'  // Violeta azulado
        ];
        this.currentColorIndex = 0;
        
        // Inicializar nós do corpo
        this.initializeNodes();
        
        // Estado de movimento
        this.end = { x: canvas.width / 2, y: canvas.height / 2 };
        this.isMoving = false;
        this.lastMoveTime = 0;
    }
    
    initializeNodes() {
        this.nodes = [];
        const startX = this.canvas.width / 2;
        const startY = this.canvas.height / 2;
        
        for (let i = 0; i < this.numSegments; i++) {
            const size = Math.max(8, 20 - i * 1.5); // Diminui gradualmente
            this.nodes.push(new LizardNode(
                startX - i * this.segmentDistance,
                startY,
                size
            ));
        }
    }
    
    moveTo(x, y) {
        // Corrigir chamada quebrada do código original
        if (this.nodes.length > 0) {
            this.nodes[0].updateRelative(true, true);
        }
        
        // Calcular distância (corrigir erro de sintaxe original)
        const dist = Math.sqrt((x - this.end.x) ** 2 + (y - this.end.y) ** 2);
        let len = Math.max(0, dist - this.speed); // Corrigir "math,max"
        
        // Movimento dos segmentos (corrigir sintaxe do for)
        for (let i = this.nodes.length - 1; i >= 0; i--) {
            const node = this.nodes[i];
            const ang = Math.atan2(node.y - y, node.x - x);
            
            node.x = x + len * Math.cos(ang);
            node.y = y + len * Math.sin(ang);
            
            x = node.x;
            y = node.y;
            len = this.segmentDistance;
        }
        
        this.end.x = x;
        this.end.y = y;
        this.isMoving = dist > 5;
        this.lastMoveTime = Date.now();
    }
    
    update() {
        // Corrigir estrutura de função - agora está como método da classe
        if (Input && Input.mouse) {
            this.moveTo(Input.mouse.x, Input.mouse.y);
        }
    }
    
    draw() {
        const ctx = this.ctx;
        const currentColor = this.colors[this.currentColorIndex];
        
        // Desenhar corpo principal
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        if (this.nodes.length > 0) {
            ctx.moveTo(this.nodes[0].x, this.nodes[0].y);
            for (let i = 1; i < this.nodes.length; i++) {
                ctx.lineTo(this.nodes[i].x, this.nodes[i].y);
            }
        }
        ctx.stroke();
        
        // Desenhar segmentos do corpo
        this.nodes.forEach((node, index) => {
            ctx.fillStyle = index === 0 ? '#FF4444' : currentColor; // Cabeça vermelha
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Desenhar olhos na cabeça
            if (index === 0) {
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(node.x - 6, node.y - 4, 3, 0, Math.PI * 2);
                ctx.arc(node.x + 6, node.y - 4, 3, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = 'black';
                ctx.beginPath();
                ctx.arc(node.x - 6, node.y - 4, 1.5, 0, Math.PI * 2);
                ctx.arc(node.x + 6, node.y - 4, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        
        // Desenhar patas (8 patas, 4 de cada lado)
        this.drawLegs();
    }
    
    drawLegs() {
        const ctx = this.ctx;
        const legLength = 15;
        const currentTime = Date.now();
        
        ctx.strokeStyle = this.colors[this.currentColorIndex];
        ctx.lineWidth = 2;
        
        this.nodes.forEach((node, index) => {
            if (index > 0 && index < this.nodes.length - 1) {
                // Animação das patas baseada no movimento
                const walkCycle = this.isMoving ? 
                    Math.sin((currentTime * 0.01 + index) * 0.5) * 0.3 : 0;
                
                // Patas do lado esquerdo
                const leftX = node.x - legLength * Math.cos(walkCycle + Math.PI / 2);
                const leftY = node.y - legLength * Math.sin(walkCycle + Math.PI / 2);
                
                // Patas do lado direito  
                const rightX = node.x + legLength * Math.cos(walkCycle - Math.PI / 2);
                const rightY = node.y + legLength * Math.sin(walkCycle - Math.PI / 2);
                
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(leftX, leftY);
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(rightX, rightY);
                ctx.stroke();
                
                // Patas (círculos pequenos nas pontas)
                ctx.fillStyle = this.colors[this.currentColorIndex];
                ctx.beginPath();
                ctx.arc(leftX, leftY, 2, 0, Math.PI * 2);
                ctx.arc(rightX, rightY, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        });
    }
    
    changeColor() {
        this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
    }
    
    // Método para debugging
    getInfo() {
        return {
            segments: this.nodes.length,
            position: this.end,
            color: this.colors[this.currentColorIndex],
            isMoving: this.isMoving
        };
    }
}