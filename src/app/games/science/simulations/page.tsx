
'use client';
import { useEffect } from 'react';

export default function ScienceFighterPage() {
  useEffect(() => {
    // Prevent default touch actions on the whole page to improve game controls
    const preventDefault = (e: TouchEvent) => e.preventDefault();
    document.body.addEventListener('touchmove', preventDefault, { passive: false });

    // Game logic from the user's provided HTML
    const GameState = {
        LOADING: 'loading',
        MENU: 'menu',
        PLAYING: 'playing',
        GAME_OVER: 'game_over'
    };

    let currentState = GameState.LOADING;
    let selectedHero = 'magnet';
    let score = 0;
    let health = 100;
    let energy = 100;
    let comboCount = 0;
    let lastComboTime = 0;

    // Movement state
    let moveUp = false, moveDown = false, moveLeft = false, moveRight = false;
    let heroSpeed = 0.15;
    let isAttacking = false;
    let isDashing = false;

    // Mobile touch state
    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    let touchControls = false;

    // Game objects
    let scene: any, camera: any, renderer: any, clock: any;
    let hero: any, enemies: any[] = [], projectiles: any[] = [], effects: any[] = [];
    let lastTime = 0;
    let enemySpawnTimer = 0;
    let energyRegenTimer = 0;
    let attackCooldown = 0;
    let dashCooldown = 0;
    let ultimateCooldown = 0;

    const heroes = {
        magnet: {
            name: "MAGNET WARRIOR",
            color: 0x0066ff,
            attackType: "MAGNETIC PULL",
            special: "IRON CRUSH",
            ultimate: "MAGNETIC STORM",
            description: "Controls magnetic forces - attracts metal enemies",
            stats: { power: 8, speed: 6, defense: 7 }
        },
        water: {
            name: "WATER SPIRIT",
            color: 0x00aaff,
            attackType: "WATER BLAST",
            special: "ICE SHARD",
            ultimate: "TSUNAMI WAVE",
            description: "Controls water states - ice, liquid, steam",
            stats: { power: 7, speed: 8, defense: 6 }
        },
        plant: {
            name: "PLANT GUARDIAN",
            color: 0x00aa00,
            attackType: "VINE WHIP",
            special: "POLLEN CLOUD",
            ultimate: "FOREST RAGE",
            description: "Grows with sunlight - weak in darkness",
            stats: { power: 6, speed: 5, defense: 9 }
        },
        motion: {
            name: "MOTION MASTER",
            color: 0xff6600,
            attackType: "SPEED PUNCH",
            special: "TIME SLOW",
            ultimate: "HYPER SPEED",
            description: "Moves with physics - affected by friction",
            stats: { power: 9, speed: 9, defense: 5 }
        },
        energy: {
            name: "ENERGY KNIGHT",
            color: 0xffff00,
            attackType: "ENERGY BOLT",
            special: "PLASMA BURST",
            ultimate: "SOLAR FLARE",
            description: "Uses solar power - needs sunlight",
            stats: { power: 8, speed: 7, defense: 8 }
        }
    };

    const enemyTypes = {
        pollution: { name: "Pollution Monster", color: 0x666666, health: 60, speed: 0.02 },
        energy: { name: "Energy Vampire", color: 0xff00ff, health: 50, speed: 0.03 },
        waste: { name: "Waste Golem", color: 0xaa5500, health: 80, speed: 0.015 },
        confusion: { name: "Confusion Spirit", color: 0xffff00, health: 40, speed: 0.035 }
    };

    function init() {
        detectDevice();
        createParticles();
        initMenu();
        simulateLoading();
        setupOrientationCheck();
        setupMobileControls();
        setupEventListeners();
    }

    function detectDevice() {
        const ua = navigator.userAgent;
        isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

        if (isMobile) {
            touchControls = true;
            heroSpeed = 0.12;
        }
    }

    function setupOrientationCheck() {
        function checkOrientation() {
            const warning = document.getElementById('orientation-warning');
            if (!warning) return;
            if (window.innerHeight > window.innerWidth && isMobile) {
                warning.style.display = 'flex';
            } else {
                warning.style.display = 'none';
            }
        }

        checkOrientation();
        window.addEventListener('resize', checkOrientation);
        window.addEventListener('orientationchange', checkOrientation);
    }

    function setupMobileControls() {
        if (!touchControls) return;

        const dpadButtons = ['up-btn', 'down-btn', 'left-btn', 'right-btn'];
        dpadButtons.forEach(id => {
            const btn = document.getElementById(id);
            if (!btn) return;
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                handleMobileInput(id, true);
            });
            btn.addEventListener('touchend', (e) => {
                e.preventDefault();
                handleMobileInput(id, false);
            });
            btn.addEventListener('mousedown', (e) => {
                e.preventDefault();
                handleMobileInput(id, true);
            });
            btn.addEventListener('mouseup', (e) => {
                e.preventDefault();
                handleMobileInput(id, false);
            });
            btn.addEventListener('mouseleave', (e) => {
                handleMobileInput(id, false);
            });
        });

        const actionButtons = ['attack-btn', 'special-btn', 'ultimate-btn'];
        actionButtons.forEach(id => {
            const btn = document.getElementById(id);
            if (!btn) return;
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                handleActionButton(id);
            });
            btn.addEventListener('touchend', (e) => {
                e.preventDefault();
            });
            btn.addEventListener('mousedown', (e) => {
                e.preventDefault();
                handleActionButton(id);
            });
        });
    }

    function handleMobileInput(buttonId: string, pressed: boolean) {
        if (currentState !== GameState.PLAYING) return;

        switch(buttonId) {
            case 'up-btn': moveUp = pressed; break;
            case 'down-btn': moveDown = pressed; break;
            case 'left-btn': moveLeft = pressed; break;
            case 'right-btn': moveRight = pressed; break;
        }
    }

    function handleActionButton(buttonId: string) {
        if (currentState !== GameState.PLAYING) return;

        switch(buttonId) {
            case 'attack-btn': performAttack(); break;
            case 'special-btn': performSpecial(); break;
            case 'ultimate-btn': performUltimate(); break;
        }
    }

    function createParticles() {
        const container = document.getElementById('floating-particles');
        if (!container) return;
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 20}s`;
            particle.style.width = `${Math.random() * 3 + 1}px`;
            particle.style.height = particle.style.width;
            particle.style.background = `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.3)`;
            container.appendChild(particle);
        }
    }

    function simulateLoading() {
        let progress = 0;
        const bar = document.getElementById('loading-bar') as HTMLElement;
        const percent = document.getElementById('loading-percentage');
        if (!bar || !percent) return;

        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;

            bar.style.width = `${progress}%`;
            percent.textContent = `${Math.round(progress)}%`;

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    const loadingScreen = document.getElementById('loading-screen');
                    if (loadingScreen) loadingScreen.style.display = 'none';
                    currentState = GameState.MENU;
                }, 500);
            }
        }, 200);
    }

    function initMenu() {
        const carousel = document.getElementById('hero-carousel');
        if (!carousel) return;
        carousel.innerHTML = '';

        Object.entries(heroes).forEach(([key, heroData]) => {
            const card = document.createElement('div');
            card.className = `hero-card ${key === selectedHero ? 'selected' : ''}`;
            card.dataset.hero = key;

            card.innerHTML = `
                <div class="hero-icon">${getHeroIcon(key)}</div>
                <div class="hero-name">${heroData.name}</div>
                <div class="hero-stats">
                    <div class="stat">
                        <div>⚔️</div>
                        <div class="stat-value">${heroData.stats.power}</div>
                    </div>
                    <div class="stat">
                        <div>⚡</div>
                        <div class="stat-value">${heroData.stats.speed}</div>
                    </div>
                    <div class="stat">
                        <div>🛡️</div>
                        <div class="stat-value">${heroData.stats.defense}</div>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => selectHero(key));
            card.addEventListener('touchstart', (e) => {
                e.preventDefault();
                selectHero(key);
            });

            carousel.appendChild(card);
        });

        updateSelectedHero();
    }

    function getHeroIcon(heroKey: string) {
        const icons: { [key: string]: string } = {
            magnet: '🧲',
            water: '💧',
            plant: '🌱',
            motion: '🚀',
            energy: '⚡'
        };
        return icons[heroKey] || '🔥';
    }

    function selectHero(heroKey: string) {
        selectedHero = heroKey;
        document.querySelectorAll('.hero-card').forEach(card => {
            card.classList.remove('selected');
            if ((card as HTMLElement).dataset.hero === heroKey) {
                card.classList.add('selected');
            }
        });
        updateSelectedHero();
    }

    function updateSelectedHero() {
        const heroData = heroes[selectedHero as keyof typeof heroes];
        const playerNameEl = document.getElementById('player-name');
        if (playerNameEl) playerNameEl.textContent = heroData.name;
    }

    function init3D() {
        const THREE = (window as any).THREE;
        if (!THREE) {
          console.error("Three.js not loaded");
          return;
        }

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000022);

        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 15, 30);

        const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
        if (!canvas) return;
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(10, 30, 15);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        createHero();
        createEnvironment();
        createEnemies(3);

        window.addEventListener('resize', onWindowResize);

        clock = new THREE.Clock();
        animate();
    }
    
    function createHero() {
        const THREE = (window as any).THREE;
        const group = new THREE.Group();

        const bodyGeometry = new THREE.CylinderGeometry(1, 1, 4, 16);
        const bodyMaterial = new THREE.MeshPhongMaterial({
            color: heroes[selectedHero as keyof typeof heroes].color,
            shininess: 100,
            emissive: heroes[selectedHero as keyof typeof heroes].color,
            emissiveIntensity: 0.2
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.castShadow = true;
        group.add(body);

        const headGeometry = new THREE.SphereGeometry(1.2, 16, 16);
        const head = new THREE.Mesh(headGeometry, bodyMaterial);
        head.position.y = 2.5;
        head.castShadow = true;
        group.add(head);

        hero = {
            mesh: group,
            body: body,
            speed: heroSpeed
        };

        hero.mesh.position.set(0, 2, 0);
        scene.add(hero.mesh);
    }

    function createEnvironment() {
        const THREE = (window as any).THREE;
        const groundGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
        const groundMaterial = new THREE.MeshPhongMaterial({
            color: 0x333344,
            shininess: 30,
            side: THREE.DoubleSide
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -1;
        ground.receiveShadow = true;
        scene.add(ground);
    }
    
    function createEnemies(count: number) {
        for (let i = 0; i < count; i++) {
            createEnemy();
        }
    }
    
    function createEnemy() {
        const THREE = (window as any).THREE;
        const enemyType = Object.keys(enemyTypes)[Math.floor(Math.random() * Object.keys(enemyTypes).length)] as keyof typeof enemyTypes;
        const typeData = enemyTypes[enemyType];

        const group = new THREE.Group();

        const bodyGeometry = new THREE.DodecahedronGeometry(1.5, 0);
        const bodyMaterial = new THREE.MeshPhongMaterial({
            color: typeData.color,
            emissive: typeData.color,
            emissiveIntensity: 0.2,
            shininess: 50
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.castShadow = true;
        group.add(body);

        let x, z;
        do {
            x = (Math.random() - 0.5) * 40;
            z = (Math.random() - 0.5) * 40;
        } while (Math.abs(x) < 10 && Math.abs(z) < 10);

        group.position.set(x, 2, z);

        const enemy = {
            mesh: group,
            type: enemyType,
            health: typeData.health,
            maxHealth: typeData.health,
            speed: typeData.speed,
            originalY: 2
        };

        enemies.push(enemy);
        scene.add(group);
    }
    
    function updateGame(deltaTime: number) {
        if (currentState !== GameState.PLAYING) return;

        enemySpawnTimer += deltaTime;
        energyRegenTimer += deltaTime;
        if (attackCooldown > 0) attackCooldown -= deltaTime;
        if (dashCooldown > 0) dashCooldown -= deltaTime;
        if (ultimateCooldown > 0) ultimateCooldown -= deltaTime;

        if (enemySpawnTimer > 3 && enemies.length < 8) {
            createEnemy();
            enemySpawnTimer = 0;
        }

        if (energyRegenTimer > 0.5 && energy < 100) {
            energy = Math.min(100, energy + 2);
            updateHUD();
            energyRegenTimer = 0;
        }

        updateHero(deltaTime);
        updateEnemies(deltaTime);
        updateProjectiles(deltaTime);
        updateEffects(deltaTime);
        updateCamera(deltaTime);
        updateHUD();
        checkCombo();
    }
    
    function updateHero(deltaTime: number) {
        if (!hero || !hero.mesh) return;

        let moveX = 0;
        let moveZ = 0;
        let currentSpeed = hero.speed;

        if (isDashing) {
            currentSpeed *= 3;
        }

        if (moveUp) moveZ -= currentSpeed * deltaTime * 60;
        if (moveDown) moveZ += currentSpeed * deltaTime * 60;
        if (moveLeft) moveX -= currentSpeed * deltaTime * 60;
        if (moveRight) moveX += currentSpeed * deltaTime * 60;

        hero.mesh.position.x += moveX;
        hero.mesh.position.z += moveZ;

        const boundary = 45;
        hero.mesh.position.x = Math.max(-boundary, Math.min(boundary, hero.mesh.position.x));
        hero.mesh.position.z = Math.max(-boundary, Math.min(boundary, hero.mesh.position.z));

        hero.mesh.position.y = 2 + Math.sin(Date.now() * 0.003) * 0.5;
    }
    
    function updateEnemies(deltaTime: number) {
        enemies.forEach((enemy, index) => {
            if (!enemy.mesh || !hero || !hero.mesh) return;

            const dx = hero.mesh.position.x - enemy.mesh.position.x;
            const dz = hero.mesh.position.z - enemy.mesh.position.z;
            const distance = Math.sqrt(dx * dx + dz * dz);

            if (distance > 2) {
                enemy.mesh.position.x += (dx / distance) * enemy.speed * deltaTime * 60;
                enemy.mesh.position.z += (dz / distance) * enemy.speed * deltaTime * 60;
            }

            enemy.mesh.position.y = enemy.originalY + Math.sin(Date.now() * 0.002 + index) * 0.5;
            enemy.mesh.rotation.y += deltaTime;

            if (distance < 2.5) {
                takeDamage(5);
                createDamageNumber(hero.mesh.position.x, hero.mesh.position.y + 3, hero.mesh.position.z, 5);
                addCombatLog(`Hit by ${enemyTypes[enemy.type as keyof typeof enemyTypes].name}!`, 'critical');
            }
        });
    }

    function updateProjectiles(deltaTime: number) {
        for (let i = projectiles.length - 1; i >= 0; i--) {
            const projectile = projectiles[i];
            const THREE = (window as any).THREE;

            projectile.mesh.position.add(projectile.velocity.clone().multiplyScalar(deltaTime * 60));
            projectile.distanceTraveled += projectile.speed * deltaTime * 60;

            projectile.mesh.rotation.x += deltaTime * 3;
            projectile.mesh.rotation.y += deltaTime * 3;

            if (projectile.distanceTraveled > projectile.maxDistance) {
                scene.remove(projectile.mesh);
                projectiles.splice(i, 1);
                continue;
            }

            for (let j = enemies.length - 1; j >= 0; j--) {
                const enemy = enemies[j];
                const distance = projectile.mesh.position.distanceTo(enemy.mesh.position);

                if (distance < 2) {
                    const damage = 20 + Math.random() * 10;
                    enemy.health -= damage;

                    createFireEffect(enemy.mesh.position.x, enemy.mesh.position.y, enemy.mesh.position.z);
                    createDamageNumber(enemy.mesh.position.x, enemy.mesh.position.y + 3, enemy.mesh.position.z, Math.round(damage));

                    comboCount++;
                    lastComboTime = Date.now();

                    addCombatLog(`${heroes[selectedHero as keyof typeof heroes].attackType} hit for ${Math.round(damage)} damage!`);

                    scene.remove(projectile.mesh);
                    projectiles.splice(i, 1);

                    if (enemy.health <= 0) {
                        score += 100;
                        scene.remove(enemy.mesh);
                        enemies.splice(j, 1);

                        if (Math.random() < 0.2) {
                            showSciencePopup();
                        }
                    }
                    break;
                }
            }
        }
    }
    
    function updateEffects(deltaTime: number) {
        for (let i = effects.length - 1; i >= 0; i--) {
            const effect = effects[i];
            effect.lifetime -= deltaTime;

            if (effect.lifetime <= 0) {
                scene.remove(effect.mesh);
                effects.splice(i, 1);
            } else {
                if (effect.type === 'fire') {
                    effect.mesh.scale.multiplyScalar(0.95);
                    effect.mesh.material.opacity *= 0.9;
                }
            }
        }
    }
    
    function updateCamera(deltaTime: number) {
        if (!hero || !hero.mesh || !camera) return;

        const targetX = hero.mesh.position.x;
        const targetZ = hero.mesh.position.z + 25;
        const targetY = 18;

        camera.position.x += (targetX - camera.position.x) * 0.05 * deltaTime * 60;
        camera.position.y += (targetY - camera.position.y) * 0.05 * deltaTime * 60;
        camera.position.z += (targetZ - camera.position.z) * 0.05 * deltaTime * 60;

        camera.lookAt(hero.mesh.position.x, hero.mesh.position.y + 3, hero.mesh.position.z);
    }
    
    function updateHUD() {
        const healthFill = document.getElementById('health-fill');
        if(healthFill) healthFill.style.width = `${health}%`;
        const energyFill = document.getElementById('energy-fill');
        if(energyFill) energyFill.style.width = `${energy}%`;
        const healthValue = document.getElementById('health-value');
        if(healthValue) healthValue.textContent = `${Math.round(health)}%`;
        const energyValue = document.getElementById('energy-value');
        if(energyValue) energyValue.textContent = `${Math.round(energy)}%`;
        const scoreValue = document.getElementById('score-value');
        if(scoreValue) scoreValue.textContent = `${score}`;

        if (comboCount > 1) {
            addCombatLog(`COMBO x${comboCount}!`, 'critical');
        }
    }

    function checkCombo() {
        if (Date.now() - lastComboTime > 3000 && comboCount > 0) {
            comboCount = 0;
        }
    }

    function performAttack() {
        if (currentState !== GameState.PLAYING || energy < 20 || attackCooldown > 0) return;

        attackCooldown = 0.3;
        energy -= 20;

        createProjectile();
        createFireEffect(hero.mesh.position.x, hero.mesh.position.y + 2, hero.mesh.position.z);
        addCombatLog(`Used ${heroes[selectedHero as keyof typeof heroes].attackType}!`);
    }

    function createProjectile() {
        const THREE = (window as any).THREE;
        const geometry = new THREE.SphereGeometry(0.4, 8, 8);
        const material = new THREE.MeshBasicMaterial({
            color: heroes[selectedHero as keyof typeof heroes].color,
            transparent: true,
            opacity: 0.9
        });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.copy(hero.mesh.position);
        mesh.position.y += 1;

        const direction = new THREE.Vector3(0, 0, -1);
        direction.applyEuler(hero.mesh.rotation);
        direction.multiplyScalar(2);
        mesh.position.add(direction);

        scene.add(mesh);

        const projectile = {
            mesh: mesh,
            velocity: direction.normalize().multiplyScalar(1.5),
            speed: 1.5,
            distanceTraveled: 0,
            maxDistance: 30
        };

        projectiles.push(projectile);
    }
    
    function performSpecial() {
        if (currentState !== GameState.PLAYING || energy < 40 || dashCooldown > 0) return;

        dashCooldown = 2;
        energy -= 40;
        isDashing = true;

        createExplosionEffect(hero.mesh.position.x, hero.mesh.position.y, hero.mesh.position.z);
        addCombatLog(`Used ${heroes[selectedHero as keyof typeof heroes].special}!`, 'heal');

        setTimeout(() => {
            isDashing = false;
        }, 300);
    }

    function performUltimate() {
        if (currentState !== GameState.PLAYING || energy < 80 || ultimateCooldown > 0) return;

        ultimateCooldown = 10;
        energy -= 80;

        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                createProjectile();
            }, i * 100);
        }

        createExplosionEffect(hero.mesh.position.x, hero.mesh.position.y, hero.mesh.position.z, 3);
        addCombatLog(`ULTIMATE: ${heroes[selectedHero as keyof typeof heroes].ultimate}!!!`, 'critical');
    }
    
    function takeDamage(amount: number) {
        health = Math.max(0, health - amount);

        hero.body.material.emissive.setHex(0xff0000);
        setTimeout(() => {
            if (hero && hero.body) {
                hero.body.material.emissive.setHex(heroes[selectedHero as keyof typeof heroes].color);
            }
        }, 200);

        cameraShake(0.3);

        if (health <= 0) {
            gameOver();
        }
    }
    
    function createFireEffect(x:number, y:number, z:number) {
        const THREE = (window as any).THREE;
        const geometry = new THREE.SphereGeometry(1, 8, 8);
        const material = new THREE.MeshBasicMaterial({
            color: 0xff6600,
            transparent: true,
            opacity: 0.7
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        scene.add(mesh);

        effects.push({
            mesh: mesh,
            type: 'fire',
            lifetime: 0.5
        });

        const fire = document.createElement('div');
        fire.className = 'fire-effect';
        const gameContainer = document.getElementById('game-container');
        if (gameContainer) {
            const rect = gameContainer.getBoundingClientRect();
            fire.style.left = `${(x / 50 + 1) * 50}%`;
            fire.style.top = `${(-z / 50 + 1) * 50}%`;
            gameContainer.appendChild(fire);
        }


        setTimeout(() => fire.remove(), 500);
    }

    function createExplosionEffect(x:number, y:number, z:number, scale = 1) {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createFireEffect(
                    x + (Math.random() - 0.5) * 3,
                    y + (Math.random() - 0.5) * 3,
                    z + (Math.random() - 0.5) * 3
                );
            }, i * 50);
        }
    }

    function createDamageNumber(x:number, y:number, z:number, damage:number) {
        const number = document.createElement('div');
        number.className = 'damage-number';
        number.textContent = `${damage}`;

        const THREE = (window as any).THREE;
        const vector = new THREE.Vector3(x, y, z);
        vector.project(camera);

        number.style.left = `${(vector.x * 0.5 + 0.5) * 100}%`;
        number.style.top = `${(-vector.y * 0.5 + 0.5) * 100}%`;

        document.getElementById('game-container')?.appendChild(number);
        setTimeout(() => number.remove(), 1000);
    }

    function cameraShake(intensity:number) {
        const originalPosition = camera.position.clone();
        let shakeTime = 0;
        const THREE = (window as any).THREE;

        function shake() {
            shakeTime += 0.1;
            if (shakeTime > 1) {
                camera.position.copy(originalPosition);
                return;
            }

            camera.position.x = originalPosition.x + (Math.random() - 0.5) * intensity;
            camera.position.y = originalPosition.y + (Math.random() - 0.5) * intensity;
            camera.position.z = originalPosition.z + (Math.random() - 0.5) * intensity;

            requestAnimationFrame(shake);
        }

        shake();
    }

    function showSciencePopup() {
        const facts = [
            "Magnets attract only iron, nickel, and cobalt - that's why your fridge door sticks!",
            "Water can exist as solid ice, liquid water, or gas vapor - all H₂O!",
            "Plants use sunlight to make food through photosynthesis - nature's solar panels!",
            "Friction slows things down - that's why you need to push harder on rough surfaces!",
            "The Sun gives us solar energy - it's like a giant nuclear reactor in space!"
        ];

        const fact = facts[Math.floor(Math.random() * facts.length)];
        const popup = document.getElementById('science-popup') as HTMLElement;
        const icon = document.getElementById('science-icon');
        const text = document.getElementById('popup-text');

        const icons = ['🔬', '🧪', '⚗️', '🧫', '⚛️', '💡', '🌡️', '🧲'];
        if(icon) icon.textContent = icons[Math.floor(Math.random() * icons.length)];
        if(text) text.textContent = fact;
        if(popup) {
            popup.style.display = 'block';
            popup.classList.add('show');

            setTimeout(() => {
                popup.classList.remove('show');
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 500);
            }, 3000);
        }
    }

    function addCombatLog(message: string, type = '') {
        const log = document.getElementById('combat-log');
        if (!log) return;
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.textContent = message;

        log.appendChild(entry);
        log.scrollTop = log.scrollHeight;

        while (log.children.length > 10) {
            log.removeChild(log.firstChild as Node);
        }

        setTimeout(() => {
            if (entry.parentNode) {
                entry.remove();
            }
        }, 5000);
    }
    
    function animate() {
        requestAnimationFrame(animate);

        const deltaTime = Math.min(clock.getDelta(), 0.033);

        if (currentState === GameState.PLAYING) {
            updateGame(deltaTime);
        }

        if(renderer && scene && camera) {
            renderer.render(scene, camera);
        }
    }
    
    function onWindowResize() {
        if (camera && renderer) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);

            if (isMobile) {
                camera.fov = window.innerHeight > window.innerWidth ? 60 : 70;
                camera.updateProjectionMatrix();
            }
        }
    }

    function gameOver() {
        currentState = GameState.GAME_OVER;
        const gameHud = document.getElementById('game-hud');
        if(gameHud) gameHud.style.display = 'none';
        const gameCanvas = document.getElementById('game-canvas');
        if(gameCanvas) gameCanvas.style.display = 'none';
        const controlsHelp = document.getElementById('controls-help');
        if(controlsHelp) controlsHelp.style.display = 'none';
        const mobileControls = document.querySelector('.mobile-controls') as HTMLElement;
        if(mobileControls) mobileControls.style.display = 'none';
        const gameOverScreen = document.getElementById('game-over');
        if(gameOverScreen) gameOverScreen.style.display = 'flex';
        const finalScore = document.getElementById('final-score');
        if(finalScore) finalScore.textContent = `SCORE: ${score}`;

        addCombatLog('Game Over! Final Score: ' + score, 'critical');
    }
    
    function setupEventListeners() {
        const startGameBtn = document.getElementById('start-game');
        if (startGameBtn) startGameBtn.addEventListener('click', startGame);
        const howToPlayBtn = document.getElementById('how-to-play');
        if (howToPlayBtn) howToPlayBtn.addEventListener('click', showHowToPlay);
        const creditsBtn = document.getElementById('credits');
        if (creditsBtn) creditsBtn.addEventListener('click', showSciencePopup);
        const restartBtn = document.getElementById('restart-btn');
        if (restartBtn) restartBtn.addEventListener('click', restartGame);
        const menuBtn = document.getElementById('menu-btn');
        if (menuBtn) menuBtn.addEventListener('click', goToMenu);

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        document.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });

        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });

        document.querySelectorAll('.menu-btn').forEach(btn => {
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                (e.currentTarget as HTMLElement).classList.add('active');
            });

            btn.addEventListener('touchend', (e) => {
                e.preventDefault();
                (e.currentTarget as HTMLElement).classList.remove('active');
                (e.currentTarget as HTMLElement).click();
            });
        });
    }

    function startGame() {
        currentState = GameState.PLAYING;
        const mainMenu = document.getElementById('main-menu');
        if(mainMenu) mainMenu.style.display = 'none';
        const gameHud = document.getElementById('game-hud');
        if(gameHud) gameHud.style.display = 'block';
        const gameCanvas = document.getElementById('game-canvas');
        if(gameCanvas) gameCanvas.style.display = 'block';

        const mobileControls = document.querySelector('.mobile-controls') as HTMLElement;
        const controlsHelp = document.getElementById('controls-help')
        if (touchControls) {
            if(mobileControls) mobileControls.style.display = 'flex';
            if(controlsHelp) controlsHelp.style.display = 'none';
        } else {
            if(mobileControls) mobileControls.style.display = 'none';
            if(controlsHelp) controlsHelp.style.display = 'block';
        }

        score = 0;
        health = 100;
        energy = 100;
        comboCount = 0;

        init3D();

        addCombatLog(`Welcome, ${heroes[selectedHero as keyof typeof heroes].name}!`, 'heal');
        addCombatLog('Defeat enemies and learn science!');
    }
    
    function showHowToPlay() {
        showSciencePopup();
        const popup = document.getElementById('science-popup') as HTMLElement;
        const text = document.getElementById('popup-text');

        const controlsText = touchControls ?
            `🎮 MOBILE CONTROLS:<br><br>
             • D-PAD → Move Hero<br>
             • ⚔️ Button → Basic Attack<br>
             • ✨ Button → Special Move<br>
             • 💥 Button → Ultimate Skill` :
            `🎮 DESKTOP CONTROLS:<br><br>
             • WASD / Arrow Keys → Move Hero<br>
             • SPACE → Basic Attack<br>
             • SHIFT → Special Move<br>
             • E → Ultimate Skill`;

        if(text) text.innerHTML = `
             ${controlsText}<br><br>
             <strong>🎯 GAMEPLAY:</strong><br><br>
             • Defeat enemies to score points<br>
             • Chain attacks for combos<br>
             • Watch for science facts!<br>
             • Manage your energy wisely
         `;

        if(popup) {
          popup.style.display = 'block';
          popup.classList.add('show');
        }
    }

    function restartGame() {
        const gameOverScreen = document.getElementById('game-over');
        if(gameOverScreen) gameOverScreen.style.display = 'none';
        const gameHud = document.getElementById('game-hud');
        if(gameHud) gameHud.style.display = 'block';
        const gameCanvas = document.getElementById('game-canvas');
        if(gameCanvas) gameCanvas.style.display = 'block';

        const mobileControls = document.querySelector('.mobile-controls') as HTMLElement;
        if (touchControls && mobileControls) {
            mobileControls.style.display = 'flex';
        }

        score = 0;
        health = 100;
        energy = 100;
        comboCount = 0;

        if (scene) {
          while (scene.children.length > 0) {
              scene.remove(scene.children[0]);
          }
        }

        enemies = [];
        projectiles = [];
        effects = [];

        init3D();
        addCombatLog('New battle started!', 'heal');
    }

    function goToMenu() {
        currentState = GameState.MENU;
        const gameOverScreen = document.getElementById('game-over');
        if(gameOverScreen) gameOverScreen.style.display = 'none';
        const gameHud = document.getElementById('game-hud');
        if(gameHud) gameHud.style.display = 'none';
        const gameCanvas = document.getElementById('game-canvas');
        if(gameCanvas) gameCanvas.style.display = 'none';
        const controlsHelp = document.getElementById('controls-help');
        if(controlsHelp) controlsHelp.style.display = 'none';
        const mobileControls = document.querySelector('.mobile-controls') as HTMLElement;
        if(mobileControls) mobileControls.style.display = 'none';
        const mainMenu = document.getElementById('main-menu');
        if(mainMenu) mainMenu.style.display = 'flex';
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (currentState !== GameState.PLAYING) return;

        switch(e.key.toLowerCase()) {
            case 'w': case 'arrowup': moveUp = true; break;
            case 's': case 'arrowdown': moveDown = true; break;
            case 'a': case 'arrowleft': moveLeft = true; break;
            case 'd': case 'arrowright': moveRight = true; break;
            case ' ': e.preventDefault(); performAttack(); break;
            case 'shift': performSpecial(); break;
            case 'e': performUltimate(); break;
        }
    }

    function handleKeyUp(e: KeyboardEvent) {
        switch(e.key.toLowerCase()) {
            case 'w': case 'arrowup': moveUp = false; break;
            case 's': case 'arrowdown': moveDown = false; break;
            case 'a': case 'arrowleft': moveLeft = false; break;
            case 'd': case 'arrowright': moveRight = false; break;
        }
    }

    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.onload = () => {
        init();
    };
    document.body.appendChild(script);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.body.removeEventListener('touchmove', preventDefault);
      document.body.removeChild(script);
      if(renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden" dangerouslySetInnerHTML={{ __html: `
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Rajdhani', sans-serif; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
      html, body { width: 100%; height: 100%; overflow: hidden; position: fixed; }
      body { background: radial-gradient(circle at center, #000428, #004e92); color: white; -webkit-user-select: none; user-select: none; }
      #game-container { position: fixed; width: 100%; height: 100%; perspective: 1000px; top: 0; left: 0; overflow: hidden; }
      .floating-particles { position: absolute; width: 100%; height: 100%; z-index: 1; pointer-events: none; }
      .particle { position: absolute; width: 3px; height: 3px; background: rgba(255, 255, 255, 0.3); border-radius: 50%; animation: floatParticle 20s infinite linear; }
      #loading-screen { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(45deg, #000428 0%, #004e92 100%); display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 1000; backdrop-filter: blur(10px); }
      .loading-logo { font-size: 4rem; margin-bottom: 20px; animation: pulseGlow 2s infinite alternate; text-shadow: 0 0 30px #00ffff; }
      .loading-title { font-family: 'Orbitron', sans-serif; font-size: clamp(1.5rem, 5vw, 2.5rem); background: linear-gradient(45deg, #00ffff, #00ffaa, #ffff00); -webkit-background-clip: text; background-clip: text; color: transparent; margin-bottom: 10px; letter-spacing: 2px; text-shadow: 0 0 20px rgba(0, 255, 255, 0.5); text-align: center; padding: 0 20px; }
      .loading-subtitle { color: #aaffff; font-size: clamp(0.9rem, 3vw, 1.2rem); margin-bottom: 40px; opacity: 0.8; text-align: center; padding: 0 20px; }
      .loading-progress-container { width: min(400px, 80%); height: 12px; background: rgba(255, 255, 255, 0.1); border-radius: 10px; overflow: hidden; border: 1px solid rgba(0, 255, 255, 0.3); box-shadow: 0 0 20px rgba(0, 255, 255, 0.2); }
      .loading-progress-bar { height: 100%; background: linear-gradient(90deg, #00ffff, #00ffaa, #ffff00); width: 0%; transition: width 0.3s ease; position: relative; overflow: hidden; }
      .loading-progress-bar::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent); animation: shimmer 2s infinite; }
      .loading-percentage { margin-top: 15px; font-family: 'Orbitron', sans-serif; font-size: clamp(1.2rem, 4vw, 1.5rem); color: #00ffff; text-shadow: 0 0 10px #00ffff; }
      .neon-border { border: 2px solid; border-image: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00) 1; animation: borderGlow 3s infinite alternate; }
      .neon-text { text-shadow: 0 0 10px currentColor, 0 0 20px currentColor; }
      #main-menu { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at 30% 30%, rgba(0, 4, 40, 0.95), rgba(0, 78, 146, 0.95)); display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 50; backdrop-filter: blur(5px); transform-style: preserve-3d; padding: 20px; overflow-y: auto; }
      .title-section { text-align: center; margin-bottom: clamp(20px, 5vh, 40px); animation: titleFloat 6s ease-in-out infinite; transform-style: preserve-3d; }
      .main-title { font-family: 'Orbitron', sans-serif; font-size: clamp(2rem, 8vw, 4.5rem); font-weight: 900; background: linear-gradient(45deg, #ff00ff, #00ffff, #ffff00); -webkit-background-clip: text; background-clip: text; color: transparent; text-shadow: 0 0 30px rgba(255, 0, 255, 0.5), 0 0 60px rgba(0, 255, 255, 0.3); letter-spacing: 1px; margin-bottom: 10px; position: relative; line-height: 1.2; }
      .main-title::after { content: '⚡'; position: absolute; right: -35px; top: 0; font-size: clamp(1.5rem, 6vw, 3rem); animation: electricSpark 1.5s infinite; }
      .subtitle { font-size: clamp(0.9rem, 3vw, 1.5rem); color: #aaffff; opacity: 0.9; text-shadow: 0 0 10px rgba(170, 255, 255, 0.5); letter-spacing: 1px; line-height: 1.4; }
      .hero-selection-container { position: relative; width: 100%; max-width: 1200px; margin: clamp(15px, 3vh, 30px) 0; perspective: 1000px; }
      .hero-carousel { display: flex; gap: 15px; overflow-x: auto; padding: 15px; scroll-behavior: smooth; scrollbar-width: none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; scroll-padding: 15px; }
      .hero-carousel::-webkit-scrollbar { display: none; }
      .hero-card { flex: 0 0 auto; width: clamp(130px, 28vw, 200px); height: clamp(200px, 40vw, 280px); background: linear-gradient(135deg, rgba(0, 20, 60, 0.8), rgba(0, 40, 100, 0.6)); border-radius: 15px; padding: clamp(15px, 3vw, 25px); cursor: pointer; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); border: 2px solid transparent; position: relative; overflow: hidden; transform-style: preserve-3d; }
      .hero-card::before { content: ''; position: absolute; top: -2px; left: -2px; right: -2px; bottom: -2px; background: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ffaa); border-radius: 17px; z-index: -1; opacity: 0; transition: opacity 0.3s; }
      .hero-card:active::before { opacity: 1; animation: rotateBorder 3s linear infinite; }
      .hero-card.selected { border-color: #ffff00; box-shadow: 0 0 30px rgba(255, 255, 0, 0.5), inset 0 0 15px rgba(255, 255, 0, 0.2); animation: selectedGlow 2s infinite alternate; }
      .hero-icon { font-size: clamp(2.5rem, 8vw, 4rem); margin-bottom: clamp(10px, 2vw, 20px); text-align: center; filter: drop-shadow(0 0 10px currentColor); animation: iconFloat 3s ease-in-out infinite; }
      .hero-name { font-family: 'Orbitron', sans-serif; font-size: clamp(0.9rem, 3vw, 1.2rem); text-align: center; font-weight: 700; color: #ffffff; text-shadow: 0 0 10px currentColor; margin-bottom: 8px; line-height: 1.3; }
      .hero-stats { display: flex; justify-content: space-around; margin-top: clamp(8px, 2vw, 15px); font-size: clamp(0.7rem, 2.5vw, 0.9rem); color: #aaffff; }
      .stat { text-align: center; }
      .stat-value { color: #ffff00; font-weight: bold; }
      .menu-buttons { display: flex; flex-direction: column; gap: 15px; margin-top: clamp(20px, 5vh, 40px); width: min(400px, 90%); }
      .menu-btn { padding: clamp(12px, 3vh, 18px) clamp(20px, 5vw, 50px); font-size: clamp(1rem, 3.5vw, 1.3rem); font-family: 'Orbitron', sans-serif; font-weight: 700; background: linear-gradient(45deg, #ff0066, #ff4400); border: none; border-radius: 50px; color: white; cursor: pointer; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); position: relative; overflow: hidden; letter-spacing: 1px; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); -webkit-tap-highlight-color: transparent; min-height: 50px; }
      .menu-btn::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent); transition: left 0.5s; }
      .menu-btn:active::before { left: 100%; }
      .menu-btn:active { transform: scale(0.95); }
      #start-game { background: linear-gradient(45deg, #00cc00, #00ff88); }
      .mobile-controls { position: absolute; bottom: 20px; left: 0; width: 100%; padding: 15px; z-index: 30; display: none; pointer-events: none; }
      .dpad { position: relative; width: 150px; height: 150px; }
      .dpad-btn { position: absolute; width: 60px; height: 60px; background: rgba(0, 0, 0, 0.6); border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 15px; color: white; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); pointer-events: auto; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
      .dpad-btn:active { background: rgba(255, 255, 255, 0.2); transform: scale(0.9); }
      .dpad-up { top: 0; left: 45px; } .dpad-down { bottom: 0; left: 45px; } .dpad-left { top: 45px; left: 0; } .dpad-right { top: 45px; right: 0; }
      .action-buttons { position: absolute; right: 20px; bottom: 20px; display: flex; flex-direction: column; gap: 15px; pointer-events: auto; }
      .action-btn { width: 70px; height: 70px; border-radius: 50%; background: linear-gradient(45deg, #ff0066, #ff4400); border: 3px solid rgba(255, 255, 255, 0.3); color: white; font-size: 1.5rem; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
      .action-btn:active { transform: scale(0.9); opacity: 0.8; }
      #attack-btn { background: linear-gradient(45deg, #0066ff, #00aaff); }
      #special-btn { background: linear-gradient(45deg, #00cc00, #00ff88); }
      #ultimate-btn { background: linear-gradient(45deg, #ff00ff, #ffff00); }
      #game-hud { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 20; display: none; }
      .hud-player-info { position: absolute; top: clamp(10px, 3vh, 30px); left: clamp(10px, 2vw, 30px); width: clamp(250px, 70vw, 300px); background: rgba(0, 0, 0, 0.7); border-radius: 10px; padding: clamp(10px, 2vw, 20px); backdrop-filter: blur(10px); border: 2px solid #00ffff; box-shadow: 0 0 20px rgba(0, 255, 255, 0.3); }
      .player-name { font-family: 'Orbitron', sans-serif; font-size: clamp(1rem, 4vw, 1.5rem); color: #00ffff; margin-bottom: 10px; text-shadow: 0 0 10px #00ffff; line-height: 1.2; }
      .health-container, .energy-container { margin-bottom: 10px; }
      .health-label, .energy-label { display: flex; justify-content: space-between; margin-bottom: 5px; color: #ffffff; font-size: clamp(0.7rem, 2.5vw, 0.9rem); }
      .health-bar, .energy-bar { height: clamp(12px, 3vw, 20px); background: rgba(255, 255, 255, 0.1); border-radius: 10px; overflow: hidden; position: relative; }
      .health-fill { height: 100%; background: linear-gradient(90deg, #ff0000, #ff9900, #00ff00); width: 100%; transition: width 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
      .energy-fill { height: 100%; background: linear-gradient(90deg, #0066ff, #00ffff); width: 100%; transition: width 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
      .hud-score { position: absolute; top: clamp(10px, 3vh, 30px); right: clamp(10px, 2vw, 30px); background: rgba(0, 0, 0, 0.7); padding: clamp(10px, 2vw, 20px) clamp(15px, 3vw, 30px); border-radius: 10px; border: 2px solid #ffff00; backdrop-filter: blur(10px); box-shadow: 0 0 20px rgba(255, 255, 0, 0.3); }
      .score-value { font-family: 'Orbitron', sans-serif; font-size: clamp(1.5rem, 5vw, 2.5rem); color: #ffff00; text-shadow: 0 0 15px #ffff00; }
      .score-label { color: #ffffff; font-size: clamp(0.8rem, 2.5vw, 1rem); opacity: 0.8; }
      .combat-log { position: absolute; bottom: clamp(120px, 20vh, 200px); left: clamp(10px, 2vw, 30px); width: clamp(250px, 80vw, 300px); max-height: clamp(100px, 20vh, 200px); overflow-y: auto; background: rgba(0, 0, 0, 0.7); border-radius: 10px; padding: 10px; backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); scrollbar-width: thin; scrollbar-color: #00ffff rgba(0, 0, 0, 0.5); font-size: clamp(0.7rem, 2.5vw, 0.9rem); }
      .combat-log::-webkit-scrollbar { width: 4px; }
      .combat-log::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.5); border-radius: 2px; }
      .combat-log::-webkit-scrollbar-thumb { background: #00ffff; border-radius: 2px; }
      .log-entry { color: #aaffff; margin-bottom: 6px; font-size: clamp(0.7rem, 2.5vw, 0.9rem); animation: logEntry 0.3s ease-out; word-break: break-word; }
      .fire-effect { position: absolute; width: 50px; height: 50px; background: radial-gradient(circle, rgba(255,100,0,0.8) 0%, rgba(255,50,0,0) 70%); filter: blur(5px); border-radius: 50%; pointer-events: none; z-index: 5; animation: fireAnimation 0.5s ease-out forwards; }
      .damage-number { position: absolute; font-family: 'Orbitron', sans-serif; font-size: clamp(1rem, 3vw, 1.5rem); font-weight: bold; color: #ff4444; text-shadow: 0 0 10px #ff0000; pointer-events: none; z-index: 10; animation: damageFloat 1s ease-out forwards; }
      .science-popup { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0); background: linear-gradient(135deg, rgba(0, 20, 60, 0.95), rgba(0, 40, 100, 0.9)); padding: clamp(20px, 5vw, 40px); border-radius: 20px; text-align: center; max-width: min(600px, 90%); z-index: 100; backdrop-filter: blur(20px); box-shadow: 0 0 50px rgba(0, 255, 255, 0.4), 0 0 0 2px #00ffff, 0 0 0 5px rgba(0, 255, 255, 0.2); display: none; }
      .science-title { font-family: 'Orbitron', sans-serif; font-size: clamp(1.5rem, 4vw, 2.5rem); background: linear-gradient(45deg, #00ffff, #00ffaa); -webkit-background-clip: text; background-clip: text; color: transparent; margin-bottom: 15px; text-shadow: 0 0 20px rgba(0, 255, 255, 0.5); line-height: 1.3; }
      .science-content { color: #ffffff; font-size: clamp(1rem, 3vw, 1.4rem); line-height: 1.5; margin-bottom: 20px; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); }
      .science-icon { font-size: clamp(2rem, 6vw, 3rem); margin-bottom: 15px; animation: scienceGlow 2s infinite alternate; }
      .controls-help { position: absolute; bottom: clamp(10px, 5vh, 30px); right: clamp(10px, 2vw, 30px); background: rgba(0, 0, 0, 0.8); padding: 15px; border-radius: 10px; border: 2px solid #ff00ff; backdrop-filter: blur(10px); box-shadow: 0 0 20px rgba(255, 0, 255, 0.3); display: none; max-width: min(300px, 80%); }
      .control-item { display: flex; align-items: center; margin-bottom: 8px; color: #ffffff; font-size: clamp(0.7rem, 2.5vw, 0.9rem); }
      .control-key { background: #333; padding: 4px 8px; border-radius: 5px; margin-right: 8px; font-family: monospace; min-width: 60px; text-align: center; border: 1px solid #666; font-size: clamp(0.6rem, 2vw, 0.8rem); }
      #game-canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10; display: none; }
      #game-over { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle, rgba(0,0,0,0.9) 0%, rgba(100,0,0,0.8) 100%); display: none; flex-direction: column; justify-content: center; align-items: center; z-index: 90; backdrop-filter: blur(10px); padding: 20px; }
      .game-over-title { font-family: 'Orbitron', sans-serif; font-size: clamp(2rem, 6vw, 4rem); background: linear-gradient(45deg, #ff0000, #ff8800); -webkit-background-clip: text; background-clip: text; color: transparent; margin-bottom: 20px; text-shadow: 0 0 30px rgba(255, 0, 0, 0.5); animation: gameOverPulse 2s infinite; text-align: center; line-height: 1.2; }
      .final-score { font-size: clamp(1.5rem, 5vw, 3rem); color: #ffff00; margin-bottom: 30px; text-shadow: 0 0 20px #ffff00; text-align: center; }
      #orientation-warning { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000428; z-index: 2000; justify-content: center; align-items: center; flex-direction: column; padding: 20px; text-align: center; }
      .orientation-icon { font-size: 4rem; margin-bottom: 20px; animation: pulseGlow 2s infinite; }
      .orientation-text { font-size: 1.5rem; color: #00ffff; margin-bottom: 20px; padding: 0 20px; }
      @keyframes floatParticle { 0% { transform: translateY(100vh) translateX(0) rotate(0deg); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateY(-100px) translateX(100px) rotate(360deg); opacity: 0; } }
      @keyframes pulseGlow { 0% { transform: scale(1); filter: drop-shadow(0 0 10px #00ffff); } 100% { transform: scale(1.1); filter: drop-shadow(0 0 30px #00ffff); } }
      @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      @keyframes borderGlow { 0% { box-shadow: 0 0 10px #00ffff; } 50% { box-shadow: 0 0 20px #ff00ff; } 100% { box-shadow: 0 0 10px #ffff00; } }
      @keyframes titleFloat { 0%, 100% { transform: translateY(0) rotateY(0deg); } 50% { transform: translateY(-10px) rotateY(5deg); } }
      @keyframes electricSpark { 0%, 100% { opacity: 0; transform: scale(0.5); } 50% { opacity: 1; transform: scale(1); } }
      @keyframes rotateBorder { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      @keyframes selectedGlow { 0% { box-shadow: 0 0 15px rgba(255, 255, 0, 0.3); } 100% { box-shadow: 0 0 30px rgba(255, 255, 0, 0.6); } }
      @keyframes iconFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
      @keyframes fireAnimation { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }
      @keyframes damageFloat { 0% { transform: translateY(0) scale(1); opacity: 1; } 100% { transform: translateY(-80px) scale(1.3); opacity: 0; } }
      @keyframes popupShow { 0% { transform: translate(-50%, -50%) scale(0) rotateX(90deg); } 100% { transform: translate(-50%, -50%) scale(1) rotateX(0deg); } }
      @keyframes scienceGlow { 0% { filter: drop-shadow(0 0 10px #00ffff); transform: scale(1); } 100% { filter: drop-shadow(0 0 15px #00ffaa); transform: scale(1.05); } }
      @keyframes logEntry { 0% { transform: translateX(-20px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
      @keyframes gameOverPulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.03); opacity: 0.8; } }
      @media (max-width: 768px) { .main-title::after { right: -25px; } .hero-carousel { gap: 10px; } .mobile-controls { display: flex; justify-content: space-between; align-items: flex-end; } .dpad { width: 120px; height: 120px; } .dpad-btn { width: 50px; height: 50px; font-size: 1.2rem; } .action-btn { width: 60px; height: 60px; font-size: 1.2rem; } .combat-log { bottom: 150px; } }
      @media (max-width: 480px) { .dpad { width: 100px; height: 100px; } .dpad-btn { width: 40px; height: 40px; font-size: 1rem; } .dpad-up { top: 0; left: 30px; } .dpad-down { bottom: 0; left: 30px; } .dpad-left { top: 30px; left: 0; } .dpad-right { top: 30px; right: 0; } .action-btn { width: 50px; height: 50px; font-size: 1rem; } .action-buttons { right: 10px; bottom: 10px; gap: 10px; } .combat-log { bottom: 130px; } }
      @media (max-height: 500px) { .title-section { margin-bottom: 10px; } .hero-selection-container { margin: 10px 0; } .hero-card { height: 150px; padding: 10px; } .hero-icon { font-size: 2rem; margin-bottom: 5px; } .hero-stats { margin-top: 5px; } .menu-buttons { margin-top: 15px; } .menu-btn { padding: 8px 20px; min-height: 40px; } }
      @media (orientation: landscape) and (max-height: 500px) { .main-title { font-size: 2rem; } .subtitle { font-size: 0.9rem; } .hero-card { width: 120px; height: 120px; padding: 8px; } .hero-icon { font-size: 1.5rem; margin-bottom: 3px; } .hero-name { font-size: 0.8rem; } .hero-stats { font-size: 0.6rem; } .menu-buttons { flex-direction: row; gap: 10px; margin-top: 10px; } .menu-btn { padding: 8px 15px; font-size: 0.9rem; } }
    </style>
    <div id="game-container">
      <!-- Orientation Warning -->
      <div id="orientation-warning">
        <div class="orientation-icon">📱</div>
        <div class="orientation-text">Please rotate your device to landscape mode for the best experience!</div>
        <div class="subtitle">(Or play in portrait if you prefer touch controls)</div>
      </div>
      <div class="floating-particles" id="floating-particles"></div>
      <div id="loading-screen">
        <div class="loading-logo">🔥</div>
        <h1 class="loading-title">SCIENCE FIGHTER 3D</h1>
        <p class="loading-subtitle">Loading Epic 3D Anime Battle Experience...</p>
        <div class="loading-progress-container">
          <div class="loading-progress-bar" id="loading-bar"></div>
        </div>
        <div class="loading-percentage" id="loading-percentage">0%</div>
      </div>
      <div id="game-over">
        <h1 class="game-over-title">MISSION COMPLETED</h1>
        <div class="final-score" id="final-score">SCORE: 0</div>
        <div class="menu-buttons">
          <button class="menu-btn" id="restart-btn">⚡ PLAY AGAIN</button>
          <button class="menu-btn" id="menu-btn">🏠 MAIN MENU</button>
        </div>
      </div>
      <div id="main-menu">
        <div class="title-section">
          <h1 class="main-title">ANIME SCIENCE WARRIORS</h1>
          <p class="subtitle">3D Battle Simulation • Class 6 Learning Adventure</p>
        </div>
        <div class="hero-selection-container">
          <div class="hero-carousel" id="hero-carousel"></div>
        </div>
        <div class="menu-buttons">
          <button class="menu-btn" id="start-game">🚀 START BATTLE</button>
          <button class="menu-btn" id="how-to-play">🎮 HOW TO PLAY</button>
          <button class="menu-btn" id="credits">📚 SCIENCE FACTS</button>
        </div>
      </div>
      <div class="mobile-controls">
        <div class="dpad">
          <button class="dpad-btn dpad-up" id="up-btn">↑</button>
          <button class="dpad-btn dpad-down" id="down-btn">↓</button>
          <button class="dpad-btn dpad-left" id="left-btn">←</button>
          <button class="dpad-btn dpad-right" id="right-btn">→</button>
        </div>
        <div class="action-buttons">
          <button class="action-btn" id="attack-btn">⚔️</button>
          <button class="action-btn" id="special-btn">✨</button>
          <button class="action-btn" id="ultimate-btn">💥</button>
        </div>
      </div>
      <div id="game-hud">
        <div class="hud-player-info">
          <div class="player-name" id="player-name">MAGNET WARRIOR</div>
          <div class="health-container">
            <div class="health-label">
              <span>HEALTH</span>
              <span id="health-value">100%</span>
            </div>
            <div class="health-bar">
              <div class="health-fill" id="health-fill"></div>
            </div>
          </div>
          <div class="energy-container">
            <div class="energy-label">
              <span>ENERGY</span>
              <span id="energy-value">100%</span>
            </div>
            <div class="energy-bar">
              <div class="energy-fill" id="energy-fill"></div>
            </div>
          </div>
        </div>
        <div class="hud-score">
          <div class="score-label">SCORE</div>
          <div class="score-value" id="score-value">0</div>
        </div>
        <div class="combat-log" id="combat-log"></div>
        <div class="controls-help" id="controls-help">
          <div class="control-item"><div class="control-key">WASD / Arrows</div><span>Move Hero</span></div>
          <div class="control-item"><div class="control-key">SPACE</div><span>Fire Attack</span></div>
          <div class="control-item"><div class="control-key">SHIFT</div><span>Special Move</span></div>
          <div class="control-item"><div class="control-key">E</div><span>Ultimate Skill</span></div>
        </div>
      </div>
      <div class="science-popup" id="science-popup">
        <div class="science-icon" id="science-icon">🔬</div>
        <h3 class="science-title">SCIENCE DISCOVERY!</h3>
        <p class="science-content" id="popup-text">Magnets only attract iron, nickel, and cobalt objects</p>
      </div>
      <canvas id="game-canvas"></canvas>
    </div>
    ` }} />
  );
}
