/**
 * Quality Management System - Authentication Module
 * Handles login, registration, password recovery, and user session management
 */

// User roles and permissions
const ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    USER: 'user'
};

// Sample users (in a real application, this would be stored in a database)
const USERS = [
    {
        id: 1,
        email: 'admin@example.com',
        password: 'Admin123', // In a real app, this would be hashed
        fullName: 'Admin User',
        department: 'quality',
        role: ROLES.ADMIN,
        status: 'active',
        lastLogin: '2025-03-26 09:45'
    },
    {
        id: 2,
        email: 'user@example.com',
        password: 'User123', // In a real app, this would be hashed
        fullName: 'Regular User',
        department: 'production',
        role: ROLES.USER,
        status: 'active',
        lastLogin: '2025-03-25 14:30'
    }
];

// Permissions based on roles
const PERMISSIONS = {
    [ROLES.ADMIN]: ['read', 'write', 'delete', 'manage_users', 'manage_settings'],
    [ROLES.MANAGER]: ['read', 'write', 'limited_delete'],
    [ROLES.USER]: ['read', 'limited_write']
};

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
        
        // Password strength meter
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', updatePasswordStrength);
        }
    }

    // Reset Password Form
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', handlePasswordReset);
    }

    // Logout Button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Check if user is logged in
    checkAuthentication();
});

/**
 * Handle login form submission
 * @param {Event} e - Form submit event
 */
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember')?.checked || false;
    
    // Simple validation
    if (!email || !password) {
        showError('Email and password are required');
        return;
    }
    
    // Authenticate user
    const user = authenticateUser(email, password);
    
    if (user) {
        // Store user session
        setUserSession(user, remember);
        
        // Redirect to dashboard
        window.location.href = 'pages/dashboard.html';
    } else {
        showError('Invalid email or password');
    }
}

/**
 * Handle registration form submission
 * @param {Event} e - Form submit event
 */
function handleRegistration(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const department = document.getElementById('department').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // Simple validation
    if (!fullName || !email || !department || !password) {
        showError('All fields are required');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
    if (password.length < 8) {
        showError('Password must be at least 8 characters long');
        return;
    }
    
    // Check if user already exists
    const existingUser = USERS.find(user => user.email === email);
    if (existingUser) {
        showError('Email is already registered');
        return;
    }
    
    // Create new user (in a real app, this would be sent to a server)
    const newUser = {
        id: USERS.length + 1,
        email: email,
        password: password, // In a real app, this would be hashed
        fullName: fullName,
        department: department,
        role: ROLES.USER, // Default role for new registrations
        status: 'active',
        lastLogin: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };
    
    // Add user to the array (in a real app, this would be saved to a database)
    USERS.push(newUser);
    
    // Show success message and redirect to login
    alert('Registration successful! You can now log in.');
    window.location.href = '../index.html';
}

/**
 * Handle password reset form submission
 * @param {Event} e - Form submit event
 */
function handlePasswordReset(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    
    // Simple validation
    if (!email) {
        showError('Email is required');
        return;
    }
    
    // Check if user exists
    const user = USERS.find(user => user.email === email);
    if (!user) {
        showError('No account found with this email');
        return;
    }
    
    // Show success message (in a real app, this would send an email)
    document.getElementById('reset-success').classList.remove('hidden');
    document.getElementById('resetPasswordForm').reset();
}

/**
 * Handle user logout
 * @param {Event} e - Click event
 */
function handleLogout(e) {
    e.preventDefault();
    
    // Clear user session
    localStorage.removeItem('qms_user');
    sessionStorage.removeItem('qms_user');
    
    // Redirect to login
    window.location.href = '../index.html';
}

/**
 * Authenticate a user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {object|null} - User object if authenticated, null otherwise
 */
function authenticateUser(email, password) {
    return USERS.find(user => 
        user.email === email && 
        user.password === password &&
        user.status === 'active'
    ) || null;
}

/**
 * Store user session
 * @param {object} user - User object
 * @param {boolean} remember - Whether to remember the user
 */
function setUserSession(user, remember) {
    // Create a sanitized user object (without password)
    const sessionUser = {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        department: user.department,
        role: user.role,
        permissions: PERMISSIONS[user.role]
    };
    
    // Store in localStorage (persists even after browser close) or sessionStorage
    if (remember) {
        localStorage.setItem('qms_user', JSON.stringify(sessionUser));
    } else {
        sessionStorage.setItem('qms_user', JSON.stringify(sessionUser));
    }
    
    // Update last login time (in a real app, this would be updated in the database)
    user.lastLogin = new Date().toISOString().slice(0, 16).replace('T', ' ');
}

/**
 * Get the current user from session
 * @returns {object|null} - User object if logged in, null otherwise
 */
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('qms_user') || sessionStorage.getItem('qms_user') || 'null');
}

/**
 * Check if user has a specific permission
 * @param {string} permission - Permission to check
 * @returns {boolean} - Whether the user has the permission
 */
function hasPermission(permission) {
    const user = getCurrentUser();
    return user && user.permissions && user.permissions.includes(permission);
}

/**
 * Check if user is authenticated and authorized for the current page
 */
function checkAuthentication() {
    const user = getCurrentUser();
    const path = window.location.pathname;
    
    // Authentication pages (login, register, forgot password)
    const authPages = ['index.html', 'login.html', 'register.html', 'forgot-password.html'];
    const isAuthPage = authPages.some(page => path.includes(page));
    
    // Check if user is logged in
    if (user) {
        // Redirect to dashboard if trying to access auth pages
        if (isAuthPage) {
            window.location.href = 'pages/dashboard.html';
            return;
        }
        
        // Check for admin-only pages
        if (path.includes('user-management.html') && user.role !== ROLES.ADMIN) {
            window.location.href = 'dashboard.html';
            return;
        }
        
        // Update UI for the current user
        updateUIForUser(user);
    } else {
        // Redirect to login if not on an auth page
        if (!isAuthPage) {
            window.location.href = '../index.html';
            return;
        }
    }
}

/**
 * Update UI elements based on the current user
 * @param {object} user - Current user
 */
function updateUIForUser(user) {
    // Update username display
    const usernameElements = document.querySelectorAll('.username');
    usernameElements.forEach(el => {
        el.textContent = user.fullName;
    });
    
    // Show/hide admin-only elements
    const adminElements = document.querySelectorAll('.admin-only');
    if (user.role === ROLES.ADMIN) {
        adminElements.forEach(el => {
            el.style.display = 'block';
        });
    }
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    const nav = document.querySelector('nav');
    const sidebar = document.querySelector('.sidebar');
    
    nav.classList.toggle('show');
    sidebar.classList.toggle('show');
}

/**
 * Show error message
 * @param {string} message - Error message
 */
function showError(message) {
    alert(message); // In a real app, this would be a custom error UI
}

/**
 * Update password strength meter
 * @param {Event} e - Input event
 */
function updatePasswordStrength(e) {
    const password = e.target.value;
    const strengthMeter = document.querySelector('.strength-meter');
    const strengthText = document.querySelector('.strength-text');
    
    // Calculate password strength
    let strength = 0;
    
    // Length check
    if (password.length >= 8) {
        strength += 25;
    }
    
    // Uppercase check
    if (/[A-Z]/.test(password)) {
        strength += 25;
    }
    
    // Number check
    if (/[0-9]/.test(password)) {
        strength += 25;
    }
    
    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) {
        strength += 25;
    }
    
    // Update UI
    strengthMeter.style.width = `${strength}%`;
    
    if (strength <= 25) {
        strengthMeter.style.backgroundColor = '#e74c3c';
        strengthText.textContent = 'Weak';
    } else if (strength <= 50) {
        strengthMeter.style.backgroundColor = '#e67e22';
        strengthText.textContent = 'Moderate';
    } else if (strength <= 75) {
        strengthMeter.style.backgroundColor = '#f1c40f';
        strengthText.textContent = 'Good';
    } else {
        strengthMeter.style.backgroundColor = '#27ae60';
        strengthText.textContent = 'Strong';
    }
} 