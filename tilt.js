const container = document.getElementById('cardContainer');
const inner     = document.getElementById('cardInner');
const nextBtn   = document.getElementById('nextBtn');
const prevBtn   = document.getElementById('prevBtn');

const maxDeg = 15;                      // same as --maxTilt

/* TILTING -----------------------------------------------------------*/
function applyTilt(xDeg, yDeg){
  container.style.transform =
    `rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
}

/* desktop: mouse move */
container.addEventListener('mousemove', e=>{
  const r = container.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width  - 0.5;
  const y = (e.clientY - r.top ) / r.height - 0.5;
  applyTilt( y * -maxDeg, x * maxDeg);
});
container.addEventListener('mouseleave', ()=>applyTilt(0,0));

/* mobile: device orientation */
if (window.DeviceOrientationEvent){
  window.addEventListener('deviceorientation', e=>{
    const x =  e.beta  / 90;  // -90-90°
    const y =  e.gamma / 45;  // -45-45°
    applyTilt( x * maxDeg, y * maxDeg);
  });
}

/* PAGE TURN ---------------------------------------------------------*/
nextBtn.onclick = ()=>document.body.classList.add('flip');
prevBtn.onclick = ()=>document.body.classList.remove('flip');
