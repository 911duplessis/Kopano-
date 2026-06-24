/* Animated network starfield background — shared across all proposals. */
function initStarfield() {
  const c = document.getElementById('stars');
  if (!c) return;
  const ctx = c.getContext('2d');

  function resize() { c.width = window.innerWidth; c.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  const stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({ x: Math.random(), y: Math.random(), r: Math.random() * 0.9 + 0.2, a: Math.random() * 0.5 + 0.1, speed: Math.random() * 0.0004 + 0.0001 });
  }

  const nodes = [];
  for (let i = 0; i < 28; i++) {
    nodes.push({ x: Math.random() * c.width, y: Math.random() * c.height, vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28, r: Math.random() * 1.8 + 0.8 });
  }

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    t += 0.005;

    stars.forEach((s) => {
      const a = s.a + Math.sin(t * s.speed * 100) * 0.08;
      ctx.beginPath();
      ctx.arc(s.x * c.width, s.y * c.height, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 210, 255, ${a})`;
      ctx.fill();
    });

    const BLUE = '46, 127, 192';
    nodes.forEach((n) => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > c.width) n.vx *= -1;
      if (n.y < 0 || n.y > c.height) n.vy *= -1;
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 220) {
          const a = (1 - dist / 220) * 0.12;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(${BLUE}, ${a})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    nodes.forEach((n) => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${BLUE}, 0.45)`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
}
