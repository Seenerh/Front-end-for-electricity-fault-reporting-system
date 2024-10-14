// Variables to hold chart instances
let pieChart1, pieChart2, barChart;

// Function to initialize all charts
function initializeCharts() {
    // Destroy existing chart instances if they exist
    if (pieChart1) pieChart1.destroy();
    if (pieChart2) pieChart2.destroy();
    if (barChart) barChart.destroy();

    // Initialize Pie chart 1
    var ctx1 = document.getElementById('pieChart1').getContext('2d');
    pieChart1 = new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: ['Shehu Idris Hostel', 'Amina Hostel', 'Dangote Hostel'],
            datasets: [{
                data: [50, 35, 15],
                backgroundColor: ['#4B9045', '#F6BC4D', '#2F7369']
            }]
        }
    });

    // Initialize Pie chart 2
    var ctx2 = document.getElementById('pieChart2').getContext('2d');
    pieChart2 = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Replied Reports', 'Unread Reports'],
            datasets: [{
                data: [70, 30],
                backgroundColor: ['#4B9045', '#F6BC4D']
            }]
        }
    });

    // Initialize Bar chart
    var ctx3 = document.getElementById('barChart').getContext('2d');
    barChart = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Shehu Idris Hostel',
                    data: [10, 15, 20, 25, 30, 35],
                    backgroundColor: '#4B9045'
                },
                {
                    label: 'Amina Hostel',
                    data: [5, 10, 15, 20, 25, 30],
                    backgroundColor: '#F6BC4D'
                },
                {
                    label: 'Dangote Hostel',
                    data: [8, 12, 18, 24, 28, 32],
                    backgroundColor: '#2F7369'
                }
            ]
        }
    });
}

// Display the reports section by default and hide the analysis section
document.getElementById('report-section').style.display = 'block';
document.getElementById('analysis-section').style.display = 'none';

// When the Reports link is clicked
document.getElementById('report-link').addEventListener('click', function() {
    document.getElementById('report-section').style.display = 'block';  // Show the report section
    document.getElementById('analysis-section').style.display = 'none';  // Hide the analysis section
});

// When the Analysis link is clicked
document.getElementById('analysis-link').addEventListener('click', function() {
    document.getElementById('report-section').style.display = 'none';  // Hide the report section
    document.getElementById('analysis-section').style.display = 'block';  // Show the analysis section

    // Initialize charts after section is shown
    setTimeout(initializeCharts, 50);  // Delay rendering to ensure section is visible
});
