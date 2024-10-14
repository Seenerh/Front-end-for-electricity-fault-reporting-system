document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const regNumber = document.getElementById('regNumber').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const loadingSpinner = document.getElementById('loadingSpinner');
    const registerButton = event.target.querySelector('button[type="submit"]');

    // Check if passwords match (you can keep this for additional client-side validation)
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Show loading spinner
    loadingSpinner.style.display = 'block';
    registerButton.disabled = true; // Disable the button to prevent multiple submissions

    try {
        // Make API request for registration
        const response = await fetch('https://fault-reporting-backend.onrender.com/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                regNumber: regNumber,
                phoneNumber: phoneNumber,
                password: password,
                confirmPassword: confirmPassword, // Include confirmPassword in the request body
            }),
        });

        const responseBody = await response.text();
        console.log('Raw Response Body:', responseBody);

        let data;
        try {
            data = JSON.parse(responseBody);
        } catch (error) {
            console.error('Error parsing JSON response:', error);
        }

        // Hide loading spinner
        loadingSpinner.style.display = 'none';
        registerButton.disabled = false; // Re-enable button

        if (response.ok) {
            // Handle successful registration
            alert('Registration successful!');
            window.location.href = 'userdashboard.html'; // Redirect to user dashboard
        } else {
            // Handle errors
            alert(data ? data.message : 'Registration failed. Please try again.');
        }
    } catch (error) {
        // Hide loading spinner on error
        loadingSpinner.style.display = 'none';
        registerButton.disabled = false; // Re-enable button
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});
