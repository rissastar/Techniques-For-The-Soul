const supabase = createClient(
  'https://ytgrzhtntwzefwjmhgjj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8'
);

let chart; // store the Chart.js instance

document.addEventListener('DOMContentLoaded', async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return window.location.href = 'index.html';

  const user = session.user;

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'doctor') {
    alert('Access denied. Doctors only.');
    return window.location.href = 'index.html';
  }

  const { data: links } = await supabase
    .from('doctor_patient_links')
    .select('patient_id');

  const patientIds = links.map(link => link.patient_id);

  const { data: patients } = await supabase
    .from('profiles')
    .select('id, email')
    .in('id', patientIds);

  const select = document.getElementById('patient-select');
  select.innerHTML = '<option value="">-- Choose a Patient --</option>';
  patients.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = p.email;
    select.appendChild(opt);
  });

  select.addEventListener('change', () => {
    const selectedId = select.value;
    if (selectedId) loadSymptoms(selectedId);
  });
});

async function loadSymptoms(patientId) {
  const { data, error } = await supabase
    .from('symptoms')
    .select('*')
    .eq('user_id', patientId)
    .order('created_at', { ascending: false });

  const logList = document.getElementById('log-list');
  logList.innerHTML = '';

  const labels = [], severityData = [];

  data.forEach((log) => {
    const item = document.createElement('li');
    item.innerHTML = `<strong>${new Date(log.created_at).toLocaleString()}</strong>: 
      ${log.symptom} (Severity: ${log.severity}) 
      ${log.notes ? `<br>📝 ${log.notes}` : ''}`;
    logList.appendChild(item);

    labels.unshift(new Date(log.created_at).toLocaleDateString());
    severityData.unshift(log.severity);
  });

  const ctx = document.getElementById('severityChart').getContext('2d');
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Symptom Severity',
        data: severityData,
        borderColor: '#36a2eb',
        backgroundColor: 'rgba(54,162,235,0.2)',
        tension: 0.3,
        pointRadius: 4
      }]
    },
    options: {
      scales: {
        y: {
          min: 0,
          max: 10,
          title: { display: true, text: 'Severity' }
        },
        x: {
          title: { display: true, text: 'Date' }
        }
      }
    }
  });
}