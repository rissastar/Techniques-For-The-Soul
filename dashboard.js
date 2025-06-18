const supabase = supabase.createClient(
  'https://ytgrzhtntwzefwjmhgjj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8'
);

document.addEventListener('DOMContentLoaded', async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return location.href = 'index.html';

  const user = session.user;

  // Check if patient
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'patient') {
    alert('Unauthorized. Patients only.');
    return location.href = 'index.html';
  }

  // Check for pending doctor requests
  checkDoctorRequests(user.id);
});

async function checkDoctorRequests(userId) {
  const { data: pending } = await supabase
    .from('doctor_patient_links')
    .select('id')
    .eq('patient_id', userId)
    .eq('confirmed', false);

  if (pending && pending.length > 0) {
    document.getElementById('request-badge').style.display = 'inline-block';
  }
}

async function logout() {
  await supabase.auth.signOut();
  location.href = 'index.html';
}