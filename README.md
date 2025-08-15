# Quality Management System (QMS)

A responsive web-based Quality Management System built with HTML, CSS, and JavaScript. This system helps organizations manage quality processes, documents, audits, and training while ensuring compliance with quality standards.

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **User Authentication**:
  - Login/Logout functionality
  - User registration
  - Password recovery
  - Remember me option
- **Role-Based Access Control**:
  - Admin role with full system access
  - Manager role with limited permissions
  - User role with basic access
- **Dashboard**:
  - Key quality metrics visualization
  - Charts and statistics
  - Recent activities timeline
  - Quick access to important functions
- **User Management** (Admin only):
  - Add/Edit/Delete users
  - Assign roles and permissions
  - Reset user passwords
  - Filter and search users
- **Modern UI**:
  - Clean and intuitive interface
  - Interactive charts
  - Responsive tables
  - Notification system

## Pages

1. **Login Page** - System entry point with authentication
2. **Register Page** - New user registration
3. **Password Reset Page** - Forgotten password recovery
4. **Dashboard** - Overview of quality metrics and activities
5. **User Management** - User administration (Admin only)

## Technologies Used

- **HTML5** - Structure and content
- **CSS3** - Styling and responsive design
- **JavaScript** - Client-side functionality
- **Chart.js** - Interactive data visualization
- **Font Awesome** - Icons and visual elements

## Getting Started

1. Clone the repository
2. Open `index.html` in your web browser
3. **Note**: You will need to add an avatar image at `images/avatar.png` or update references to use a different image

## Demo Credentials

- **Admin User**:
  - Email: admin@example.com
  - Password: Admin123

- **Regular User**:
  - Email: user@example.com
  - Password: User123

## Project Structure

```
QualityManagementSystem/
│
├── css/
│   └── styles.css            # Main stylesheet
│
├── js/
│   ├── auth.js               # Authentication functionality
│   ├── dashboard.js          # Dashboard charts and functionality
│   └── users.js              # User management functionality
│
├── images/
│   └── avatar.png            # Default user avatar (you need to add this)
│
├── pages/
│   ├── dashboard.html        # Main dashboard
│   ├── register.html         # User registration
│   ├── forgot-password.html  # Password recovery
│   └── user-management.html  # User administration
│
├── index.html                # Login page
└── README.md                 # Project documentation
```

## Future Enhancements

- Document management system
- Audit planning and execution
- Training records management
- Nonconformance tracking
- Corrective and preventive actions
- Supplier quality management
- Integration with other business systems

## Notes

This is a front-end prototype. In a production environment, you would need:
1. A secure backend server
2. Database for data persistence
3. Proper authentication with password hashing
4. API endpoints for data operations
5. Secure session management

## License

This project is available under the MIT License. # Quan_li_minh_chung
