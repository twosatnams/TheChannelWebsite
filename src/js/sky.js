const starColors = [
  '#ffffff',
  '#fffae6',
  '#e6f3ff',
  '#ffcccb',
  '#fff4b8'
];

const skyLayer = document.getElementById('sky-layer');

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

  const startX = Math.random() * (window.innerWidth * 0.8);
  const startY = Math.random() * (window.innerHeight * 0.8);

  star.style.left = `${startX}px`;
  star.style.top = `${startY}px`;

  skyLayer.appendChild(star);

  requestAnimationFrame(() => {
    star.style.animation = `shootingStar ${1.2 + Math.random() * 0.5}s cubic-bezier(0.25, 0.1, 0.25, 1) forwards`;
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
