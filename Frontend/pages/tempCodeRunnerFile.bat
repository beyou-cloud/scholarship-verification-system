<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Scholarship Verification System - Login</title>

    <!-- Google Font -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="../css/auth.css">
</head>
<body>

<div class="auth-container">
    <div class="auth-card">
        <h1 class="logo">Scholarship System</h1>
        <h2>Welcome Back</h2>
        <p class="subtitle">Login to continue</p>

        <div id="error-message" class="error-message"></div>

        <form id="loginForm">
            <div class="form-group">
                <label>Email Address</label>
                <input type="email" id="email" placeholder="example@email.com" required>
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" id="password" placeholder="Enter your password" required>
            </div>

            <button type="submit" class="primary-btn">Login</button>
        </form>

        <div class="divider"></div>

        <p class="register-text">
            Don’t have an account?
            <a href="register.html">Create Account</a>
        </p>
    </div>
</div>

<script src="../js/script.js"></script>
</body>
</html>