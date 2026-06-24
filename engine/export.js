/* Export controls — PDF via print, and a standalone shareable HTML file. */

function exportToPdf() {
  window.print();
}

function exportToHtml(filename) {
  const doc = document.documentElement.cloneNode(true);
  doc.querySelectorAll('.export-toolbar').forEach((el) => el.remove());
  const html = '<!DOCTYPE html>\n' + doc.outerHTML;
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'proposal.html';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function initExportToolbar(data) {
  const bar = document.createElement('div');
  bar.className = 'export-toolbar';
  bar.innerHTML = `
    <button id="export-pdf-btn">Export PDF</button>
    <button id="export-html-btn">Export HTML</button>
  `;
  document.body.appendChild(bar);
  document.getElementById('export-pdf-btn').addEventListener('click', exportToPdf);
  document.getElementById('export-html-btn').addEventListener('click', () => {
    const filename = `${(data && data.id) || 'proposal'}.html`;
    exportToHtml(filename);
  });
}
