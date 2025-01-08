// Store user data
let users = JSON.parse(localStorage.getItem('users')) || [];
const isAuthenticated = () => localStorage.getItem('currentUser') !== null;

// Redirect to main page if already logged in
if (isAuthenticated() && window.location.pathname === '/index.html') {
    window.location.href = 'events.html';
}

function toggleForms() {
    document.getElementById('loginForm').classList.toggle('hidden');
    document.getElementById('signupForm').classList.toggle('hidden');
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'events.html';
    } else {
        alert('Invalid email or password');
    }
}

function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const mobile = document.getElementById('signup-mobile').value;
    const password = document.getElementById('signup-password').value;

    if (users.some(u => u.email === email)) {
        alert('Email already registered');
        return false;
    }

    const newUser = { name, email, mobile, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    window.location.href = 'events.html';
}