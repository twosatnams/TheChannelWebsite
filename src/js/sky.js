const starColors = [
  '#ffffff',
  '#fffae6',
  '#e6f3ff',
  '#ffcccb',
  '#fff4b8'
];

const skyLayer = document.getElementById('sky-layer');

// Diagonal directions: top-left→bottom-right, bottom-right→top-left,
// top-right→bottom-left, bottom-left→top-right
const diagonals = [
  { dx: 300, dy: 300, angle: 225 },   // TL → BR
  { dx: -300, dy: -300, angle: 45 },   // BR → TL
  { dx: -300, dy: 300, angle: 135 },   // TR → BL
  { dx: 300, dy: -300, angle: 315 },   // BL → TR
];

function createStar(container) {
  const star = document.createElement('div');
  const color = starColors[Math.floor(Math.random() * starColors.length)];

  star.className = `star ${Math.random() > 0.9 ? 'star-large' : Math.random() < 0.6 ? 'star-small' : ''}`;
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.background = color;
  star.style.animation = `twinkle ${2 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s`;
  star.style.transform = `rotate(${Math.random() * 360}deg)`;

  container.appendChild(star);
}

function createShootingStar() {
  const star = document.createElement('div');
  star.className = 'shooting-star';

  const dir = diagonals[Math.floor(Math.random() * diagonals.length)];

  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight;

  star.style.left = `${startX}px`;
  star.style.top = `${startY}px`;

  // Rotate the tail to point opposite the travel direction
  star.style.setProperty('--tail-angle', `${dir.angle}deg`);
  star.querySelector('::before');
  star.style.cssText += `left:${startX}px;top:${startY}px;`;

  // Set tail rotation via inline style on a wrapper approach — simpler to just
  // use a CSS custom property
  star.style.setProperty('--dx', `${dir.dx}px`);
  star.style.setProperty('--dy', `${dir.dy}px`);

  // Rotate the ::before pseudo-element via the parent's transform
  star.style.transform = `rotate(${dir.angle}deg)`;

  skyLayer.appendChild(star);

  const duration = 1.2 + Math.random() * 0.5;

  requestAnimationFrame(() => {
    star.animate([
      { transform: `rotate(${dir.angle}deg) translate(0, 0)`, opacity: 1 },
      { opacity: 1, offset: 0.2 },
      { transform: `rotate(${dir.angle}deg) translate(300px, 0)`, opacity: 0 }
    ], {
      duration: duration * 1000,
      easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      fill: 'forwards'
    });
  });

  setTimeout(() => star.remove(), 2000);
}

function createNebula(container) {
  const nebula1 = document.createElement('div');
  nebula1.className = 'nebula nebula-1';
  container.appendChild(nebula1);

  const nebula2 = document.createElement('div');
  nebula2.className = 'nebula nebula-2';
  container.appendChild(nebula2);
}

// Initialize
createNebula(skyLayer);
for (let i = 0; i < 70; i++) {
  createStar(skyLayer);
}

setInterval(createShootingStar, 2000 + Math.random() * 2000);
