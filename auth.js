function toggleForms() {
    document.getElementById('login-form').classList.toggle('hidden');
    document.getElementById('register-form').classList.toggle('hidden');
}

async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        showLogoutButton();
    } else {
        alert('Login failed: ' + data.error);
    }
}

async function register() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    const response = await fetch('https://reqres.in/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
        alert('Registration successful! You can now log in.');
        toggleForms();
    } else {
        alert('Registration failed: ' + data.error);
    }
}

function logout() {
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    showLoginButton();
}

function showLogoutButton() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('logout-btn').classList.remove('hidden');
}

function showLoginButton() {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('logout-btn').classList.add('hidden');
}

// Check if user is already logged in
if (localStorage.getItem('token')) {
    showLogoutButton();
}
