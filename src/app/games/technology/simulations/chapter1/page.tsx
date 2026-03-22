
'use client';
import React, { useEffect } from 'react';
import { useLanguage } from '@/context/language-context';

const ComponentSorter3DGame = () => {
  const { t } = useLanguage();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    document.body.appendChild(script);

    let animationFrameId: number;

    const onScriptLoad = () => {
      // --- THREE.JS GAME LOGIC ---
      const THREE = (window as any).THREE;
      if (!THREE) return;

      let scene: any, camera: any, renderer: any, raycaster: any;
      let mouse = new THREE.Vector2();
      let draggableObject: any, dropShadow: any;
      let score = 0;
      let currentIndex = 0;
      let gameActive = true;

      const components = [
        { name: 'Keyboard', category: 'Input', color: 0x00ff00 },
        { name: 'Monitor', category: 'Output', color: 0xff0000 },
        { name: 'CPU', category: 'Processing', color: 0x00aaff },
        { name: 'Mouse', category: 'Input', color: 0x00ff00 },
        { name: 'Speakers', category: 'Output', color: 0xff0000 },
        { name: 'RAM', category: 'Processing', color: 0x00aaff },
        { name: 'Microphone', category: 'Input', color: 0x00ff00 },
        { name: 'Printer', category: 'Output', color: 0xff0000 },
      ];

      const zones: { name: string; position: any; mesh?: any }[] = [
        { name: 'Input', position: new THREE.Vector3(-15, 0.25, 0) },
        { name: 'Processing', position: new THREE.Vector3(0, 0.25, -15) },
        { name: 'Output', position: new THREE.Vector3(15, 0.25, 0) },
      ];

      function init() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a202c);
        scene.fog = new THREE.Fog(0x1a202c, 30, 100);

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 15, 25);

        const canvas = document.getElementById('game-canvas');
        if (!canvas) return;
        renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas! });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
        dirLight.position.set(10, 20, 5);
        dirLight.castShadow = true;
        scene.add(dirLight);

        raycaster = new THREE.Raycaster();

        createZones();
        spawnComponent();
        createCentralCore();
        createGrid();
        createDropShadow();

        window.addEventListener('resize', onWindowResize);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('touchstart', onTouchStart, { passive: false });
        window.addEventListener('touchend', onTouchEnd, { passive: false });
        window.addEventListener('keydown', onKeyDown);
        
        document.getElementById('restart-button')?.addEventListener('click', restartGame);

        animate();
      }

      function createCentralCore() {
        const coreGeo = new THREE.BoxGeometry(4, 8, 4);
        const coreMat = new THREE.MeshPhongMaterial({
          color: 0x4A5568,
          emissive: 0x2d3748,
          emissiveIntensity: 0.8,
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        core.position.y = 4;
        core.receiveShadow = true;
        scene.add(core);
      }
      
      function createGrid() {
        const gridHelper = new THREE.GridHelper(100, 50, 0x4a5568, 0x2d3748);
        scene.add(gridHelper);
      }

      function createZones() {
        zones.forEach(zone => {
          const geo = new THREE.CylinderGeometry(5, 5, 0.5, 32);
          const mat = new THREE.MeshPhongMaterial({
            color: 0x4a5568,
            transparent: true,
            opacity: 0.3,
            emissive: 0x4a5568,
            emissiveIntensity: 0.2
          });
          const mesh = new THREE.Mesh(geo, mat);
          mesh.position.copy(zone.position);
          mesh.name = zone.name;
          zone.mesh = mesh;
          scene.add(mesh);
          
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d')!;
          canvas.width = 256;
          canvas.height = 128;
          context.font = 'Bold 48px Arial';
          context.fillStyle = 'rgba(255, 255, 255, 0.9)';
          context.textAlign = 'center';
          context.fillText(zone.name, 128, 50);
          
          const texture = new THREE.CanvasTexture(canvas);
          const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
          const sprite = new THREE.Sprite(spriteMat);
          sprite.position.set(zone.position.x, zone.position.y + 4, zone.position.z);
          sprite.scale.set(10, 5, 1.0);
          scene.add(sprite);
        });
      }

      function createDropShadow() {
        const shadowGeo = new THREE.CircleGeometry(1.5, 32);
        const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.4 });
        dropShadow = new THREE.Mesh(shadowGeo, shadowMat);
        dropShadow.rotation.x = -Math.PI / 2;
        dropShadow.position.y = 0.01;
        scene.add(dropShadow);
      }

      function spawnComponent() {
        if (draggableObject) {
            scene.remove(draggableObject);
            draggableObject = null;
        }

        if (currentIndex >= components.length) {
            endGame();
            return;
        }

        const componentData = components[currentIndex];
        const geo = new THREE.BoxGeometry(2, 2, 2);
        const mat = new THREE.MeshPhongMaterial({ color: componentData.color, emissive: componentData.color, emissiveIntensity: 0.5 });
        draggableObject = new THREE.Mesh(geo, mat);
        draggableObject.position.set(0, 10, 0);
        draggableObject.castShadow = true;
        draggableObject.userData = componentData;
        scene.add(draggableObject);
        
        updateHud();
        gameActive = true;
      }

      function onKeyDown(event: KeyboardEvent) {
        if (!gameActive || !draggableObject) return;
        
        const moveSpeed = 0.5;
        switch(event.key) {
            case 'ArrowUp':
                draggableObject.position.z -= moveSpeed;
                break;
            case 'ArrowDown':
                draggableObject.position.z += moveSpeed;
                break;
            case 'ArrowLeft':
                draggableObject.position.x -= moveSpeed;
                break;
            case 'ArrowRight':
                draggableObject.position.x += moveSpeed;
                break;
            case 'Enter':
            case ' ':
                checkForDrop();
                break;
        }
      }

      function checkForDrop() {
        for (const zone of zones) {
            if (draggableObject.position.distanceTo(zone.position) < 5) {
                checkAnswer(zone.name);
                return;
            }
        }
      }

      function onMouseMove(event: MouseEvent) {
        updateMouseCoords(event.clientX, event.clientY);
      }

      function onTouchMove(event: TouchEvent) {
        event.preventDefault();
        if (event.touches.length > 0) {
            updateMouseCoords(event.touches[0].clientX, event.touches[0].clientY);
        }
      }

      function updateMouseCoords(x: number, y: number) {
        mouse.x = (x / window.innerWidth) * 2 - 1;
        mouse.y = -(y / window.innerHeight) * 2 + 1;
      }
      
      function onMouseDown(event: MouseEvent) {
        if (event.button === 0) {
             updateMouseCoords(event.clientX, event.clientY);
             handleInteractionStart();
        }
      }
      
      function onTouchStart(event: TouchEvent) {
        if (event.touches.length > 0) {
            updateMouseCoords(event.touches[0].clientX, event.touches[0].clientY);
            handleInteractionStart();
        }
      }
      
      function handleInteractionStart() {
        if (!gameActive) return;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(draggableObject);
        if (intersects.length > 0) {
          // Dragging logic could be implemented here if desired
        }
      }

      function onMouseUp(event: MouseEvent) {
        if (event.button === 0) handleInteractionEnd();
      }
      
      function onTouchEnd(event: TouchEvent) {
        handleInteractionEnd();
      }

      function handleInteractionEnd() {
        if (!gameActive) return;
        raycaster.setFromCamera(mouse, camera);
        const zoneMeshes = zones.map(z => z.mesh).filter(mesh => mesh !== undefined) as any[];
        const intersects = raycaster.intersectObjects(zoneMeshes);

        if (intersects.length > 0) {
          const targetZone = intersects[0].object;
          checkAnswer(targetZone.name);
        }
      }
      
      function checkAnswer(zoneName: string) {
          if (!gameActive) return;
          gameActive = false;
          
          const correctCategory = draggableObject.userData.category;
          const isCorrect = zoneName === correctCategory;
          
          const targetZoneMesh = zones.find(z => z.name === zoneName)?.mesh;

          if(isCorrect) {
              score++;
              showFeedback('Correct!', '#48BB78');
              if (targetZoneMesh) pulseZone(targetZoneMesh, 0x48BB78);
          } else {
              showFeedback(`Wrong! It's a ${correctCategory} device.`, '#F56565');
              if (targetZoneMesh) pulseZone(targetZoneMesh, 0xF56565);
          }
          
          currentIndex++;
          setTimeout(() => {
            spawnComponent();
          }, 1500);
      }
      
      function pulseZone(zoneMesh: any, color: number) {
          const originalColor = zoneMesh.material.emissive.getHex();
          zoneMesh.material.emissive.setHex(color);
          zoneMesh.material.opacity = 0.7;
          setTimeout(() => {
              zoneMesh.material.emissive.setHex(originalColor);
              zoneMesh.material.opacity = 0.3;
          }, 800);
      }

      function showFeedback(message: string, color: string) {
          const feedbackEl = document.getElementById('feedback-message');
          if (feedbackEl) {
              feedbackEl.textContent = message;
              feedbackEl.style.color = color;
              feedbackEl.style.opacity = '1';
              setTimeout(() => {
                  feedbackEl.style.opacity = '0';
              }, 1400);
          }
      }

      function updateHud() {
          const scoreEl = document.getElementById('score');
          const componentNameEl = document.getElementById('component-name');
          if(scoreEl) scoreEl.textContent = `Score: ${score} / ${components.length}`;
          if(componentNameEl) componentNameEl.textContent = components[currentIndex]?.name || "Finished!";
      }

      function endGame() {
        gameActive = false;
        if(draggableObject) scene.remove(draggableObject);
        const finalScreen = document.getElementById('final-screen');
        const finalScoreEl = document.getElementById('final-score');
        if (finalScreen && finalScoreEl) {
            finalScoreEl.textContent = `Your Score: ${score} / ${components.length}`;
            finalScreen.style.display = 'flex';
        }
      }

      function restartGame() {
        score = 0;
        currentIndex = 0;
        const finalScreen = document.getElementById('final-screen');
        if (finalScreen) finalScreen.style.display = 'none';
        spawnComponent();
      }

      function onWindowResize() {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function animate() {
        animationFrameId = requestAnimationFrame(animate);

        if (draggableObject) {
            draggableObject.rotation.y += 0.005;
            draggableObject.rotation.x += 0.005;
        }

        if (dropShadow && draggableObject) {
            dropShadow.position.x = draggableObject.position.x;
            dropShadow.position.z = draggableObject.position.z;
        }
        
        zones.forEach(zone => {
            if (zone.mesh) {
                zone.mesh.rotation.y += 0.002;
            }
        });

        if (renderer && scene && camera) {
            renderer.render(scene, camera);
        }
      }
      
      init();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', onWindowResize);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mouseup', onMouseUp);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchend', onTouchEnd);
        window.removeEventListener('keydown', onKeyDown);
        const restartBtn = document.getElementById('restart-button');
        if (restartBtn) {
            restartBtn.removeEventListener('click', restartGame);
        }

        if (renderer) {
          renderer.dispose();
          const canvas = renderer.domElement;
          if (canvas && canvas.parentElement) {
              canvas.parentElement.removeChild(canvas);
          }
        }
        // Clean up scene objects
        if (scene) {
            while(scene.children.length > 0){ 
                scene.remove(scene.children[0]); 
            }
        }
      };
    };

    script.onload = onScriptLoad;
    
    let cleanup: (() => void) | null | undefined = null;
    
    // Store cleanup function returned by onScriptLoad
    const originalOnLoad = script.onload;
    script.onload = () => {
      if (originalOnLoad) (originalOnLoad as any)();
      cleanup = onScriptLoad();
    };

    return () => {
      // Run the cleanup function
      if (cleanup) {
        cleanup();
      }
      // Remove the script from the body
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [t]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <canvas id="game-canvas" style={{ display: 'block', width: '100%', height: '100%' }}></canvas>
      <div id="hud" style={{ position: 'absolute', top: '20px', left: '20px', color: 'white', fontFamily: 'sans-serif', backgroundColor: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '8px', zIndex: 1 }}>
        <h1 id="component-name" style={{ fontSize: '24px', margin: 0 }}>Component</h1>
        <p id="score" style={{ fontSize: '18px', margin: '5px 0 0 0' }}>Score: 0 / 8</p>
      </div>
       <div id="controls-info" style={{ position: 'absolute', bottom: '20px', left: '20px', color: '#a0aec0', fontFamily: 'sans-serif', backgroundColor: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '8px', zIndex: 1 }}>
        <p style={{ margin: 0, fontSize: '14px' }}><b>Controls:</b> Arrow Keys to move | Enter/Space to drop</p>
      </div>
      <div id="feedback-message" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '32px', fontWeight: 'bold', opacity: 0, transition: 'opacity 0.5s ease', textShadow: '2px 2px 4px #000', zIndex: 2 }}></div>
      <div id="final-screen" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'none', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', fontFamily: 'sans-serif', zIndex: 3 }}>
          <h2 style={{ fontSize: '48px', marginBottom: '20px' }}>Game Over!</h2>
          <p id="final-score" style={{ fontSize: '36px', marginBottom: '40px' }}></p>
          <button id="restart-button" style={{ padding: '15px 30px', fontSize: '20px', cursor: 'pointer', backgroundColor: '#48BB78', color: 'white', border: 'none', borderRadius: '8px' }}>Play Again</button>
      </div>
    </div>
  );
};

export default ComponentSorter3DGame;

    