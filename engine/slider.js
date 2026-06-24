/* Before/After image comparison slider — supports multiple instances per page. */
class BeforeAfterSlider {
  constructor(el) {
    this.el = el;
    this.handle = el.querySelector('.ba-handle');
    this.after = el.querySelector('.ba-after');
    this.dragging = false;
    this.onDown = this.onDown.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onUp = this.onUp.bind(this);
    this.handle.addEventListener('mousedown', this.onDown);
    this.handle.addEventListener('touchstart', this.onDown, { passive: true });
    window.addEventListener('mousemove', this.onMove);
    window.addEventListener('touchmove', this.onMove, { passive: false });
    window.addEventListener('mouseup', this.onUp);
    window.addEventListener('touchend', this.onUp);
    this.el.addEventListener('click', (e) => this.setFromEvent(e));
  }
  onDown() { this.dragging = true; }
  onUp() { this.dragging = false; }
  onMove(e) {
    if (!this.dragging) return;
    if (e.touches) e.preventDefault();
    this.setFromEvent(e);
  }
  setFromEvent(e) {
    const point = e.touches ? e.touches[0] : e;
    const rect = this.el.getBoundingClientRect();
    let pct = ((point.clientX - rect.left) / rect.width) * 100;
    pct = Math.max(0, Math.min(100, pct));
    this.handle.style.left = pct + '%';
    this.after.style.clipPath = `inset(0 0 0 ${pct}%)`;
  }
}

function initBeforeAfterSliders(root = document) {
  root.querySelectorAll('.ba-slider').forEach((el) => new BeforeAfterSlider(el));
}
