const supabase = supabase || createClient(
  'https://ytgrzhtntwzefwjmhgjj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...L8' // full anon key here
);

document.addEventListener('DOMContentLoaded', async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return (window.location.href = 'index.html');

  const user = session.user;
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  const role = profile?.role;

  if (!role) {
    alert("Profile role missing.");
    return window.location.href = 'index.html';
  }

  const path = window.location.pathname;

  if (path.includes("doctor-dashboard") && role !== "doctor") {
    alert("Access denied. Doctors only.");
    return window.location.href = 'index.html';
  }

  if (path.includes("patient-dashboard") && role !== "patient") {
    alert("Access denied. Patients only.");
    return window.location.href = 'index.html';
  }

  document.getElementById('user-email').textContent = user.email;
  document.getElementById('user-role').textContent = role;

  document.getElementById('logout-btn').addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.href = 'index.html';
  });
});