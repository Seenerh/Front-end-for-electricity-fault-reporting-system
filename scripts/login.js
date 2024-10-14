// Adding event listener to the login form
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    const regNumber = document.getElementById('regNumber').value;
    const password = document.getElementById('password').value;
    const loadingSpinner = document.getElementById('loadingSpinner');
    const signInButton = event.target.querySelector('button[type="submit"]');

    // Show loading spinner
    loadingSpinner.style.display = 'block';
    signInButton.disabled = true; // Disable button to prevent multiple submissions

    try {
        // Making API request for login
        const response = await fetch('https://fault-reporting-backend.onrender.com/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                regNumber: regNumber,
                password: password,
            }),
        });

        const data = await response.json();

        // Hide loading spinner
        loadingSpinner.style.display = 'none';
        signInButton.disabled = false; // Re-enable button

        if (response.ok) {
            // Handle successful login
            alert('Login successful!');
            
            // Save token in localStorage
            localStorage.setItem('token', data.token); // Assuming the token is returned as `data.token`

            // Redirect to user dashboard
            window.location.href = 'userdashboard.html';
        } else {
            // Handle errors
            alert(data.message || 'Login failed. Please try again.');
        }
    } catch (error) {
        // Hide loading spinner on error
        loadingSpinner.style.display = 'none';
        signInButton.disabled = false; // Re-enable button
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});
