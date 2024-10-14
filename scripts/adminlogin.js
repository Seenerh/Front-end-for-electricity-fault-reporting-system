document.getElementById('admin-login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loadingSpinner = document.getElementById('loadingSpinner');
    const loginButton = event.target.querySelector('button[type="submit"]');

    // Show loading spinner and disable login button
    loadingSpinner.style.display = 'block';
    loginButton.disabled = true;

    try {
        // Make API request for admin login
        const response = await fetch('https://fault-reporting-backend.onrender.com/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        const data = await response.json();

        // Hide loading spinner and enable login button
        loadingSpinner.style.display = 'none';
        loginButton.disabled = false;

        if (response.ok) {
            // Handle successful login
            // Store the token (assuming you get one) in localStorage
            localStorage.setItem('adminToken', data.token); // Save the token

            // Redirect to admin home page
            window.location.href = 'adminhome.html';
        } else {
            // Handle login errors
            alert(data.message || 'Login failed. Please check your credentials and try again.');
        }
    } catch (error) {
        // Hide loading spinner on error
        loadingSpinner.style.display = 'none';
        loginButton.disabled = false;
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});
