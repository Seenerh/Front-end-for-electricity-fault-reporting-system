// Function to load report details
function loadReportDetails(reportId) {
   
    fetch('https://fault-reporting-backend.onrender.com/api/admin/reports')
        .then(response => response.json())
        .then(report => {
            // Dynamically populate report details
            document.getElementById('reportTitle').textContent = report.natureOfFault;
            document.getElementById('reportLocation').innerHTML = `${report.hostel} <br> Block ${report.block} Room ${report.roomNumber}`;
            document.getElementById('reportDescription').textContent = report.description;
            document.getElementById('reportTime').textContent = `${report.timeAgo} Ago`;

            // Populate feedback if available
            const feedbackMessage = report.feedback ? report.feedback.message : 'No feedback yet';
            const feedbackTime = report.feedback ? `${report.feedback.timeAgo} Ago` : '';
            document.getElementById('feedbackMessage').textContent = feedbackMessage;
            document.getElementById('feedbackTime').textContent = feedbackTime;
        })
        .catch(error => {
            console.error('Error loading report details:', error);
        });
}

// Function to send feedback
document.getElementById('sendBtn').addEventListener('click', function () {
    const feedbackText = document.getElementById('addFeedback').value;
    const reportId = new URLSearchParams(window.location.search).get('reportId'); // Get reportId from URL

    fetch('https://fault-reporting-backend.onrender.com/api/admin/reports/reply', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback: feedbackText }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Feedback sent successfully!');
        document.getElementById('feedbackMessage').textContent = feedbackText;
        document.getElementById('feedbackTime').textContent = 'Just now'; // You can update this dynamically based on server response
    })
    .catch(error => {
        console.error('Error sending feedback:', error);
    });
});

// On page load, fetch report details based on reportId from URL
document.addEventListener('DOMContentLoaded', function () {
    const reportId = new URLSearchParams(window.location.search).get('reportId');
    if (reportId) {
        loadReportDetails(reportId);
    }
});
