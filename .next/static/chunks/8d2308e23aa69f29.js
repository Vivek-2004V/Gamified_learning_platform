(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,14455,e=>{"use strict";var t=e.i(43476),n=e.i(71645);function o(){return(0,n.useEffect)(()=>{let e,t,n,o,i=e=>e.preventDefault();document.body.addEventListener("touchmove",i,{passive:!1});let a="menu",r="playing",s="loading",l="magnet",d=0,c=100,p=100,m=0,f=0,h=!1,g=!1,u=!1,b=!1,x=.15,v=!1,w=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),y=!1,E,k=[],M=[],I=[],z=0,T=0,S=0,B=0,L=0,C={magnet:{name:"MAGNET WARRIOR",color:26367,attackType:"MAGNETIC PULL",special:"IRON CRUSH",ultimate:"MAGNETIC STORM",description:"Controls magnetic forces - attracts metal enemies",stats:{power:8,speed:6,defense:7}},water:{name:"WATER SPIRIT",color:43775,attackType:"WATER BLAST",special:"ICE SHARD",ultimate:"TSUNAMI WAVE",description:"Controls water states - ice, liquid, steam",stats:{power:7,speed:8,defense:6}},plant:{name:"PLANT GUARDIAN",color:43520,attackType:"VINE WHIP",special:"POLLEN CLOUD",ultimate:"FOREST RAGE",description:"Grows with sunlight - weak in darkness",stats:{power:6,speed:5,defense:9}},motion:{name:"MOTION MASTER",color:0xff6600,attackType:"SPEED PUNCH",special:"TIME SLOW",ultimate:"HYPER SPEED",description:"Moves with physics - affected by friction",stats:{power:9,speed:9,defense:5}},energy:{name:"ENERGY KNIGHT",color:0xffff00,attackType:"ENERGY BOLT",special:"PLASMA BURST",ultimate:"SOLAR FLARE",description:"Uses solar power - needs sunlight",stats:{power:8,speed:7,defense:8}}},A={pollution:{name:"Pollution Monster",color:6710886,health:60,speed:.02},energy:{name:"Energy Vampire",color:0xff00ff,health:50,speed:.03},waste:{name:"Waste Golem",color:0xaa5500,health:80,speed:.015},confusion:{name:"Confusion Spirit",color:0xffff00,health:40,speed:.035}};function O(e,t){if(s===r)switch(e){case"up-btn":h=t;break;case"down-btn":g=t;break;case"left-btn":u=t;break;case"right-btn":b=t}}function R(e){if(s===r)switch(e){case"attack-btn":G();break;case"special-btn":W();break;case"ultimate-btn":Y()}}function P(e){l=e,document.querySelectorAll(".hero-card").forEach(t=>{t.classList.remove("selected"),t.dataset.hero===e&&t.classList.add("selected")}),D()}function D(){let e=C[l],t=document.getElementById("player-name");t&&(t.textContent=e.name)}function H(){let i,a,y,O,R,P,D,H,G,j,W,Y=window.THREE;if(!Y)return void console.error("Three.js not loaded");(e=new Y.Scene).background=new Y.Color(34),(t=new Y.PerspectiveCamera(60,window.innerWidth/window.innerHeight,.1,1e3)).position.set(0,15,30);let U=document.getElementById("game-canvas");if(!U)return;(n=new Y.WebGLRenderer({canvas:U,antialias:!0,alpha:!0,powerPreference:"high-performance"})).setSize(window.innerWidth,window.innerHeight),n.setPixelRatio(w?1:Math.min(window.devicePixelRatio,2)),n.shadowMap.enabled=!0;let _=new Y.AmbientLight(0xffffff,.4);e.add(_);let J=new Y.DirectionalLight(0xffffff,1);J.position.set(10,30,15),J.castShadow=!0,e.add(J),a=new(i=window.THREE).Group,y=new i.CylinderGeometry(1,1,4,16),O=new i.MeshPhongMaterial({color:C[l].color,shininess:100,emissive:C[l].color,emissiveIntensity:.2}),(R=new i.Mesh(y,O)).castShadow=!0,a.add(R),P=new i.SphereGeometry(1.2,16,16),(D=new i.Mesh(P,O)).position.y=2.5,D.castShadow=!0,a.add(D),(E={mesh:a,body:R,speed:x}).mesh.position.set(0,2,0),e.add(E.mesh),G=new(H=window.THREE).PlaneGeometry(100,100,10,10),j=new H.MeshPhongMaterial({color:3355460,shininess:30,side:H.DoubleSide}),(W=new H.Mesh(G,j)).rotation.x=-Math.PI/2,W.position.y=-1,W.receiveShadow=!0,e.add(W),function(e){for(let e=0;e<3;e++)N()}(3),window.addEventListener("resize",K),o=new Y.Clock,function i(){var a;requestAnimationFrame(i);let x=Math.min(o.getDelta(),.033);s===r&&s===r&&(z+=x,T+=x,S>0&&(S-=x),B>0&&(B-=x),L>0&&(L-=x),z>3&&k.length<8&&(N(),z=0),T>.5&&p<100&&(p=Math.min(100,p+2),$(),T=0),function(e){if(!E||!E.mesh)return;let t=0,n=0,o=E.speed;v&&(o*=3),h&&(n-=o*e*60),g&&(n+=o*e*60),u&&(t-=o*e*60),b&&(t+=o*e*60),E.mesh.position.x+=t,E.mesh.position.z+=n,E.mesh.position.x=Math.max(-45,Math.min(45,E.mesh.position.x)),E.mesh.position.z=Math.max(-45,Math.min(45,E.mesh.position.z)),E.mesh.position.y=2+.5*Math.sin(.003*Date.now())}(x),a=x,k.forEach((e,n)=>{let o,i,r,p,m,f,h,g;if(!e.mesh||!E||!E.mesh)return;let u=E.mesh.position.x-e.mesh.position.x,b=E.mesh.position.z-e.mesh.position.z,x=Math.sqrt(u*u+b*b);x>2&&(e.mesh.position.x+=u/x*e.speed*a*60,e.mesh.position.z+=b/x*e.speed*a*60),e.mesh.position.y=e.originalY+.5*Math.sin(.002*Date.now()+n),e.mesh.rotation.y+=a,x<2.5&&(c=Math.max(0,c-5),E.body.material.emissive.setHex(0xff0000),setTimeout(()=>{E&&E.body&&E.body.material.emissive.setHex(C[l].color)},200),o=t.position.clone(),i=0,window.THREE,function e(){(i+=.1)>1?t.position.copy(o):(t.position.x=o.x+(Math.random()-.5)*.3,t.position.y=o.y+(Math.random()-.5)*.3,t.position.z=o.z+(Math.random()-.5)*.3,requestAnimationFrame(e))}(),c<=0&&(s="game_over",(r=document.getElementById("game-hud"))&&(r.style.display="none"),(p=document.getElementById("game-canvas"))&&(p.style.display="none"),(m=document.getElementById("controls-help"))&&(m.style.display="none"),(f=document.querySelector(".mobile-controls"))&&(f.style.display="none"),(h=document.getElementById("game-over"))&&(h.style.display="flex"),(g=document.getElementById("final-score"))&&(g.textContent=`SCORE: ${d}`),V("Game Over! Final Score: "+d,"critical")),q(E.mesh.position.x,E.mesh.position.y+3,E.mesh.position.z,5),V(`Hit by ${A[e.type].name}!`,"critical"))}),function(t){for(let n=M.length-1;n>=0;n--){let o=M[n];if(window.THREE,o.mesh.position.add(o.velocity.clone().multiplyScalar(60*t)),o.distanceTraveled+=o.speed*t*60,o.mesh.rotation.x+=3*t,o.mesh.rotation.y+=3*t,o.distanceTraveled>o.maxDistance){e.remove(o.mesh),M.splice(n,1);continue}for(let t=k.length-1;t>=0;t--){let i=k[t];if(2>o.mesh.position.distanceTo(i.mesh.position)){let a=20+10*Math.random();i.health-=a,F(i.mesh.position.x,i.mesh.position.y,i.mesh.position.z),q(i.mesh.position.x,i.mesh.position.y+3,i.mesh.position.z,Math.round(a)),m++,f=Date.now(),V(`${C[l].attackType} hit for ${Math.round(a)} damage!`),e.remove(o.mesh),M.splice(n,1),i.health<=0&&(d+=100,e.remove(i.mesh),k.splice(t,1),.2>Math.random()&&X());break}}}}(x),function(t){for(let n=I.length-1;n>=0;n--){let o=I[n];o.lifetime-=t,o.lifetime<=0?(e.remove(o.mesh),I.splice(n,1)):"fire"===o.type&&(o.mesh.scale.multiplyScalar(.95),o.mesh.material.opacity*=.9)}}(x),function(e){if(!E||!E.mesh||!t)return;let n=E.mesh.position.x,o=E.mesh.position.z+25;t.position.x+=(n-t.position.x)*.05*e*60,t.position.y+=(18-t.position.y)*.05*e*60,t.position.z+=(o-t.position.z)*.05*e*60,t.lookAt(E.mesh.position.x,E.mesh.position.y+3,E.mesh.position.z)}(x),$(),Date.now()-f>3e3&&m>0&&(m=0)),n&&e&&t&&n.render(e,t)}()}function N(){let t,n,o=window.THREE,i=Object.keys(A)[Math.floor(Math.random()*Object.keys(A).length)],a=A[i],r=new o.Group,s=new o.DodecahedronGeometry(1.5,0),l=new o.MeshPhongMaterial({color:a.color,emissive:a.color,emissiveIntensity:.2,shininess:50}),d=new o.Mesh(s,l);d.castShadow=!0,r.add(d);do t=(Math.random()-.5)*40,n=(Math.random()-.5)*40;while(10>Math.abs(t)&&10>Math.abs(n))r.position.set(t,2,n);let c={mesh:r,type:i,health:a.health,maxHealth:a.health,speed:a.speed,originalY:2};k.push(c),e.add(r)}function $(){let e=document.getElementById("health-fill");e&&(e.style.width=`${c}%`);let t=document.getElementById("energy-fill");t&&(t.style.width=`${p}%`);let n=document.getElementById("health-value");n&&(n.textContent=`${Math.round(c)}%`);let o=document.getElementById("energy-value");o&&(o.textContent=`${Math.round(p)}%`);let i=document.getElementById("score-value");i&&(i.textContent=`${d}`),m>1&&V(`COMBO x${m}!`,"critical")}function G(){s!==r||p<20||S>0||(S=.3,p-=20,j(),F(E.mesh.position.x,E.mesh.position.y+2,E.mesh.position.z),V(`Used ${C[l].attackType}!`))}function j(){let t=window.THREE,n=new t.SphereGeometry(.4,8,8),o=new t.MeshBasicMaterial({color:C[l].color,transparent:!0,opacity:.9}),i=new t.Mesh(n,o);i.position.copy(E.mesh.position),i.position.y+=1;let a=new t.Vector3(0,0,-1);a.applyEuler(E.mesh.rotation),a.multiplyScalar(2),i.position.add(a),e.add(i);let r={mesh:i,velocity:a.normalize().multiplyScalar(1.5),speed:1.5,distanceTraveled:0,maxDistance:30};M.push(r)}function W(){s!==r||p<40||B>0||(B=2,p-=40,v=!0,U(E.mesh.position.x,E.mesh.position.y,E.mesh.position.z),V(`Used ${C[l].special}!`,"heal"),setTimeout(()=>{v=!1},300))}function Y(){if(s===r&&!(p<80)&&!(L>0)){L=10,p-=80;for(let e=0;e<8;e++)setTimeout(()=>{j()},100*e);U(E.mesh.position.x,E.mesh.position.y,E.mesh.position.z,3),V(`ULTIMATE: ${C[l].ultimate}!!!`,"critical")}}function F(t,n,o){let i=window.THREE,a=new i.SphereGeometry(1,8,8),r=new i.MeshBasicMaterial({color:0xff6600,transparent:!0,opacity:.7}),s=new i.Mesh(a,r);s.position.set(t,n,o),e.add(s),I.push({mesh:s,type:"fire",lifetime:.5});let l=document.createElement("div");l.className="fire-effect";let d=document.getElementById("game-container");d&&(d.getBoundingClientRect(),l.style.left=`${(t/50+1)*50}%`,l.style.top=`${(-o/50+1)*50}%`,d.appendChild(l)),setTimeout(()=>l.remove(),500)}function U(e,t,n,o=1){for(let o=0;o<10;o++)setTimeout(()=>{F(e+(Math.random()-.5)*3,t+(Math.random()-.5)*3,n+(Math.random()-.5)*3)},50*o)}function q(e,n,o,i){let a=document.createElement("div");a.className="damage-number",a.textContent=`${i}`;let r=new window.THREE.Vector3(e,n,o);r.project(t),a.style.left=`${(.5*r.x+.5)*100}%`,a.style.top=`${(-(.5*r.y)+.5)*100}%`,document.getElementById("game-container")?.appendChild(a),setTimeout(()=>a.remove(),1e3)}function X(){let e=["Magnets attract only iron, nickel, and cobalt - that's why your fridge door sticks!","Water can exist as solid ice, liquid water, or gas vapor - all H₂O!","Plants use sunlight to make food through photosynthesis - nature's solar panels!","Friction slows things down - that's why you need to push harder on rough surfaces!","The Sun gives us solar energy - it's like a giant nuclear reactor in space!"],t=e[Math.floor(Math.random()*e.length)],n=document.getElementById("science-popup"),o=document.getElementById("science-icon"),i=document.getElementById("popup-text"),a=["🔬","🧪","⚗️","🧫","⚛️","💡","🌡️","🧲"];o&&(o.textContent=a[Math.floor(Math.random()*a.length)]),i&&(i.textContent=t),n&&(n.style.display="block",n.classList.add("show"),setTimeout(()=>{n.classList.remove("show"),setTimeout(()=>{n.style.display="none"},500)},3e3))}function V(e,t=""){let n=document.getElementById("combat-log");if(!n)return;let o=document.createElement("div");for(o.className=`log-entry ${t}`,o.textContent=e,n.appendChild(o),n.scrollTop=n.scrollHeight;n.children.length>10;)n.removeChild(n.firstChild);setTimeout(()=>{o.parentNode&&o.remove()},5e3)}function K(){t&&n&&(t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix(),n.setSize(window.innerWidth,window.innerHeight),w&&(t.fov=window.innerHeight>window.innerWidth?60:70,t.updateProjectionMatrix()))}function _(){s=r;let e=document.getElementById("main-menu");e&&(e.style.display="none");let t=document.getElementById("game-hud");t&&(t.style.display="block");let n=document.getElementById("game-canvas");n&&(n.style.display="block");let o=document.querySelector(".mobile-controls"),i=document.getElementById("controls-help");y?(o&&(o.style.display="flex"),i&&(i.style.display="none")):(o&&(o.style.display="none"),i&&(i.style.display="block")),d=0,c=100,p=100,m=0,H(),V(`Welcome, ${C[l].name}!`,"heal"),V("Defeat enemies and learn science!")}function J(){X();let e=document.getElementById("science-popup"),t=document.getElementById("popup-text"),n=y?`🎮 MOBILE CONTROLS:<br><br>
             • D-PAD → Move Hero<br>
             • ⚔️ Button → Basic Attack<br>
             • ✨ Button → Special Move<br>
             • 💥 Button → Ultimate Skill`:`🎮 DESKTOP CONTROLS:<br><br>
             • WASD / Arrow Keys → Move Hero<br>
             • SPACE → Basic Attack<br>
             • SHIFT → Special Move<br>
             • E → Ultimate Skill`;t&&(t.innerHTML=`
             ${n}<br><br>
             <strong>🎯 GAMEPLAY:</strong><br><br>
             • Defeat enemies to score points<br>
             • Chain attacks for combos<br>
             • Watch for science facts!<br>
             • Manage your energy wisely
         `),e&&(e.style.display="block",e.classList.add("show"))}function Q(){let t=document.getElementById("game-over");t&&(t.style.display="none");let n=document.getElementById("game-hud");n&&(n.style.display="block");let o=document.getElementById("game-canvas");o&&(o.style.display="block");let i=document.querySelector(".mobile-controls");if(y&&i&&(i.style.display="flex"),d=0,c=100,p=100,m=0,e)for(;e.children.length>0;)e.remove(e.children[0]);k=[],M=[],I=[],H(),V("New battle started!","heal")}function Z(){s=a;let e=document.getElementById("game-over");e&&(e.style.display="none");let t=document.getElementById("game-hud");t&&(t.style.display="none");let n=document.getElementById("game-canvas");n&&(n.style.display="none");let o=document.getElementById("controls-help");o&&(o.style.display="none");let i=document.querySelector(".mobile-controls");i&&(i.style.display="none");let r=document.getElementById("main-menu");r&&(r.style.display="flex")}function ee(e){if(s===r)switch(e.key.toLowerCase()){case"w":case"arrowup":h=!0;break;case"s":case"arrowdown":g=!0;break;case"a":case"arrowleft":u=!0;break;case"d":case"arrowright":b=!0;break;case" ":e.preventDefault(),G();break;case"shift":W();break;case"e":Y()}}function et(e){switch(e.key.toLowerCase()){case"w":case"arrowup":h=!1;break;case"s":case"arrowdown":g=!1;break;case"a":case"arrowleft":u=!1;break;case"d":case"arrowright":b=!1}}let en=document.createElement("script");return en.src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js",en.onload=()=>{let e,t,n,o,i,r,d;e=navigator.userAgent,(w=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e))&&(y=!0,x=.12),function(){let e=document.getElementById("floating-particles");if(e)for(let t=0;t<50;t++){let t=document.createElement("div");t.className="particle",t.style.left=`${100*Math.random()}%`,t.style.top=`${100*Math.random()}%`,t.style.animationDelay=`${20*Math.random()}s`,t.style.width=`${3*Math.random()+1}px`,t.style.height=t.style.width,t.style.background=`rgba(${255*Math.random()}, ${255*Math.random()}, 255, 0.3)`,e.appendChild(t)}}(),(t=document.getElementById("hero-carousel"))&&(t.innerHTML="",Object.entries(C).forEach(([e,n])=>{let o=document.createElement("div");o.className=`hero-card ${e===l?"selected":""}`,o.dataset.hero=e,o.innerHTML=`
                <div class="hero-icon">${({magnet:"🧲",water:"💧",plant:"🌱",motion:"🚀",energy:"⚡"})[e]||"🔥"}</div>
                <div class="hero-name">${n.name}</div>
                <div class="hero-stats">
                    <div class="stat">
                        <div>⚔️</div>
                        <div class="stat-value">${n.stats.power}</div>
                    </div>
                    <div class="stat">
                        <div>⚡</div>
                        <div class="stat-value">${n.stats.speed}</div>
                    </div>
                    <div class="stat">
                        <div>🛡️</div>
                        <div class="stat-value">${n.stats.defense}</div>
                    </div>
                </div>
            `,o.addEventListener("click",()=>P(e)),o.addEventListener("touchstart",t=>{t.preventDefault(),P(e)}),t.appendChild(o)}),D()),function(){let e=0,t=document.getElementById("loading-bar"),n=document.getElementById("loading-percentage");if(!t||!n)return;let o=setInterval(()=>{(e+=15*Math.random())>100&&(e=100),t.style.width=`${e}%`,n.textContent=`${Math.round(e)}%`,e>=100&&(clearInterval(o),setTimeout(()=>{let e=document.getElementById("loading-screen");e&&(e.style.display="none"),s=a},500))},200)}(),function(){function e(){let e=document.getElementById("orientation-warning");e&&(window.innerHeight>window.innerWidth&&w?e.style.display="flex":e.style.display="none")}e(),window.addEventListener("resize",e),window.addEventListener("orientationchange",e)}(),y&&(["up-btn","down-btn","left-btn","right-btn"].forEach(e=>{let t=document.getElementById(e);t&&(t.addEventListener("touchstart",t=>{t.preventDefault(),O(e,!0)}),t.addEventListener("touchend",t=>{t.preventDefault(),O(e,!1)}),t.addEventListener("mousedown",t=>{t.preventDefault(),O(e,!0)}),t.addEventListener("mouseup",t=>{t.preventDefault(),O(e,!1)}),t.addEventListener("mouseleave",t=>{O(e,!1)}))}),["attack-btn","special-btn","ultimate-btn"].forEach(e=>{let t=document.getElementById(e);t&&(t.addEventListener("touchstart",t=>{t.preventDefault(),R(e)}),t.addEventListener("touchend",e=>{e.preventDefault()}),t.addEventListener("mousedown",t=>{t.preventDefault(),R(e)}))})),(n=document.getElementById("start-game"))&&n.addEventListener("click",_),(o=document.getElementById("how-to-play"))&&o.addEventListener("click",J),(i=document.getElementById("credits"))&&i.addEventListener("click",X),(r=document.getElementById("restart-btn"))&&r.addEventListener("click",Q),(d=document.getElementById("menu-btn"))&&d.addEventListener("click",Z),document.addEventListener("keydown",ee),document.addEventListener("keyup",et),document.addEventListener("touchstart",e=>{e.touches.length>1&&e.preventDefault()},{passive:!1}),document.addEventListener("contextmenu",e=>(e.preventDefault(),!1)),document.querySelectorAll(".menu-btn").forEach(e=>{e.addEventListener("touchstart",e=>{e.preventDefault(),e.currentTarget.classList.add("active")}),e.addEventListener("touchend",e=>{e.preventDefault(),e.currentTarget.classList.remove("active"),e.currentTarget.click()})})},document.body.appendChild(en),()=>{window.removeEventListener("resize",K),document.removeEventListener("keydown",ee),document.removeEventListener("keyup",et),document.body.removeEventListener("touchmove",i),document.body.removeChild(en),n&&n.dispose()}},[]),(0,t.jsx)("div",{className:"w-screen h-screen overflow-hidden",dangerouslySetInnerHTML:{__html:`
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
    `}})}e.s(["default",()=>o])}]);