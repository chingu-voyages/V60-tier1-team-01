import { getApplications } from '../../utils/storage.js';
export async function initDashboard() {

  const applications = await getApplications();
  renderMetrics(applications);
    renderLatestEntry(applications);




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
            return new Date(curent.createdAt) > new Date(latest.createdAt) ? curent : latest;
        })
    
    compEl.textContent = latest.company;
    roleEl.textContent = latest.role;
    dateEl.textContent = latest.date;
    statusEl.textContent = latest.status;
    locationEl.textContent = latest.location;
}