const inputEl = document.getElementById('input');
const preview = document.getElementById('preview');
const genBtn = document.getElementById('generateBtn');
const clearBtn = document.getElementById('clearBtn');
const MEMORY_KEY = 'webai_prompts';

genBtn.addEventListener('click', generateSite);
clearBtn.addEventListener('click', clearMemory);

async function generateSite() {
  const prompt = inputEl.value.trim();
  if (!prompt) return alert("Please describe your website!");

  savePrompt(prompt);
  const memory = getMemory();

  // Compose messages
  const messages = [
    { role: 'system', content: 'Generate a complete HTML/CSS/JS website based on user instructions. Make it well-styled, functional, and self-contained.' },
    { role: 'user', content: prompt },
    { role: 'assistant', content: `Here are past user prompts:\n${memory.join('\n')}` }
  ];

  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.8,
        messages
      })
    });

    const { choices } = await resp.json();
    const htmlCode = choices[0].message.content;
    preview.srcdoc = htmlCode;

  } catch (err) {
    console.error(err);
    alert('Error generating site. Check console.');
  }
}

function savePrompt(p) {
  const arr = getMemory();
  arr.push(p);
  localStorage.setItem(MEMORY_KEY, JSON.stringify(arr));
}

function getMemory() {
  return JSON.parse(localStorage.getItem(MEMORY_KEY)) || [];
}

function clearMemory() {
  localStorage.removeItem(MEMORY_KEY);
  preview.srcdoc = '';
  alert('Memory cleared!');
}