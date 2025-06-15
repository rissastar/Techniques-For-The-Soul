function showTab(tab) {
  document.getElementById('htmlOutput').classList.add('hidden');
  document.getElementById('cssOutput').classList.add('hidden');
  document.getElementById('jsOutput').classList.add('hidden');
  document.getElementById('livePreview').classList.add('hidden');
  if (tab === 'html') document.getElementById('htmlOutput').classList.remove('hidden');
  if (tab === 'css') document.getElementById('cssOutput').classList.remove('hidden');
  if (tab === 'js') document.getElementById('jsOutput').classList.remove('hidden');
  if (tab === 'preview') {
    const html = document.getElementById('htmlOutput').innerText;
    const css = document.getElementById('cssOutput').innerText;
    const js = document.getElementById('jsOutput').innerText;
    const previewFrame = document.getElementById('livePreview');
    const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
    doc.open();
    doc.write(`
      <html><head><style>${css}</style></head>
      <body>${html}<script>${js}<\/script></body></html>
    `);
    doc.close();
    previewFrame.classList.remove('hidden');
  }
}

document.getElementById('generateBtn').addEventListener('click', () => {
  const prompt = document.getElementById('promptInput').value;
  // Fake AI generation logic (placeholder)
  const html = "<h1>Welcome</h1><p>This is your AI-built website.</p>";
  const css = "body { font-family: Arial; background: #f0f0f0; color: #333; }";
  const js = "console.log('Website loaded');";

  document.getElementById('htmlOutput').innerText = html;
  document.getElementById('cssOutput').innerText = css;
  document.getElementById('jsOutput').innerText = js;

  localStorage.setItem('htmlOutput', html);
  localStorage.setItem('cssOutput', css);
  localStorage.setItem('jsOutput', js);
});

window.onload = () => {
  document.getElementById('htmlOutput').innerText = localStorage.getItem('htmlOutput') || "";
  document.getElementById('cssOutput').innerText = localStorage.getItem('cssOutput') || "";
  document.getElementById('jsOutput').innerText = localStorage.getItem('jsOutput') || "";
};