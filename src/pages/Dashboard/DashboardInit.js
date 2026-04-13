import { getApplications } from '../../utils/storage.js';
export async function initDashboard() {

  const applications = await getApplications();
  renderMetrics(applications);




}

function renderMetrics(applications) {

    const stats = {
        total :0,
        applied: 0,
        interview:0,
        offer:0,
        rejected:0,
    };

    for (const app of applications){
        stats.total++;
        if(stats.hasOwnProperty(app.status)){
            stats[app.status]++;
        }
    }
    document.getElementById('totalapps').textContent = stats.total;
    document.getElementById('totalApplied').textContent = stats.applied;
    document.getElementById('totalInterview').textContent = stats.interview;
    document.getElementById('totalOffer').textContent = stats.offer;
    document.getElementById('totalRejected').textContent = stats.rejected;

}