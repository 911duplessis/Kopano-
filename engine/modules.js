/* Service module card renderer.
   Each module is independently scoped and independently branded —
   the partner badge is visually distinct from the TCN master mark
   (see theme.css .div-partner-badge). Modules never share a merged logo. */

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function renderScopeList(scope, accent) {
  return scope.map((item) => `
    <li><span class="ck">+</span>${escapeHtml(item)}</li>
  `).join('');
}

function renderPrice(price) {
  if (!price) return '';
  return `
    <div class="div-price">
      <div>
        <div class="dp-label">${escapeHtml(price.label || '')}</div>
        ${price.note ? `<div style="font-size:11px; color:var(--muted); margin-top:2px;">${escapeHtml(price.note)}</div>` : ''}
      </div>
      <div style="text-align:right;">
        <div class="dp-val">${escapeHtml(price.value || '')}</div>
        ${price.subnote ? `<div style="font-family:'Space Mono',monospace; font-size:9px; color:var(--muted); margin-top:2px;">${escapeHtml(price.subnote)}</div>` : ''}
      </div>
    </div>
  `;
}

function renderModuleCard(mod, index) {
  const accent = mod.accentColor || '#5AB4FF';
  return `
    <div class="div-card" style="--mod-accent:${accent};">
      <div class="div-tag">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="${accent}" stroke-width="1"/><circle cx="6" cy="6" r="2" fill="${accent}"/></svg>
        Division ${String(index + 1).padStart(2, '0')}
        <div class="line"></div>
      </div>
      <div class="div-name">${escapeHtml(mod.title)}</div>
      <div class="div-partner-badge"><span class="mark"></span>${escapeHtml(mod.partner)} · Independent Execution Partner</div>
      <div class="div-body">${escapeHtml(mod.body)}</div>
      <ul class="scope">${renderScopeList(mod.scope || [], accent)}</ul>
      ${renderPrice(mod.price)}
    </div>
  `;
}

function renderModulesSection(data) {
  const cards = data.modules.map((m, i) => renderModuleCard(m, i)).join('');
  return `
    <div class="section">
      <div class="sl"><span class="num">01</span> Services Scoped</div>
      <h2 class="sh">${data.modulesHeading || 'Independent divisions.<br><em>One network.</em>'}</h2>
      <p class="sb">${escapeHtml(data.modulesIntro || '')}</p>
      <div class="division-grid">${cards}</div>
    </div>
  `;
}
