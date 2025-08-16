/**
 * Environment Manager - Bioma Vivo
 * Gerencia dia/noite, clima e efeitos ambientais
 */

class Environment {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Estado do ambiente
        this.isDayTime = true;
        this.timeOfDay = 12; // 0-24 horas
        this.particles = [];
        this.maxParticles = 50;
        
        // Configurações de cores
        this.dayColors = {
            sky: ['#87CEEB', '#98FB98'],
            sun: '#FFD700',
            cloud: 'rgba(255, 255, 255, 0.8)'
        };
        
        this.nightColors = {
            sky: ['#191970', '#000080'],
            moon: '#F5F5DC',
            star: '#FFFFFF'
        };
        
        this.initializeParticles();
    }
    
    initializeParticles() {
        // Partículas ambientais (pólen, folhas, etc.)
        this.particles = [];
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.6 + 0.2,
                type: Math.random() > 0.7 ? 'leaf' : 'pollen'
            });
        }
    }
    
    toggleDayNight() {
        this.isDayTime = !this.isDayTime;
        this.timeOfDay = this.isDayTime ? 12 : 0;
        this.updateBodyBackground();
    }
    
    updateBodyBackground() {
        const body = document.body;
        if (this.isDayTime) {
            body.className = 'day';
        } else {
            body.className = 'night';
        }
    }
    
    update() {
        // Atualizar partículas
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wraparound nas bordas
            if (particle.x < -10) particle.x = this.canvas.width + 10;
            if (particle.x > this.canvas.width + 10) particle.x = -10;
            if (particle.y < -10) particle.y = this.canvas.height + 10;
            if (particle.y > this.canvas.height + 10) particle.y = -10;
            
            // Variação suave na opacidade
            particle.opacity += (Math.random() - 0.5) * 0.02;
            particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));
        });
    }
    
    draw() {
        this.drawSky();
        this.drawCelestialBody();
        this.drawParticles();
        if (!this.isDayTime) {
            this.drawStars();
        }
    }
    
    drawSky() {
        const ctx = this.ctx;
        const colors = this.isDayTime ? this.dayColors.sky : this.nightColors.sky;
        
        // Gradiente do céu
        const gradient = ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, colors[0]);
        gradient.addColorStop(1, colors[1]);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    drawCelestialBody() {
        const ctx = this.ctx;
        const centerX = this.canvas.width - 80;
        const centerY = 80;
        
        if (this.isDayTime) {
            // Sol
            ctx.fillStyle = this.dayColors.sun;
            ctx.shadowColor = this.dayColors.sun;
            ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
            
            // Raios de sol
            ctx.strokeStyle = this.dayColors.sun;
            ctx.lineWidth = 2;
            for (let i = 0; i < 8; i++) {
                const angle = (i * Math.PI * 2) / 8;
                const x1 = centerX + Math.cos(angle) * 40;
                const y1 = centerY + Math.sin(angle) * 40;
                const x2 = centerX + Math.cos(angle) * 50;
                const y2 = centerY + Math.sin(angle) * 50;
                
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
        } else {
            // Lua
            ctx.fillStyle = this.nightColors.moon;
            ctx.shadowColor = this.nightColors.moon;
            ctx.shadowBlur = 15;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
            
            // Crateras da lua
            ctx.fillStyle = 'rgba(200, 200, 200, 0.3)';
            ctx.beginPath();
            ctx.arc(centerX - 8, centerY - 5, 4, 0, Math.PI * 2);
            ctx.arc(centerX + 5, centerY + 8, 2, 0, Math.PI * 2);
            ctx.arc(centerX + 2, centerY - 10, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    drawStars() {
        const ctx = this.ctx;
        ctx.fillStyle = this.nightColors.star;
        
        // Estrelas fixas (baseadas em seed para consistência)
        for (let i = 0; i < 30; i++) {
            const x = (Math.sin(i * 1.3) * 0.5 + 0.5) * this.canvas.width;
            const y = (Math.cos(i * 1.7) * 0.5 + 0.5) * this.canvas.height * 0.6;
            const size = Math.sin(i * 0.5) * 0.5 + 1;
            
            // Efeito de piscar
            const twinkle = Math.sin(Date.now() * 0.003 + i) * 0.3 + 0.7;
            ctx.globalAlpha = twinkle;
            
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }
    
    drawParticles() {
        const ctx = this.ctx;
        
        this.particles.forEach(particle => {
            ctx.globalAlpha = particle.opacity;
            
            if (particle.type === 'leaf') {
                // Folhas
                ctx.fillStyle = this.isDayTime ? '#228B22' : '#006400';
                ctx.save();
                ctx.translate(particle.x, particle.y);
                ctx.rotate(Date.now() * 0.001 + particle.x);
                ctx.fillRect(-particle.size/2, -particle.size, particle.size, particle.size * 2);
                ctx.restore();
            } else {
                // Pólen/partículas
                ctx.fillStyle = this.isDayTime ? '#FFD700' : '#FFF8DC';
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        
        ctx.globalAlpha = 1;
    }
    
    // Método para adicionar efeitos especiais
    addWindEffect(mouseX, mouseY) {
        // Simular vento ao arrastar o mouse
        this.particles.forEach(particle => {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += (dx / distance) * force * 0.1;
                particle.vy += (dy / distance) * force * 0.1;
            }
        });
    }
    
    getTimeInfo() {
        return {
            isDayTime: this.isDayTime,
            timeOfDay: this.timeOfDay,
            particleCount: this.particles.length
        };
    }
}