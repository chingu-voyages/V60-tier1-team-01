import Chart from 'chart.js/auto';
import { getApplications, getStatusHistory } from '../../utils/storage.js';

export async function initDashboard() {
  const applications = await getApplications();
  const status_history = await getStatusHistory();
  
  // 1. Get the calculated stats
  const stats = renderMetrics(applications);
  
  // 2. Pass those stats to the chart renderer
  renderChart(stats);
  renderRates(stats);
  renderConversionRates(stats, status_history);
  
  renderLatestEntry(applications);
}

function renderChart(stats) {
  const ctx = document.getElementById('myChart');
  
  // Destroy existing chart instance if it exists (prevents hover glitches)
  const existingChart = Chart.getChart(ctx);
  if (existingChart) {
    existingChart.destroy();
  }

  new Chart(ctx, {
    type: 'pie', // or 'pie' since your HTML ID says "piechart"
    data: {
      labels: ['Applied', 'Interview', 'Offer', 'Rejected'],
      datasets: [{
        label: 'Application Status',
        data: [stats.applied, stats.interview, stats.offer, stats.rejected],
        backgroundColor: ['#3b82f6', '#fbbf24', '#10b981', '#ef4444'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

function renderRates(stats) {
  const interviewRate =  stats.total ===  0 ? 0 : 
    (stats.interview / stats.total * 100).toFixed(2);
  const offerRate = stats.total === 0 ? 0 : 
    (stats.offer / stats.total * 100).toFixed(2);
  const responseRate = stats.total === 0 ? 0 : 
    ((stats.interview + stats.offer) / stats.total * 100).toFixed(2);
  
  document.getElementById('interviewRate').textContent = `${interviewRate}%`;
  document.getElementById('offerRate').textContent = `${offerRate}%`;
  document.getElementById('responseRate').textContent = `${responseRate}%`;
}


function renderConversionRates(stats, status_history) {
  const interviewedIds = new Set(status_history.filter(r => r.status === 'interview').map(r => r.application_id));
  const offeredIds = new Set(status_history.filter(r => r.status === 'offer').map(r => r.application_id));

  const appliedToInterviewRate = stats.total === 0 ? 0 :
    (interviewedIds.size / stats.total * 100).toFixed(2);
  const interviewToOfferRate = interviewedIds.size === 0 ? 0 :
    (offeredIds.size / interviewedIds.size * 100).toFixed(2);

  document.getElementById('appliedToInterviewRate').textContent = `${appliedToInterviewRate}%`;
  document.getElementById('interviewToOfferRate').textContent = `${interviewToOfferRate}%`;
}




function renderMetrics(applications) {
  const stats = {
    total: 0,
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
  };

  for (const app of applications) {
    stats.total++;
    // Ensure lowercase matching if your storage uses lowercase
    const status = app.status?.toLowerCase(); 
    if (stats.hasOwnProperty(status)) {
      stats[status]++;
    }
  }

  document.getElementById('totalapps').textContent = stats.total;
  document.getElementById('totalApplied').textContent = stats.applied;
  document.getElementById('totalInterview').textContent = stats.interview;
  document.getElementById('totalOffer').textContent = stats.offer;
  document.getElementById('totalRejected').textContent = stats.rejected;

  return stats; // Return this so the chart can use it
}
function renderLatestEntry(applications) {
    const  compEl = document.getElementById('company');
    const roleEl = document.getElementById('role');
    const dateEl = document.getElementById('date');
    const statusEl = document.getElementById('status');
    const locationEl = document.getElementById('location');

    // fallback to default values if there are no applications 
    if(applications.length === 0){
        compEl.textContent = "-";
        roleEl.textContent = "-";
        dateEl.textContent = "-";
        statusEl.textContent = "-";
        locationEl.textContent = "-";
        return;
    }
    const latest  = applications.reduce(
        (latest,curent)=> {
            return new Date(curent.created_at) > new Date(latest.created_at) ? curent : latest;
        })
    
    compEl.textContent = latest.company;
    roleEl.textContent = latest.role;
    dateEl.textContent = latest.date;
    statusEl.textContent = latest.status;
    locationEl.textContent = latest.location;
}