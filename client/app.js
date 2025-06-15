const MEMORY_KEY = 'webai_memory';
const input = document.getElementById('input');
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('previewTab');
const htmlTab = document.getElementById('htmlTab');
const cssTab = document.getElementById('cssTab');
const jsTab = document.getElementById('jsTab');

document.getElementById('generate').onclick = async () => {
  const prompt = input.value.trim();
  if (!prompt) return alert('Describe something!');
  savePrompt(prompt);

  // Read uploaded files
  const uploadedText = await readFiles(fileInput.files);
  const memory = getMemory();

  const messages = [
    { role: 'system', content: 'You are an expert web designer AI. Generate full HTML/CSS/JS code from description + uploaded base.' },
    { role: 'user', content: `User prompt: ${prompt}\nUploaded Files:\n${uploadedText}` },
    { role: 'assistant', content: 'Memory:\n' + memory.join('\n') }
  ];

  const res = await fetch('http://localhost:3000/chat', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ messages })
  });

  const data = await res.json();
  const html = data.choices[0].message.content;

  preview.srcdoc = html;

  // Try to separate parts
  htmlTab.textContent = html.match(/<html[\s\S]*?<\/html>/i)?.[0] || "No HTML found";
  cssTab.textContent = html.match(/<style[\s\S]*?<\/style>/i)?.[0] || "No CSS found";
  jsTab.textContent = html.match(/<script[\s\S]*?<\/script>/i)?.[0] || "No JS found";
};

document.getElementById('clear').onclick = () => {
  localStorage.removeItem(MEMORY_KEY);
  alert('Memory cleared!');
};

function savePrompt(p) {
  const arr = getMemory();
  arr.push(p);
  localStorage.setItem(MEMORY_KEY, JSON.stringify(arr));
}

function getMemory() {
  return JSON.parse(localStorage.getItem(MEMORY_KEY)) || [];
}

async function readFiles(files) {
  const promises = Array.from(files).map(file => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(`--- ${file.name} ---\n${reader.result}`);
      reader.readAsText(file);
    });
  });
  return (await Promise.all(promises)).join('\n\n');
}

function switchTab(tab) {
  preview.classList.add('hidden');
  htmlTab.classList.add('hidden');
  cssTab.classList.add('hidden');
  jsTab.classList.add('hidden');
  document.getElementById(tab + 'Tab').classList.remove('hidden');
}