// Common JavaScript functions for Scholarship Portal

// Dummy data for testing
const dummyData = {
    scholarships: [
        {
            id: 1,
            name: "Government Merit Scholarship",
            eligibility: "Income < 2 Lakh, 60% in 12th",
            deadline: "30 Sept 2024"
        },
        {
            id: 2,
            name: "SC/ST Scholarship",
            eligibility: "Income < 2.5 Lakh, Category certificate",
            deadline: "15 Oct 2024"
        },
        {
            id: 3,
            name: "Minority Scholarship",
            eligibility: "Income < 1 Lakh, Minority community",
            deadline: "20 Oct 2024"
        },
        {
            id: 4,
            name: "Girl Child Scholarship",
            eligibility: "Girl students, Income < 3 Lakh",
            deadline: "25 Oct 2024"
        }
    ],
    
    applications: [
        {
            id: "APP001",
            scholarship: "Government Merit Scholarship",
            student: "Rahul Sharma",
            date: "15-09-2024",
            riskScore: "Low",
            status: "Under Review"
        },
        {
            id: "APP002",
            scholarship: "SC/ST Scholarship",
            student: "Priya Patel",
            date: "16-09-2024",
            riskScore: "Medium",
            status: "Submitted"
        },
        {
            id: "APP003",
            scholarship: "Minority Scholarship",
            student: "Mohammed Khan",
            date: "17-09-2024",
            riskScore: "High",
            status: "Approved"
        }
    ]
};

// Show/hide loading spinner
function showLoading() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) spinner.style.display = 'block';
}

function hideLoading() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) spinner.style.display = 'none';
}

// Show alert message
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateAadhaar(aadhaar) {
    return /^\d{12}$/.test(aadhaar);
}

function validateMobile(mobile) {
    return /^\d{10}$/.test(mobile);
}

// Login form validation
function validateLoginForm() {
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;
    
    if (!email || !password) {
        showAlert('All fields are required!', 'error');
        return false;
    }
    
    if (!validateEmail(email)) {
        showAlert('Please enter a valid email!', 'error');
        return false;
    }
    
    return true;
}

// Registration form validation
function validateRegistrationForm() {
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;
    const role = document.getElementById('role')?.value;
    
    if (!name || !email || !password || !role) {
        showAlert('All fields are required!', 'error');
        return false;
    }
    
    if (!validateEmail(email)) {
        showAlert('Please enter a valid email!', 'error');
        return false;
    }
    
    if (password.length < 6) {
        showAlert('Password must be at least 6 characters!', 'error');
        return false;
    }
    
    // Student specific validation
    if (role === 'student') {
        const enrollment = document.getElementById('enrollment')?.value;
        const course = document.getElementById('course')?.value;
        const year = document.getElementById('year')?.value;
        const department = document.getElementById('department')?.value;
        
        if (!enrollment || !course || !year || !department) {
            showAlert('All student fields are required!', 'error');
            return false;
        }
    }
    
    // Provider specific validation
    if (role === 'provider') {
        const orgName = document.getElementById('orgName')?.value;
        if (!orgName) {
            showAlert('Organization name is required!', 'error');
            return false;
        }
    }
    
    return true;
}

// Apply form validation
function validateApplyForm() {
    const name = document.getElementById('fullName')?.value;
    const dob = document.getElementById('dob')?.value;
    const aadhaar = document.getElementById('aadhaar')?.value;
    const income = document.getElementById('income')?.value;
    const accountNo = document.getElementById('accountNo')?.value;
    
    if (!name || !dob || !aadhaar || !income || !accountNo) {
        showAlert('All fields are required!', 'error');
        return false;
    }
    
    if (!validateAadhaar(aadhaar)) {
        showAlert('Aadhaar must be 12 digits!', 'error');
        return false;
    }
    
    if (isNaN(income) || income <= 0) {
        showAlert('Please enter valid income!', 'error');
        return false;
    }
    
    return true;
}

// Load scholarships on student dashboard
function loadScholarships() {
    const container = document.getElementById('scholarshipList');
    if (!container) return;
    
    container.innerHTML = '';
    dummyData.scholarships.forEach(scholarship => {
        const card = document.createElement('div');
        card.className = 'scholarship-card';
        card.innerHTML = `
            <h3>${scholarship.name}</h3>
            <p><strong>Eligibility:</strong> ${scholarship.eligibility}</p>
            <p class="deadline"><strong>Deadline:</strong> ${scholarship.deadline}</p>
            <button class="btn btn-primary" onclick="applyForScholarship(${scholarship.id})">Apply Now</button>
        `;
        container.appendChild(card);
    });
}

// Load applications on status page
function loadApplications() {
    const tableBody = document.getElementById('applicationsTable');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    dummyData.applications.forEach(app => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${app.id}</td>
            <td>${app.scholarship}</td>
            <td>${app.date}</td>
            <td><span class="risk-score risk-${app.riskScore.toLowerCase()}">${app.riskScore}</span></td>
            <td><span class="status-badge status-${app.status.toLowerCase().replace(' ', '-')}">${app.status}</span></td>
        `;
        tableBody.appendChild(row);
    });
}

// Load clerk review applications
function loadReviewApplications() {
    const tableBody = document.getElementById('reviewTable');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    dummyData.applications.forEach(app => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${app.id}</td>
            <td>${app.student}</td>
            <td>${app.scholarship}</td>
            <td><span class="risk-score risk-${app.riskScore.toLowerCase()}">${app.riskScore}</span></td>
            <td><button class="btn btn-primary" onclick="reviewApplication('${app.id}')">Review</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// File upload handling
function setupFileUpload() {
    const uploadAreas = document.querySelectorAll('.upload-area');
    
    uploadAreas.forEach(area => {
        area.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.pdf,.jpg,.jpeg,.png';
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    showFilePreview(file, area);
                }
            };
            input.click();
        });
        
        area.addEventListener('dragover', (e) => {
            e.preventDefault();
            area.style.background = '#e9ecef';
        });
        
        area.addEventListener('dragleave', () => {
            area.style.background = '#f8f9fa';
        });
        
        area.addEventListener('drop', (e) => {
            e.preventDefault();
            area.style.background = '#f8f9fa';
            const file = e.dataTransfer.files[0];
            if (file) {
                showFilePreview(file, area);
            }
        });
    });
}

function showFilePreview(file, area) {
    const preview = document.createElement('div');
    preview.className = 'file-preview';
    preview.innerHTML = `
        <span>${file.name}</span>
        <button class="btn btn-danger btn-small" onclick="removeFile(this)">Remove</button>
    `;
    area.parentNode.insertBefore(preview, area.nextSibling);
    showAlert('File uploaded successfully!', 'success');
}

function removeFile(btn) {
    btn.parentNode.remove();
}

// Action functions
function applyForScholarship(id) {
    showLoading();
    setTimeout(() => {
        hideLoading();
        window.location.href = 'apply.html?scholarship=' + id;
    }, 1000);
}

function reviewApplication(id) {
    window.location.href = 'review_application.html?id=' + id;
}

function logout() {
    showAlert('Logged out successfully!', 'success');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load scholarships if on student dashboard
    if (document.getElementById('scholarshipList')) {
        loadScholarships();
    }
    
    // Load applications if on status page
    if (document.getElementById('applicationsTable')) {
        loadApplications();
    }
    
    // Load review applications if on clerk dashboard
    if (document.getElementById('reviewTable')) {
        loadReviewApplications();
    }
    
    // Setup file upload if on upload page
    if (document.querySelector('.upload-area')) {
        setupFileUpload();
    }
    
    // Form submission handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateLoginForm()) {
                showLoading();
                setTimeout(() => {
                    hideLoading();
                    const role = document.getElementById('role')?.value || 'student';
                    if (role === 'student') {
                        window.location.href = 'student_dashboard.html';
                    } else if (role === 'clerk') {
                        window.location.href = 'clerk_dashboard.html';
                    } else if (role === 'provider') {
                        window.location.href = 'provider_dashboard.html';
                    }
                }, 1500);
            }
        });
    }
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateRegistrationForm()) {
                showLoading();
                setTimeout(() => {
                    hideLoading();
                    showAlert('Registration successful! Please login.', 'success');
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                }, 1500);
            }
        });
    }
    
    const applyForm = document.getElementById('applyForm');
    if (applyForm) {
        applyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateApplyForm()) {
                showLoading();
                setTimeout(() => {
                    hideLoading();
                    showAlert('Application submitted successfully! Application ID: APP' + Math.floor(Math.random() * 1000), 'success');
                    setTimeout(() => {
                        window.location.href = 'application_status.html';
                    }, 2000);
                }, 1500);
            }
        });
    }
});