// Supabase Configuration
const SUPABASE_URL = ‘https://ytgrzhtntwzefwjmhgjj.supabase.co’;
const SUPABASE_ANON_KEY = ‘eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0Z3J6aHRudHd6ZWZ3am1oZ2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MTA4NjYsImV4cCI6MjA2NTE4Njg2Nn0.wx89qV1s1jePtZhuP5hnViu1KfPjMCnNrtUBW4bdbL8’;

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Global state
let currentUser = null;
let currentRole = ‘patient’;
let symptomData = {
cough: null,
breathing: null,
energy: null
};
let symptomChart = null;

// Initialize app
document.addEventListener(‘DOMContentLoaded’, function() {
initializeApp();
});

async function initializeApp() {
try {
// Check if user is already logged in
const { data: { user } } = await supabase.auth.getUser();
if (user) {
currentUser = user;
await loadUserDashboard();
}

```
    // Initialize chart placeholder
    initializeChart();
    
    // Load initial data
    await loadSupportPosts();
    
} catch (error) {
    console.error('Error initializing app:', error);
}
```

}

// Authentication Functions
function selectRole(role) {
currentRole = role;
document.querySelectorAll(’.role-btn’).forEach(btn => btn.classList.remove(‘selected’));
event.target.closest(’.role-btn’).classList.add(‘selected’);
}

async function login() {
const email = document.getElementById(‘loginEmail’).value;
const password = document.getElementById(‘loginPassword’).value;

```
if (!email || !password) {
    showNotification('Please enter both email and password', 'error');
    return;
}

try {
    // For demo purposes, we'll create a simple login simulation
    // In a real app, you'd use Supabase auth
    currentUser = {
        id: generateUserId(email),
        email: email,
        role: currentRole,
        name: extractNameFromEmail(email)
    };

    // Store user info
    await createOrUpdateUser(currentUser);
    
    document.getElementById('loginScreen').classList.remove('active');
    
    if (currentRole === 'patient') {
        document.getElementById('patientDashboard').classList.add('active');
        await loadPatientDashboard();
    } else {
        document.getElementById('doctorDashboard').classList.add('active');
        await loadDoctorDashboard();
    }

    showNotification('Login successful!', 'success');
    
} catch (error) {
    console.error('Login error:', error);
    showNotification('Login failed. Please try again.', 'error');
}
```

}

async function logout() {
currentUser = null;
document.querySelectorAll(’.screen’).forEach(screen => screen.classList.remove(‘active’));
document.getElementById(‘loginScreen’).classList.add(‘active’);

```
// Reset form
document.getElementById('loginEmail').value = '';
document.getElementById('loginPassword').value = '';

showNotification('Logged out successfully', 'success');
```

}

// User Management
async function createOrUpdateUser(user) {
try {
const { data, error } = await supabase
.from(‘users’)
.upsert({
id: user.id,
email: user.email,
role: user.role,
name: user.name,
updated_at: new Date().toISOString()
});

```
    if (error) throw error;
    return data;
} catch (error) {
    console.error('Error creating/updating user:', error);
}
```

}

// Dashboard Functions
async function loadPatientDashboard() {
if (!currentUser) return;

```
try {
    // Update patient name
    document.getElementById('patientName').textContent = currentUser.name;
    
    // Load patient statistics
    await loadPatientStats();
    
    // Load recent symptom logs
    await loadRecentSymptomLogs();
    
    // Load medication reminders
    await loadMedicationReminders();
    
    //
```