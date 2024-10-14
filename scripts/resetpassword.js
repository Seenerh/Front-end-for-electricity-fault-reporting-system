document.getElementById('reset-password-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const phoneNumber = document.getElementById('phoneNumber').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const loadingSpinner = document.getElementById('loadingSpinner');
    const resetButton = event.target.querySelector('button[type="submit"]');

    // Check if passwords match
    if (newPassword !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Show loading spinner and disable reset button
    loadingSpinner.style.display = 'block';
    resetButton.disabled = true;

    try {
        // Make API request for resetting the password
        const response = await fetch('https://fault-reporting-backend.onrender.com/api/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumber: phoneNumber,
                newPassword: newPassword,
            }),
        });

        const data = await response.json();

        // Hide loading spinner and enable reset button
        loadingSpinner.style.display = 'none';
        resetButton.disabled = false;

        if (response.ok) {
            // Handle successful password reset
            alert('Password reset successful!');
            window.location.href = 'login.html'; // Redirect to login page
        } else {
            // Handle errors
            alert(data.message || 'Password reset failed. Please try again.');
        }
    } catch (error) {
        // Hide loading spinner on error
        loadingSpinner.style.display = 'none';
        resetButton.disabled = false;
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});
