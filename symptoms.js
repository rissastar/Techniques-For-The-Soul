const supabase = createClient(
  'https://ytgrzhtntwzefwjmhgjj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8'
);

document.addEventListener('DOMContentLoaded', async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return window.location.href = 'index.html';

  const user = session.user;

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'patient') {
    alert('Access restricted to patients.');
    return window.location.href = 'index.html';
  }

  const form = document.getElementById('symptom-form');
  const logList = document.getElementById('log-list');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const symptom = document.getElementById('symptom').value;
    const severity = parseInt(document.getElementById('severity').value);
    const notes = document.getElementById('notes').value;

    const { error } = await supabase.from('symptoms').insert({
      user_id: user.id,
      symptom,
      severity,
      notes
    });

    if (error) {
      alert('Failed to log symptom.');
      console.error(error);
    } else {
      form.reset();
      loadLogs();
    }
  });

  async function loadLogs() {
    const { data, error } = await supabase
      .from('symptoms')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    logList.innerHTML = '';
   const labels = [];
const severityData = [];

data.forEach((log) => {
  labels.push(new Date(log.created_at).toLocaleDateString());
  severityData.push(log.severity);
});
    data.forEach((log) => {
      const item = document.createElement('li');
      item.innerHTML = `
        <strong>${new Date(log.created_at).toLocaleString()}</strong>: 
        ${log.symptom} (Severity: ${log.severity})
        ${log.notes ? `<br>📝 ${log.notes}` : ''}
      `;
      logList.appendChild(item);
    });
  }

  loadLogs();
});