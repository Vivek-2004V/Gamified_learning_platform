module.exports=[71202,a=>{"use strict";var b=a.i(87924),c=a.i(72131);function d(){return(0,c.useEffect)(()=>{let a,b,c,d,e=a=>a.preventDefault();document.body.addEventListener("touchmove",e,{passive:!1});let f="menu",g="playing",h="loading",i="magnet",j=0,k=100,l=100,m=0,n=0,o=!1,p=!1,q=!1,r=!1,s=.15,t=!1,u=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),v=!1,w,x=[],y=[],z=[],A=0,B=0,C=0,D=0,E=0,F={magnet:{name:"MAGNET WARRIOR",color:26367,attackType:"MAGNETIC PULL",special:"IRON CRUSH",ultimate:"MAGNETIC STORM",description:"Controls magnetic forces - attracts metal enemies",stats:{power:8,speed:6,defense:7}},water:{name:"WATER SPIRIT",color:43775,attackType:"WATER BLAST",special:"ICE SHARD",ultimate:"TSUNAMI WAVE",description:"Controls water states - ice, liquid, steam",stats:{power:7,speed:8,defense:6}},plant:{name:"PLANT GUARDIAN",color:43520,attackType:"VINE WHIP",special:"POLLEN CLOUD",ultimate:"FOREST RAGE",description:"Grows with sunlight - weak in darkness",stats:{power:6,speed:5,defense:9}},motion:{name:"MOTION MASTER",color:0xff6600,attackType:"SPEED PUNCH",special:"TIME SLOW",ultimate:"HYPER SPEED",description:"Moves with physics - affected by friction",stats:{power:9,speed:9,defense:5}},energy:{name:"ENERGY KNIGHT",color:0xffff00,attackType:"ENERGY BOLT",special:"PLASMA BURST",ultimate:"SOLAR FLARE",description:"Uses solar power - needs sunlight",stats:{power:8,speed:7,defense:8}}},G={pollution:{name:"Pollution Monster",color:6710886,health:60,speed:.02},energy:{name:"Energy Vampire",color:0xff00ff,health:50,speed:.03},waste:{name:"Waste Golem",color:0xaa5500,health:80,speed:.015},confusion:{name:"Confusion Spirit",color:0xffff00,health:40,speed:.035}};function H(a,b){if(h===g)switch(a){case"up-btn":o=b;break;case"down-btn":p=b;break;case"left-btn":q=b;break;case"right-btn":r=b}}function I(a){if(h===g)switch(a){case"attack-btn":O();break;case"special-btn":Q();break;case"ultimate-btn":R()}}function J(a){i=a,document.querySelectorAll(".hero-card").forEach(b=>{b.classList.remove("selected"),b.dataset.hero===a&&b.classList.add("selected")}),K()}function K(){let a=F[i],b=document.getElementById("player-name");b&&(b.textContent=a.name)}function L(){let e,f,v,H,I,J,K,L,O,P,Q,R=window.THREE;if(!R)return void console.error("Three.js not loaded");(a=new R.Scene).background=new R.Color(34),(b=new R.PerspectiveCamera(60,window.innerWidth/window.innerHeight,.1,1e3)).position.set(0,15,30);let T=document.getElementById("game-canvas");if(!T)return;(c=new R.WebGLRenderer({canvas:T,antialias:!0,alpha:!0,powerPreference:"high-performance"})).setSize(window.innerWidth,window.innerHeight),c.setPixelRatio(u?1:Math.min(window.devicePixelRatio,2)),c.shadowMap.enabled=!0;let Y=new R.AmbientLight(0xffffff,.4);a.add(Y);let Z=new R.DirectionalLight(0xffffff,1);Z.position.set(10,30,15),Z.castShadow=!0,a.add(Z),f=new(e=window.THREE).Group,v=new e.CylinderGeometry(1,1,4,16),H=new e.MeshPhongMaterial({color:F[i].color,shininess:100,emissive:F[i].color,emissiveIntensity:.2}),(I=new e.Mesh(v,H)).castShadow=!0,f.add(I),J=new e.SphereGeometry(1.2,16,16),(K=new e.Mesh(J,H)).position.y=2.5,K.castShadow=!0,f.add(K),(w={mesh:f,body:I,speed:s}).mesh.position.set(0,2,0),a.add(w.mesh),O=new(L=window.THREE).PlaneGeometry(100,100,10,10),P=new L.MeshPhongMaterial({color:3355460,shininess:30,side:L.DoubleSide}),(Q=new L.Mesh(O,P)).rotation.x=-Math.PI/2,Q.position.y=-1,Q.receiveShadow=!0,a.add(Q),function(a){for(let a=0;a<3;a++)M()}(3),window.addEventListener("resize",X),d=new R.Clock,function e(){var f;requestAnimationFrame(e);let s=Math.min(d.getDelta(),.033);h===g&&h===g&&(A+=s,B+=s,C>0&&(C-=s),D>0&&(D-=s),E>0&&(E-=s),A>3&&x.length<8&&(M(),A=0),B>.5&&l<100&&(l=Math.min(100,l+2),N(),B=0),function(a){if(!w||!w.mesh)return;let b=0,c=0,d=w.speed;t&&(d*=3),o&&(c-=d*a*60),p&&(c+=d*a*60),q&&(b-=d*a*60),r&&(b+=d*a*60),w.mesh.position.x+=b,w.mesh.position.z+=c,w.mesh.position.x=Math.max(-45,Math.min(45,w.mesh.position.x)),w.mesh.position.z=Math.max(-45,Math.min(45,w.mesh.position.z)),w.mesh.position.y=2+.5*Math.sin(.003*Date.now())}(s),f=s,x.forEach((a,c)=>{let d,e,g,l,m,n,o,p;if(!a.mesh||!w||!w.mesh)return;let q=w.mesh.position.x-a.mesh.position.x,r=w.mesh.position.z-a.mesh.position.z,s=Math.sqrt(q*q+r*r);s>2&&(a.mesh.position.x+=q/s*a.speed*f*60,a.mesh.position.z+=r/s*a.speed*f*60),a.mesh.position.y=a.originalY+.5*Math.sin(.002*Date.now()+c),a.mesh.rotation.y+=f,s<2.5&&(k=Math.max(0,k-5),w.body.material.emissive.setHex(0xff0000),setTimeout(()=>{w&&w.body&&w.body.material.emissive.setHex(F[i].color)},200),d=b.position.clone(),e=0,window.THREE,function a(){(e+=.1)>1?b.position.copy(d):(b.position.x=d.x+(Math.random()-.5)*.3,b.position.y=d.y+(Math.random()-.5)*.3,b.position.z=d.z+(Math.random()-.5)*.3,requestAnimationFrame(a))}(),k<=0&&(h="game_over",(g=document.getElementById("game-hud"))&&(g.style.display="none"),(l=document.getElementById("game-canvas"))&&(l.style.display="none"),(m=document.getElementById("controls-help"))&&(m.style.display="none"),(n=document.querySelector(".mobile-controls"))&&(n.style.display="none"),(o=document.getElementById("game-over"))&&(o.style.display="flex"),(p=document.getElementById("final-score"))&&(p.textContent=`SCORE: ${j}`),W("Game Over! Final Score: "+j,"critical")),U(w.mesh.position.x,w.mesh.position.y+3,w.mesh.position.z,5),W(`Hit by ${G[a.type].name}!`,"critical"))}),function(b){for(let c=y.length-1;c>=0;c--){let d=y[c];if(window.THREE,d.mesh.position.add(d.velocity.clone().multiplyScalar(60*b)),d.distanceTraveled+=d.speed*b*60,d.mesh.rotation.x+=3*b,d.mesh.rotation.y+=3*b,d.distanceTraveled>d.maxDistance){a.remove(d.mesh),y.splice(c,1);continue}for(let b=x.length-1;b>=0;b--){let e=x[b];if(2>d.mesh.position.distanceTo(e.mesh.position)){let f=20+10*Math.random();e.health-=f,S(e.mesh.position.x,e.mesh.position.y,e.mesh.position.z),U(e.mesh.position.x,e.mesh.position.y+3,e.mesh.position.z,Math.round(f)),m++,n=Date.now(),W(`${F[i].attackType} hit for ${Math.round(f)} damage!`),a.remove(d.mesh),y.splice(c,1),e.health<=0&&(j+=100,a.remove(e.mesh),x.splice(b,1),.2>Math.random()&&V());break}}}}(s),function(b){for(let c=z.length-1;c>=0;c--){let d=z[c];d.lifetime-=b,d.lifetime<=0?(a.remove(d.mesh),z.splice(c,1)):"fire"===d.type&&(d.mesh.scale.multiplyScalar(.95),d.mesh.material.opacity*=.9)}}(s),function(a){if(!w||!w.mesh||!b)return;let c=w.mesh.position.x,d=w.mesh.position.z+25;b.position.x+=(c-b.position.x)*.05*a*60,b.position.y+=(18-b.position.y)*.05*a*60,b.position.z+=(d-b.position.z)*.05*a*60,b.lookAt(w.mesh.position.x,w.mesh.position.y+3,w.mesh.position.z)}(s),N(),Date.now()-n>3e3&&m>0&&(m=0)),c&&a&&b&&c.render(a,b)}()}function M(){let b,c,d=window.THREE,e=Object.keys(G)[Math.floor(Math.random()*Object.keys(G).length)],f=G[e],g=new d.Group,h=new d.DodecahedronGeometry(1.5,0),i=new d.MeshPhongMaterial({color:f.color,emissive:f.color,emissiveIntensity:.2,shininess:50}),j=new d.Mesh(h,i);j.castShadow=!0,g.add(j);do b=(Math.random()-.5)*40,c=(Math.random()-.5)*40;while(10>Math.abs(b)&&10>Math.abs(c))g.position.set(b,2,c);let k={mesh:g,type:e,health:f.health,maxHealth:f.health,speed:f.speed,originalY:2};x.push(k),a.add(g)}function N(){let a=document.getElementById("health-fill");a&&(a.style.width=`${k}%`);let b=document.getElementById("energy-fill");b&&(b.style.width=`${l}%`);let c=document.getElementById("health-value");c&&(c.textContent=`${Math.round(k)}%`);let d=document.getElementById("energy-value");d&&(d.textContent=`${Math.round(l)}%`);let e=document.getElementById("score-value");e&&(e.textContent=`${j}`),m>1&&W(`COMBO x${m}!`,"critical")}function O(){h!==g||l<20||C>0||(C=.3,l-=20,P(),S(w.mesh.position.x,w.mesh.position.y+2,w.mesh.position.z),W(`Used ${F[i].attackType}!`))}function P(){let b=window.THREE,c=new b.SphereGeometry(.4,8,8),d=new b.MeshBasicMaterial({color:F[i].color,transparent:!0,opacity:.9}),e=new b.Mesh(c,d);e.position.copy(w.mesh.position),e.position.y+=1;let f=new b.Vector3(0,0,-1);f.applyEuler(w.mesh.rotation),f.multiplyScalar(2),e.position.add(f),a.add(e);let g={mesh:e,velocity:f.normalize().multiplyScalar(1.5),speed:1.5,distanceTraveled:0,maxDistance:30};y.push(g)}function Q(){h!==g||l<40||D>0||(D=2,l-=40,t=!0,T(w.mesh.position.x,w.mesh.position.y,w.mesh.position.z),W(`Used ${F[i].special}!`,"heal"),setTimeout(()=>{t=!1},300))}function R(){if(h===g&&!(l<80)&&!(E>0)){E=10,l-=80;for(let a=0;a<8;a++)setTimeout(()=>{P()},100*a);T(w.mesh.position.x,w.mesh.position.y,w.mesh.position.z,3),W(`ULTIMATE: ${F[i].ultimate}!!!`,"critical")}}function S(b,c,d){let e=window.THREE,f=new e.SphereGeometry(1,8,8),g=new e.MeshBasicMaterial({color:0xff6600,transparent:!0,opacity:.7}),h=new e.Mesh(f,g);h.position.set(b,c,d),a.add(h),z.push({mesh:h,type:"fire",lifetime:.5});let i=document.createElement("div");i.className="fire-effect";let j=document.getElementById("game-container");j&&(j.getBoundingClientRect(),i.style.left=`${(b/50+1)*50}%`,i.style.top=`${(-d/50+1)*50}%`,j.appendChild(i)),setTimeout(()=>i.remove(),500)}function T(a,b,c,d=1){for(let d=0;d<10;d++)setTimeout(()=>{S(a+(Math.random()-.5)*3,b+(Math.random()-.5)*3,c+(Math.random()-.5)*3)},50*d)}function U(a,c,d,e){let f=document.createElement("div");f.className="damage-number",f.textContent=`${e}`;let g=new window.THREE.Vector3(a,c,d);g.project(b),f.style.left=`${(.5*g.x+.5)*100}%`,f.style.top=`${(-(.5*g.y)+.5)*100}%`,document.getElementById("game-container")?.appendChild(f),setTimeout(()=>f.remove(),1e3)}function V(){let a=["Magnets attract only iron, nickel, and cobalt - that's why your fridge door sticks!","Water can exist as solid ice, liquid water, or gas vapor - all H₂O!","Plants use sunlight to make food through photosynthesis - nature's solar panels!","Friction slows things down - that's why you need to push harder on rough surfaces!","The Sun gives us solar energy - it's like a giant nuclear reactor in space!"],b=a[Math.floor(Math.random()*a.length)],c=document.getElementById("science-popup"),d=document.getElementById("science-icon"),e=document.getElementById("popup-text"),f=["🔬","🧪","⚗️","🧫","⚛️","💡","🌡️","🧲"];d&&(d.textContent=f[Math.floor(Math.random()*f.length)]),e&&(e.textContent=b),c&&(c.style.display="block",c.classList.add("show"),setTimeout(()=>{c.classList.remove("show"),setTimeout(()=>{c.style.display="none"},500)},3e3))}function W(a,b=""){let c=document.getElementById("combat-log");if(!c)return;let d=document.createElement("div");for(d.className=`log-entry ${b}`,d.textContent=a,c.appendChild(d),c.scrollTop=c.scrollHeight;c.children.length>10;)c.removeChild(c.firstChild);setTimeout(()=>{d.parentNode&&d.remove()},5e3)}function X(){b&&c&&(b.aspect=window.innerWidth/window.innerHeight,b.updateProjectionMatrix(),c.setSize(window.innerWidth,window.innerHeight),u&&(b.fov=window.innerHeight>window.innerWidth?60:70,b.updateProjectionMatrix()))}function Y(){h=g;let a=document.getElementById("main-menu");a&&(a.style.display="none");let b=document.getElementById("game-hud");b&&(b.style.display="block");let c=document.getElementById("game-canvas");c&&(c.style.display="block");let d=document.querySelector(".mobile-controls"),e=document.getElementById("controls-help");v?(d&&(d.style.display="flex"),e&&(e.style.display="none")):(d&&(d.style.display="none"),e&&(e.style.display="block")),j=0,k=100,l=100,m=0,L(),W(`Welcome, ${F[i].name}!`,"heal"),W("Defeat enemies and learn science!")}function Z(){V();let a=document.getElementById("science-popup"),b=document.getElementById("popup-text"),c=v?`🎮 MOBILE CONTROLS:<br><br>
             • D-PAD → Move Hero<br>
             • ⚔️ Button → Basic Attack<br>
             • ✨ Button → Special Move<br>
             • 💥 Button → Ultimate Skill`:`🎮 DESKTOP CONTROLS:<br><br>
             • WASD / Arrow Keys → Move Hero<br>
             • SPACE → Basic Attack<br>
             • SHIFT → Special Move<br>
             • E → Ultimate Skill`;b&&(b.innerHTML=`
             ${c}<br><br>
             <strong>🎯 GAMEPLAY:</strong><br><br>
             • Defeat enemies to score points<br>
             • Chain attacks for combos<br>
             • Watch for science facts!<br>
             • Manage your energy wisely
         `),a&&(a.style.display="block",a.classList.add("show"))}function $(){let b=document.getElementById("game-over");b&&(b.style.display="none");let c=document.getElementById("game-hud");c&&(c.style.display="block");let d=document.getElementById("game-canvas");d&&(d.style.display="block");let e=document.querySelector(".mobile-controls");if(v&&e&&(e.style.display="flex"),j=0,k=100,l=100,m=0,a)for(;a.children.length>0;)a.remove(a.children[0]);x=[],y=[],z=[],L(),W("New battle started!","heal")}function _(){h=f;let a=document.getElementById("game-over");a&&(a.style.display="none");let b=document.getElementById("game-hud");b&&(b.style.display="none");let c=document.getElementById("game-canvas");c&&(c.style.display="none");let d=document.getElementById("controls-help");d&&(d.style.display="none");let e=document.querySelector(".mobile-controls");e&&(e.style.display="none");let g=document.getElementById("main-menu");g&&(g.style.display="flex")}function aa(a){if(h===g)switch(a.key.toLowerCase()){case"w":case"arrowup":o=!0;break;case"s":case"arrowdown":p=!0;break;case"a":case"arrowleft":q=!0;break;case"d":case"arrowright":r=!0;break;case" ":a.preventDefault(),O();break;case"shift":Q();break;case"e":R()}}function ab(a){switch(a.key.toLowerCase()){case"w":case"arrowup":o=!1;break;case"s":case"arrowdown":p=!1;break;case"a":case"arrowleft":q=!1;break;case"d":case"arrowright":r=!1}}let ac=document.createElement("script");return ac.src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js",ac.onload=()=>{let a,b,c,d,e,g,j;a=navigator.userAgent,(u=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a))&&(v=!0,s=.12),function(){let a=document.getElementById("floating-particles");if(a)for(let b=0;b<50;b++){let b=document.createElement("div");b.className="particle",b.style.left=`${100*Math.random()}%`,b.style.top=`${100*Math.random()}%`,b.style.animationDelay=`${20*Math.random()}s`,b.style.width=`${3*Math.random()+1}px`,b.style.height=b.style.width,b.style.background=`rgba(${255*Math.random()}, ${255*Math.random()}, 255, 0.3)`,a.appendChild(b)}}(),(b=document.getElementById("hero-carousel"))&&(b.innerHTML="",Object.entries(F).forEach(([a,c])=>{let d=document.createElement("div");d.className=`hero-card ${a===i?"selected":""}`,d.dataset.hero=a,d.innerHTML=`
                <div class="hero-icon">${({magnet:"🧲",water:"💧",plant:"🌱",motion:"🚀",energy:"⚡"})[a]||"🔥"}</div>
                <div class="hero-name">${c.name}</div>
                <div class="hero-stats">
                    <div class="stat">
                        <div>⚔️</div>
                        <div class="stat-value">${c.stats.power}</div>
                    </div>
                    <div class="stat">
                        <div>⚡</div>
                        <div class="stat-value">${c.stats.speed}</div>
                    </div>
                    <div class="stat">
                        <div>🛡️</div>
                        <div class="stat-value">${c.stats.defense}</div>
                    </div>
                </div>
            `,d.addEventListener("click",()=>J(a)),d.addEventListener("touchstart",b=>{b.preventDefault(),J(a)}),b.appendChild(d)}),K()),function(){let a=0,b=document.getElementById("loading-bar"),c=document.getElementById("loading-percentage");if(!b||!c)return;let d=setInterval(()=>{(a+=15*Math.random())>100&&(a=100),b.style.width=`${a}%`,c.textContent=`${Math.round(a)}%`,a>=100&&(clearInterval(d),setTimeout(()=>{let a=document.getElementById("loading-screen");a&&(a.style.display="none"),h=f},500))},200)}(),function(){function a(){let a=document.getElementById("orientation-warning");a&&(window.innerHeight>window.innerWidth&&u?a.style.display="flex":a.style.display="none")}a(),window.addEventListener("resize",a),window.addEventListener("orientationchange",a)}(),v&&(["up-btn","down-btn","left-btn","right-btn"].forEach(a=>{let b=document.getElementById(a);b&&(b.addEventListener("touchstart",b=>{b.preventDefault(),H(a,!0)}),b.addEventListener("touchend",b=>{b.preventDefault(),H(a,!1)}),b.addEventListener("mousedown",b=>{b.preventDefault(),H(a,!0)}),b.addEventListener("mouseup",b=>{b.preventDefault(),H(a,!1)}),b.addEventListener("mouseleave",b=>{H(a,!1)}))}),["attack-btn","special-btn","ultimate-btn"].forEach(a=>{let b=document.getElementById(a);b&&(b.addEventListener("touchstart",b=>{b.preventDefault(),I(a)}),b.addEventListener("touchend",a=>{a.preventDefault()}),b.addEventListener("mousedown",b=>{b.preventDefault(),I(a)}))})),(c=document.getElementById("start-game"))&&c.addEventListener("click",Y),(d=document.getElementById("how-to-play"))&&d.addEventListener("click",Z),(e=document.getElementById("credits"))&&e.addEventListener("click",V),(g=document.getElementById("restart-btn"))&&g.addEventListener("click",$),(j=document.getElementById("menu-btn"))&&j.addEventListener("click",_),document.addEventListener("keydown",aa),document.addEventListener("keyup",ab),document.addEventListener("touchstart",a=>{a.touches.length>1&&a.preventDefault()},{passive:!1}),document.addEventListener("contextmenu",a=>(a.preventDefault(),!1)),document.querySelectorAll(".menu-btn").forEach(a=>{a.addEventListener("touchstart",a=>{a.preventDefault(),a.currentTarget.classList.add("active")}),a.addEventListener("touchend",a=>{a.preventDefault(),a.currentTarget.classList.remove("active"),a.currentTarget.click()})})},document.body.appendChild(ac),()=>{window.removeEventListener("resize",X),document.removeEventListener("keydown",aa),document.removeEventListener("keyup",ab),document.body.removeEventListener("touchmove",e),document.body.removeChild(ac),c&&c.dispose()}},[]),(0,b.jsx)("div",{className:"w-screen h-screen overflow-hidden",dangerouslySetInnerHTML:{__html:`
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
    `}})}a.s(["default",()=>d])}];

//# sourceMappingURL=src_app_games_science_simulations_page_tsx_034cfafa._.js.map