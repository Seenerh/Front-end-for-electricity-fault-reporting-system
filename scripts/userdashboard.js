// Handle form submission for sending a report
document.querySelector('.report-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const natureOfFault = document.getElementById('natureOfFault').value;
    const description = document.getElementById('description').value;
    const hostel = document.getElementById('hostel').value;
    const hostelBlock = document.getElementById('hostelBlock').value;
    const roomNumber = document.querySelector('.roomNumber').value;

    // Retrieve token from localStorage
    const token = localStorage.getItem('token');
    console.log('Token retrieved for report submission:', token); // Debug log

    if (!token) {
        alert('You are not logged in. Please log in to submit reports.');
        return;
    }

    try {
        // Sending report to the backend
        const response = await fetch('https://fault-reporting-backend.onrender.com/api/fault/report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                natureOfFault: natureOfFault,
                description: description,
                hostel: hostel,
                hostelBlock: hostelBlock,
                roomNumber: roomNumber
            })
        });

        if (!response.ok) {
            throw new Error('Failed to send report');
        }

        const reportData = await response.json();

        // After successfully sending the report, add it to the right section dynamically
        const reportsList = document.querySelector('.reports-list');
        const newReport = document.createElement('div');
        newReport.classList.add('report-item');
        
        // Create the report's HTML structure
        newReport.innerHTML = `

                    <div class="report-icon">${natureOfFault.charAt(0).toUpperCase()}</div>
                    <div class="report-details">
                        <h4>${natureOfFault}</h4>
                        <p>${description}</p>
                        <p class="time">just now</p> <!-- Format this according to your backend data -->
                    </div>

        `;

        // Append the new report to the reports list
        reportsList.prepend(newReport);

        // Optionally, clear the form fields
        document.querySelector('.report-form').reset();

        alert('Report sent successfully!');
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to send report. Please try again.');
    }
});

// Function to load previous reports when the page loads
async function loadPreviousReports() {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');
    console.log('Token retrieved for loading previous reports:', token); // Debug log

    if (!token) {
        console.log('No token found. Please log in.');
        return;
    }

    try {
        const response = await fetch('https://fault-reporting-backend.onrender.com/api/fault/history', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch reports');
        }

        const reports = await response.json();
        const reportsList = document.querySelector('.reports-list');

        // Loop through each report and add it to the right section
reports.forEach(report => {
    const reportItem = document.createElement('div');
    reportItem.classList.add('report-item');
    reportItem.innerHTML = `
        <div class="report-icon">${report.natureOfFault.charAt(0).toUpperCase()}</div>
        <div class="report-details">
            <h4>${report.natureOfFault}</h4>
            <p>${report.description}</p>
            <p class="time">just now</p> 
        </div>
    `;
    
    // Add click event to each report item
    reportItem.addEventListener('click', function () {
        // Store the clicked report data in localStorage
        localStorage.setItem('selectedReport', JSON.stringify(report));
        
        // Navigate to the feed page
        window.location.href = 'feedback.html';
    });

    reportsList.appendChild(reportItem);
});


    } catch (error) {
        console.error('Error loading reports:', error);
    }
}

// Call the function to load reports when the page loads
window.onload = loadPreviousReports;
