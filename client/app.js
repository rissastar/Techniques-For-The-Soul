const MEMORY_KEY = 'webai_memory';
const input = document.getElementById('input');
const generateBtn = document.getElementById('generate');
const clearBtn = document.getElementById('clear');
const preview = document.getElementById('preview');

generateBtn.onclick = async () => {
  const prompt = input.value.trim();
  if (!prompt) return alert('Describe something!');
  savePrompt(prompt);

  const messages = [
    { role: 'system', content: 'Generate full HTML/CSS/JS...' },
    { role: 'user', content: prompt },
    { role: 'assistant', content: 'Memory:\n' + getMemory().join('\n') }
  ];

  const res = await fetch('http://localhost:3000/chat', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ messages })
  });
  const data = await res.json();
  const html = data.choices[0].message.content;
  preview.srcdoc = html;
};

clearBtn.onclick = () => {
  localStorage.removeItem(MEMORY_KEY);
  preview.srcdoc = '';
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