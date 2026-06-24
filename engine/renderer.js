/* Proposal Engine — assembles a full proposal document from a JSON
   data object. Each section is a pure function: data in, HTML string out. */

function renderCover(data) {
  const c = data.client;
  const m = data.master;
  return `
  <div class="cover">
    <svg class="orb-bg" viewBox="0 0 700 700" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="350" cy="350" r="280" stroke="#2E7FC0" stroke-width="1" opacity=".1"/>
      <circle cx="350" cy="350" r="200" stroke="#2E7FC0" stroke-width="0.8" opacity=".07"/>
      <ellipse cx="350" cy="350" rx="280" ry="80" stroke="#5AB4FF" stroke-width="1.5" transform="rotate(-30 350 350)" opacity=".12"/>
      <circle cx="560" cy="220" r="6" fill="#5AB4FF" opacity=".6"/>
      <circle cx="490" cy="500" r="3" fill="#C9A44A" opacity=".5"/>
    </svg>
    <div class="cover-top">
      <div class="tcn-mark">
        <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="27" cy="27" r="20" fill="#0C1828" stroke="#2E7FC0" stroke-width="1.2"/>
          <ellipse cx="27" cy="27" rx="20" ry="7.5" stroke="#2E7FC0" stroke-width="0.8" opacity=".5"/>
          <ellipse cx="27" cy="27" rx="28" ry="9" stroke="#5AB4FF" stroke-width="1.8" transform="rotate(-32 27 27)" opacity=".75"/>
          <circle cx="46" cy="17" r="2.8" fill="#5AB4FF"/>
        </svg>
        <div class="tcn-text">
          <div class="tcn-the">The</div>
          <div class="tcn-name">${escapeHtml(m.name.replace(/^The /, ''))}</div>
          <div class="tcn-sub">${escapeHtml(m.tagline || '')}</div>
        </div>
      </div>
      <div class="doc-info">
        <div class="doc-eyebrow">Unified Service Proposal</div>
        <div class="doc-ref">${escapeHtml(data.id)}</div>
        <div class="doc-date">${escapeHtml(data.date)}</div>
      </div>
    </div>
    <div class="cover-body">
      <div class="cover-eyebrow">Prepared for ${escapeHtml(c.name)} · ${escapeHtml(c.location)}</div>
      <h1 class="cover-title">${data.coverTitle || ''}</h1>
      <p class="cover-sub">${escapeHtml(data.coverSub || '')}</p>
      <div class="badge-row">
        ${(data.badges || []).map((b) => `<span class="badge"><span class="dot"></span>${escapeHtml(b)}</span>`).join('')}
      </div>
    </div>
    <div class="cover-foot">
      <div class="cover-contact">
        <strong>${escapeHtml(m.name)}</strong> &nbsp;·&nbsp; ${escapeHtml(m.tagline || '')}<br>
        <strong>${escapeHtml(m.contact.name)}</strong> &nbsp;·&nbsp; ${escapeHtml(m.contact.phone)} &nbsp;·&nbsp; ${escapeHtml(m.contact.email)}<br>
        ${escapeHtml(m.website)}
      </div>
      <div class="cover-tag">Confidential · ${escapeHtml(data.id)}</div>
    </div>
  </div>`;
}

function renderIntro(data) {
  const pillars = data.pillars || [];
  return `
  <div class="section">
    <div class="sl"><span class="num">00</span> The Premise</div>
    <h2 class="sh">${data.introHeading || ''}</h2>
    <p class="sb">${escapeHtml(data.introBody || '')}</p>
    <div class="unity-hero">
      <div class="unity-headline">${escapeHtml(data.unityHeadline || 'One Umbrella. All Services.')}</div>
      <div class="unity-sub">${escapeHtml(data.unitySub || '')}</div>
      <div class="unity-pillars">
        ${pillars.map((p) => `
          <div class="pillar">
            <div class="pillar-val">${escapeHtml(p.value)}</div>
            <div class="pillar-label">${escapeHtml(p.label)}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>`;
}

function renderBeforeAfter(data) {
  if (!data.beforeAfter || !data.beforeAfter.length) return '';
  return `
  <div class="section">
    <div class="sl"><span class="num">02</span> Transformation</div>
    <h2 class="sh">${data.beforeAfterHeading || 'See the<br><em>difference.</em>'}</h2>
    <p class="sb">${escapeHtml(data.beforeAfterIntro || '')}</p>
    <div class="ba-grid">
      ${data.beforeAfter.map((item) => `
        <div>
          <div class="ba-slider">
            <img class="ba-before" src="${escapeHtml(item.before)}" alt="Before">
            <img class="ba-after" src="${escapeHtml(item.after)}" alt="After">
            <span class="ba-label before">Before</span>
            <span class="ba-label after">After</span>
            <div class="ba-handle"></div>
          </div>
          ${item.caption ? `<div class="ba-caption">${escapeHtml(item.caption)}</div>` : ''}
        </div>
      `).join('')}
    </div>
  </div>`;
}

function renderOffer(data) {
  if (!data.offer) return '';
  const o = data.offer;
  return `
  <div class="section" style="border-bottom:none; padding-bottom:0;">
    <div class="sl"><span class="num">03</span> ${escapeHtml(o.sectionLabel || 'Launch Offer')}</div>
    <h2 class="sh">${o.heading || ''}</h2>
    <p class="sb">${escapeHtml(o.body || '')}</p>
    <div class="landmark">
      <div class="lm-eyebrow">${escapeHtml(o.eyebrow || '')}</div>
      <h3 class="lm-title">${o.title || ''}</h3>
      <p class="lm-body">${escapeHtml(o.intro || '')}</p>
      <div class="lm-row">
        ${(o.items || []).map((i) => `
          <div class="lm-item">
            <div class="lm-item-label">${escapeHtml(i.label)}</div>
            <div class="lm-item-val">${escapeHtml(i.value)}</div>
            <div class="lm-item-desc">${escapeHtml(i.desc)}</div>
          </div>
        `).join('')}
      </div>
      <div class="lm-disclaimer">${o.disclaimer || ''}</div>
    </div>
  </div>`;
}

function renderInvestment(data) {
  const inv = data.investment;
  if (!inv) return '';
  return `
  <div class="section" style="padding: 64px 0 0;">
    <div class="sl" style="padding: 0 64px;"><span class="num">04</span> Investment Summary</div>
  </div>
  <div class="total-section">
    <table class="total-table">
      ${inv.lines.map((l) => `
        <tr>
          <td>
            <div class="tt-name">${escapeHtml(l.name)}</div>
            <div class="tt-desc">${l.desc || ''}</div>
          </td>
          <td class="tt-type">${escapeHtml(l.type)}</td>
          <td class="tt-price" style="${l.strike ? 'text-decoration:line-through; color:var(--muted);' : `color:${l.color || 'var(--silver)'};`}">${escapeHtml(l.price)}</td>
        </tr>
      `).join('')}
    </table>
  </div>
  <div class="gt-bar">
    <div class="gt-left">
      <div class="gt-label">${escapeHtml(inv.totalLabel || 'Month One — All-In')}</div>
      <div class="gt-sub">${escapeHtml(inv.totalSub || '')}</div>
    </div>
    <div style="text-align:right;">
      <div class="gt-total">${escapeHtml(inv.totalValue)}</div>
      <div class="gt-note">${escapeHtml(inv.totalNote || '')}</div>
    </div>
  </div>`;
}

function renderTerms(data) {
  if (!data.terms || !data.terms.length) return '';
  return `
  <div class="terms-grid">
    ${data.terms.map((t) => `
      <div class="term">
        <div class="term-label">${escapeHtml(t.label)}</div>
        <div class="term-val">${escapeHtml(t.value)}</div>
        <div class="term-desc">${escapeHtml(t.desc)}</div>
      </div>
    `).join('')}
  </div>`;
}

function renderClosing(data) {
  const cl = data.closing || {};
  const m = data.master;
  return `
  <div class="closing">
    <div class="closing-pre">${escapeHtml(m.name)} · ${escapeHtml(data.id)}</div>
    <h2 class="closing-title">${cl.title || ''}</h2>
    <p class="closing-sub">${escapeHtml(cl.sub || '')}</p>
    <div class="cta-row">
      <a class="cta cta-primary" href="tel:${escapeHtml((m.contact.phone || '').replace(/\s/g, ''))}">Call ${escapeHtml(m.contact.name)} — ${escapeHtml(m.contact.phone)}</a>
      <a class="cta cta-gold" href="${escapeHtml(m.contact.whatsapp || '#')}" target="_blank">WhatsApp Now</a>
      <a class="cta cta-outline" href="mailto:${escapeHtml(m.contact.email)}">Send Email</a>
    </div>
    <div class="closing-contact">
      <strong>${escapeHtml(m.name)}</strong>
      <span class="divider-dot">·</span>
      ${escapeHtml(m.contact.email)}
      <span class="divider-dot">·</span>
      ${escapeHtml(m.website)}
    </div>
  </div>`;
}

/* Brand separation footer — lists each execution partner as an
   independent mark; TCN appears only as the coordinating layer beneath. */
function renderBrandFooter(data) {
  const seen = new Set();
  const partners = data.modules.filter((m) => {
    if (seen.has(m.partner)) return false;
    seen.add(m.partner);
    return true;
  });
  return `
  <div class="brand-footer">
    <div class="bf-label">Independently Delivered By</div>
    <div class="bf-partners">
      ${partners.map((m) => {
        const accent = m.accentColor || '#A8BDD0';
        const inner = `
          <div class="bf-mark" style="border-color:${accent}; color:${accent};">${escapeHtml(m.partner[0])}</div>
          <div class="bf-name">${escapeHtml(m.partner)}</div>
          ${m.deckUrl ? '<div class="bf-view">View Proposal &rarr;</div>' : ''}
        `;
        return m.deckUrl
          ? `<a class="bf-partner bf-partner-link" href="${escapeHtml(m.deckUrl)}" target="_blank" rel="noopener">${inner}</a>`
          : `<div class="bf-partner">${inner}</div>`;
      }).join('')}
    </div>
    <div class="bf-powered">Powered under <strong>${escapeHtml(data.master.name)}</strong></div>
  </div>`;
}

function renderProposal(data) {
  return `
    ${renderCover(data)}
    <div class="wrap">
      ${renderIntro(data)}
      ${renderModulesSection(data)}
      ${renderBeforeAfter(data)}
      ${renderOffer(data)}
    </div>
    ${renderInvestment(data)}
    <div class="wrap">
      ${renderTerms(data)}
      ${renderClosing(data)}
      ${renderBrandFooter(data)}
    </div>
  `;
}

function mountProposal(data, rootEl) {
  rootEl.innerHTML = renderProposal(data);
  document.title = `${data.master.name} — ${data.client.name} Proposal`;
  initBeforeAfterSliders(rootEl);
}
