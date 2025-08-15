/**
 * Quality Management System - User Management Module
 * Handles user management functionality for administrators
 */

// Sample users (this would be fetched from a server in a real app)
let users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        department: 'quality',
        role: 'admin',
        status: 'active',
        lastLogin: '2025-03-26 09:45'
    },
    {
        id:.2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        department: 'production',
        role: 'manager',
        status: 'active',
        lastLogin: '2025-03-25 14:30'
    },
    {
        id: 3,
        name: 'Robert Johnson',
        email: 'robert.johnson@example.com',
        department: 'engineering',
        role: 'user',
        status: 'active',
        lastLogin: '2025-03-26 11:20'
    },
    {
        id: 4,
        name: 'Lisa Wilson',
        email: 'lisa.wilson@example.com',
        department: 'quality',
        role: 'user',
        status: 'active',
        lastLogin: '2025-03-24 09:15'
    },
    {
        id: 5,
        name: 'Michael Brown',
        email: 'michael.brown@example.com',
        department: 'engineering',
        role: 'manager',
        status: 'inactive',
        lastLogin: '2025-03-20 16:45'
    }
];

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize user management UI
    setupUserManagement();
});

/**
 * Setup user management UI and interactions
 */
function setupUserManagement() {
    // Add user button
    const addUserBtn = document.getElementById('add-user-btn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', () => openUserModal());
    }
    
    // Filter elements
    setupFilters();
    
    // User action buttons
    setupUserActions();
    
    // User modal buttons
    const saveUserBtn = document.getElementById('save-user');
    if (saveUserBtn) {
        saveUserBtn.addEventListener('click', saveUser);
    }
    
    const cancelUserBtn = document.getElementById('cancel-user');
    if (cancelUserBtn) {
        cancelUserBtn.addEventListener('click', closeUserModal);
    }
    
    const closeModalBtn = document.querySelector('.close-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeUserModal);
    }
}

/**
 * Setup filter functionality
 */
function setupFilters() {
    // Search filter
    const searchInput = document.getElementById('user-search');
    if (searchInput) {
        searchInput.addEventListener('input', filterUsers);
    }
    
    // Role filter
    const roleFilter = document.getElementById('role-filter');
    if (roleFilter) {
        roleFilter.addEventListener('change', filterUsers);
    }
    
    // Department filter
    const departmentFilter = document.getElementById('department-filter');
    if (departmentFilter) {
        departmentFilter.addEventListener('change', filterUsers);
    }
    
    // Status filter
    const statusFilter = document.getElementById('status-filter');
    if (statusFilter) {
        statusFilter.addEventListener('change', filterUsers);
    }
}

/**
 * Filter users based on search and filter criteria
 */
function filterUsers() {
    const searchTerm = document.getElementById('user-search').value.toLowerCase();
    const roleFilter = document.getElementById('role-filter').value;
    const departmentFilter = document.getElementById('department-filter').value;
    const statusFilter = document.getElementById('status-filter').value;
    
    const rows = document.querySelectorAll('.users-table tbody tr');
    
    rows.forEach(row => {
        const name = row.cells[0].textContent.toLowerCase();
        const email = row.cells[1].textContent.toLowerCase();
        const department = row.cells[2].textContent.toLowerCase();
        const role = row.cells[3].textContent.toLowerCase();
        const status = row.querySelector('.badge').classList.contains('active') ? 'active' : 'inactive';
        
        // Check if row matches all filters
        const matchesSearch = name.includes(searchTerm) || email.includes(searchTerm);
        const matchesRole = roleFilter === 'all' || role === roleFilter;
        const matchesDepartment = departmentFilter === 'all' || department === departmentFilter;
        const matchesStatus = statusFilter === 'all' || status === statusFilter;
        
        // Show/hide row based on filter matches
        if (matchesSearch && matchesRole && matchesDepartment && matchesStatus) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

/**
 * Setup user action buttons
 */
function setupUserActions() {
    // Edit user buttons
    document.querySelectorAll('.edit-user').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const userId = getUserIdFromRow(row);
            openUserModal(userId);
        });
    });
    
    // Reset password buttons
    document.querySelectorAll('.reset-password').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const userName = row.cells[0].textContent;
            const userEmail = row.cells[1].textContent;
            
            if (confirm(`Reset password for ${userName} (${userEmail})?`)) {
                alert(`Password reset link has been sent to ${userEmail}`);
            }
        });
    });
    
    // Delete user buttons
    document.querySelectorAll('.delete-user').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const userName = row.cells[0].textContent;
            const userEmail = row.cells[1].textContent;
            
            if (confirm(`Are you sure you want to delete ${userName} (${userEmail})?`)) {
                // Delete user logic would go here in a real app
                row.remove();
                alert(`User ${userName} has been deleted`);
            }
        });
    });
}

/**
 * Get user ID from table row
 * @param {HTMLElement} row - Table row element
 * @returns {number} - User ID
 */
function getUserIdFromRow(row) {
    // In a real app, this would get the user ID from a data attribute
    // For this example, we'll just use the row index
    const rows = Array.from(document.querySelectorAll('.users-table tbody tr'));
    return rows.indexOf(row) + 1;
}

/**
 * Open user modal for adding or editing a user
 * @param {number} userId - User ID (optional, for editing)
 */
function openUserModal(userId) {
    const modal = document.getElementById('user-modal');
    const modalTitle = modal.querySelector('.modal-header h3');
    const form = document.getElementById('user-form');
    
    // Reset form
    form.reset();
    
    if (userId) {
        // Edit existing user
        modalTitle.textContent = 'Edit User';
        
        // Find user by ID
        const user = users.find(u => u.id === userId);
        
        if (user) {
            // Populate form
            document.getElementById('user-name').value = user.name;
            document.getElementById('user-email').value = user.email;
            document.getElementById('user-department').value = user.department;
            document.getElementById('user-role').value = user.role;
            document.getElementById('user-status').value = user.status;
            
            // Store user ID for save function
            form.dataset.userId = userId;
        }
    } else {
        // Add new user
        modalTitle.textContent = 'Add New User';
        delete form.dataset.userId;
    }
    
    // Show modal
    modal.classList.add('show');
}

/**
 * Close user modal
 */
function closeUserModal() {
    const modal = document.getElementById('user-modal');
    modal.classList.remove('show');
}

/**
 * Save user (add or update)
 */
function saveUser() {
    const form = document.getElementById('user-form');
    const userId = form.dataset.userId;
    
    // Get form values
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const department = document.getElementById('user-department').value;
    const role = document.getElementById('user-role').value;
    const status = document.getElementById('user-status').value;
    
    // Validate form
    if (!name || !email || !department || !role) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (userId) {
        // Update existing user
        alert(`User ${name} has been updated`);
    } else {
        // Add new user
        // In a real app, this would send a request to the server to create the user
        const newUser = {
            id: users.length + 1,
            name: name,
            email: email,
            department: department,
            role: role,
            status: status,
            lastLogin: 'Never'
        };
        
        // Add user to the array
        users.push(newUser);
        
        // Add user to the table
        const tbody = document.querySelector('.users-table tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${email}</td>
            <td>${department}</td>
            <td>${role}</td>
            <td><span class="badge ${status}">${status}</span></td>
            <td>Never</td>
            <td class="actions">
                <button class="btn-icon edit-user" title="Edit User"><i class="fas fa-edit"></i></button>
                <button class="btn-icon reset-password" title="Reset Password"><i class="fas fa-key"></i></button>
                <button class="btn-icon delete-user" title="Delete User"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(newRow);
        
        // Setup action buttons for new row
        setupUserActions();
        
        alert(`User ${name} has been added`);
    }
    
    // Close modal
    closeUserModal();
} 