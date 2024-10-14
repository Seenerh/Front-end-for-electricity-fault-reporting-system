  // Function to load all user reports for admin
  async function loadAllReports() {
    try {
        const response = await fetch('https://fault-reporting-backend.onrender.com/api/admin/reports', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch reports.');
        }

        const reports = await response.json();
        const reportsContainer = document.getElementById('allReports');

        // Dynamically generate the report items
        reports.forEach(report => {
            const reportItem = document.createElement('div');
            reportItem.classList.add('report-item');
            reportItem.innerHTML = `
                <div class="report-icon">${report.natureOfFault.charAt(0).toUpperCase()}</div>
                <div class="report-details">
                    <h4>${report.natureOfFault}</h4>
                    <p class="complaint">${report.description.length > 50 ? report.description.substring(0, 50) + '...' : report.description}</p>
                    <p class="hostel">${report.hostel} - ${report.hostelBlock}</p>
                    <small>${new Date(report.createdAt).toLocaleDateString()}</small>
                </div>
                <div class="report-feedback">
    <a href="report_and_feeback.html?reportId=${report.id}" class="feedback-btn">
        <span class="material-symbols-outlined">chat</span>Chat
    </a>
</div>

            `;
            reportsContainer.appendChild(reportItem);
        });
    } catch (error) {
        console.error('Error loading reports:', error);
    }
}

// Load reports when the page loads
window.onload = loadAllReports;


// Function to fetch report data from the backend
async function updateReportCounts() {
    try {
        // Replace the URL with your actual API endpoint
        const response = await fetch('https://fault-reporting-backend.onrender.com/api/admin/reports/counts');
        const data = await response.json();

        // Update the DOM with the fetched data
        document.getElementById('unreadReports').textContent = data.unreadReports;
        document.getElementById('repliedReports').textContent = data.repliedReports;
        document.getElementById('totalReports').textContent = data.totalReports;

    } catch (error) {
        console.error('Error fetching report counts:', error);
    }
}

// Call the function when the page loads
updateReportCounts();