/**
 * Quality Management System - Dashboard Module
 * Handles dashboard UI, charts, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard components
    initCharts();
    setupNotifications();
    
    // Check if user has admin permissions
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.role === 'admin') {
        document.querySelectorAll('.admin-only').forEach(el => {
            el.style.display = 'list-item';
        });
    }
});

/**
 * Initialize dashboard charts
 */
function initCharts() {
    // Quality Metrics Chart
    const metricsChart = document.getElementById('metrics-chart');
    if (metricsChart) {
        new Chart(metricsChart, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Product Quality Index',
                        data: [92, 91, 93, 94, 95, 96],
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Process Efficiency',
                        data: [85, 86, 84, 87, 89, 91],
                        borderColor: '#27ae60',
                        backgroundColor: 'rgba(39, 174, 96, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Customer Satisfaction',
                        data: [88, 87, 90, 89, 92, 94],
                        borderColor: '#f1c40f',
                        backgroundColor: 'rgba(241, 196, 15, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                scales: {
                    y: {
                        min: 80,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // NCRs by Department Chart
    const ncrChart = document.getElementById('ncr-chart');
    if (ncrChart) {
        new Chart(ncrChart, {
            type: 'bar',
            data: {
                labels: ['Production', 'Engineering', 'Quality', 'Warehouse', 'Maintenance'],
                datasets: [
                    {
                        label: 'Critical',
                        data: [2, 1, 0, 1, 1],
                        backgroundColor: '#e74c3c'
                    },
                    {
                        label: 'Major',
                        data: [3, 2, 2, 1, 2],
                        backgroundColor: '#e67e22'
                    },
                    {
                        label: 'Minor',
                        data: [4, 3, 2, 2, 3],
                        backgroundColor: '#f1c40f'
                    },
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Number of NCRs'
                        }
                    }
                }
            }
        });
    }
}

/**
 * Setup notification interactions
 */
function setupNotifications() {
    // Mark notification as read when clicked
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(notification => {
        notification.addEventListener('click', function() {
            this.classList.remove('unread');
            updateNotificationCount();
        });
    });
    
    // View all notifications button
    const viewAllBtn = document.querySelector('.view-all');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Mark all as read
            document.querySelectorAll('.notification').forEach(notification => {
                notification.classList.remove('unread');
            });
            updateNotificationCount();
        });
    }
}

/**
 * Update the notification count badge
 */
function updateNotificationCount() {
    const unreadCount = document.querySelectorAll('.notification.unread').length;
    const countBadge = document.querySelector('.notification-count');
    
    if (countBadge) {
        countBadge.textContent = unreadCount;
        
        // Hide badge if no unread notifications
        if (unreadCount === 0) {
            countBadge.style.display = 'none';
        } else {
            countBadge.style.display = 'inline-block';
        }
    }
}

/**
 * Get the current user from session
 * Included here to avoid dependency issues
 */
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('qms_user') || sessionStorage.getItem('qms_user') || 'null');
} 