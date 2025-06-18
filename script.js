const { createClient } = supabase;
const supabaseUrl = "https://ytgrzhtntwzefwjmhgjj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8";
const supabaseClient = createClient(supabaseUrl, supabaseKey);

let isLoginMode = true;

function openAuth(mode) {
  isLoginMode = mode === 'login';
  document.getElementById('modal-title').textContent = isLoginMode ? 'Login' : 'Register';
  document.getElementById('auth-switch').innerHTML = isLoginMode
    ? `Don't have an account? <span onclick="toggleAuth()">Register</span>`
    : `Already have an account? <span onclick="toggleAuth()">Login</span>`;
  document.getElementById('role-select-container').style.display = isLoginMode ? 'none' : 'block';
  document.getElementById('auth-modal').style.display = 'flex';
}

function toggleAuth() {
  openAuth(isLoginMode ? 'register' : 'login');
}

function closeModal() {
  document.getElementById('auth-modal').style.display = 'none';
}

document.getElementById('auth-submit').addEventListener('click', async () => {
  const email = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-password').value.trim();
  const role = document.getElementById('role').value;

  if (!email || !password) {
    alert("Please fill in both fields.");
    return;
  }

  try {
    if (isLoginMode) {
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) throw error;

      const user = data.user;
      if (!user) {
        alert("Login successful, but user info missing.");
        return;
      }

      const role = user.user_metadata?.role;
      if (!role) {
        alert("Role not found. Contact support.");
        return;
      }

      alert("Logged in successfully!");
      closeModal();

      if (role === 'patient') {
        window.location.href = "patient-dashboard.html";
      } else if (role === 'doctor') {
        window.location.href = "doctor-dashboard.html";
      } else {
        alert("Unrecognized role.");
      }
    } else {
      const { error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: { role }
        }
      });
      if (error) throw error;
      alert("Registered! Please check your email to confirm.");
      closeModal();
    }
  } catch (err) {
    alert("Auth error: " + err.message);
  }
});