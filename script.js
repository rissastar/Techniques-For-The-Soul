const supabase = supabase || createClient(
  'https://ytgrzhtntwzefwjmhgjj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8'
);

// Modal toggles
document.getElementById('open-login').onclick = () => showModal('login');
document.getElementById('open-register').onclick = () => showModal('register');
document.getElementById('switch-to-login').onclick = () => showModal('login');
document.getElementById('switch-to-register').onclick = () => showModal('register');

function showModal(type) {
  document.getElementById('login-modal').style.display = type === 'login' ? 'flex' : 'none';
  document.getElementById('register-modal').style.display = type === 'register' ? 'flex' : 'none';
}

// Register
document.getElementById('register-btn').onclick = async () => {
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const role = document.getElementById('register-role').value;

  if (!email || !password || !role) return alert('Fill out all fields.');

  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return alert(error.message);

  await supabase.from('profiles').insert([{ id: data.user.id, role }]);
  alert('Registered! Please log in.');
  showModal('login');
};

// Login
document.getElementById('login-btn').onclick = async () => {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return alert(error.message);

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single();
  if (profile?.role === 'doctor') {
    window.location.href = 'doctor-dashboard.html';
  } else {
    window.location.href = 'patient-dashboard.html';
  }
};