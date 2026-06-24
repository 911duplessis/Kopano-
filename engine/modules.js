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

function renderPriceOptions(options) {
  if (!options || !options.length) return '';
  return `
    <div class="price-options">
      ${options.map((o) => `
        <div class="price-option${o.recommended ? ' recommended' : ''}">
          ${o.recommended ? '<div class="po-badge">Recommended</div>' : ''}
          <div class="po-name">${escapeHtml(o.name)}</div>
          <ul class="po-items">${(o.items || []).map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>
          <div class="po-price">${escapeHtml(o.price)}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderAddendum(a) {
  if (!a) return '';
  return `
    <div class="addendum-card">
      <div class="ad-label">Addendum · ${escapeHtml(a.name)}</div>
      <ul class="po-items">${(a.items || []).map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>
      <div class="ad-row">
        <div class="ad-price">${escapeHtml(a.price)}</div>
        ${a.note ? `<div class="ad-note">${escapeHtml(a.note)}</div>` : ''}
      </div>
    </div>
  `;
}

function renderExtraServices(list) {
  if (!list || !list.length) return '';
  return `
    <div class="extra-services-wrap">
      <div class="es-label">Additional Capability — Available On Request</div>
      <div class="extra-services">
        ${list.map((s) => `<span class="es-chip">${escapeHtml(s.name)} <span class="es-price">${escapeHtml(s.price)}</span></span>`).join('')}
      </div>
    </div>
  `;
}

function renderZoneGrid(zones, total) {
  if (!zones || !zones.length) return '';
  return `
    <div class="zone-grid-wrap">
      <div class="es-label">Zone-By-Zone Breakdown</div>
      <div class="zone-grid">
        ${zones.map((z) => `
          <div class="zone-card">
            <div class="zone-id">${escapeHtml(z.id)}</div>
            <div class="zone-name">${escapeHtml(z.name)}</div>
            <div class="zone-spec">${escapeHtml(z.sqm)} · ${escapeHtml(z.spec)}</div>
            <div class="zone-price">${escapeHtml(z.price)}</div>
            <div class="zone-tier">${escapeHtml(z.tier)}</div>
          </div>
        `).join('')}
        ${total ? `
          <div class="zone-card zone-total">
            <div class="zone-id">Total</div>
            <div class="zone-name">${escapeHtml(total.name)}</div>
            <div class="zone-spec">${escapeHtml(total.sqm)}</div>
            <div class="zone-price">${escapeHtml(total.price)}</div>
            <div class="zone-tier">${escapeHtml(total.note || '')}</div>
          </div>
        ` : ''}
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
      ${renderPriceOptions(mod.priceOptions)}
      ${renderAddendum(mod.addendum)}
      ${renderZoneGrid(mod.zones, mod.totalPackage)}
      ${renderExtraServices(mod.extraServices)}
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
