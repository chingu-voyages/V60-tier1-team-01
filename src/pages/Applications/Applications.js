import { getApplications } from '../../utils/storage.js';

// ===== helpers =====
function renderApplications(applications) {
  return applications.map(app => `
    <div class="group flex items-center justify-between p-4 border rounded mb-2">
      <span>${app.company}</span>
      <span>${app.role}</span>
      <span>${app.status}</span>
      <span>${app.date}</span>
      <button class="opacity-0 group-hover:opacity-100 text-red-500" data-id="${app.id}">✕</button>
    </div>
    `).join('');
}

// ===== main =====
export async function Applications() {
  const applications = await getApplications();
  return `
    <main class="pt-20 px-6 max-w-3xl mx-auto">
      <h1>Filter by Status:</h1>
      <div class="flex gap-4 mb-6">
        <button data-filter="All">All</button>
        <button data-filter="Applied">Applied</button>
        <button data-filter="Interview">Interview</button>
        <button data-filter="Offer">Offer</button>
        <button data-filter="Rejected">Rejected</button>
      </div>
      
      <h1>Applications</h1>
      <div class="group flex items-center justify-between p-1 rounded mb-2">
        <span>Company</span>
        <span>Role</span>
        <span>Status</span>
        <span>Date</span>
        <span></span>
      </div>

      <div id="applications-list">
        ${renderApplications(applications)}
      </div>
    </main>
  `;
}

// ===== events =====
document.addEventListener("click", async (e) => {
  if (!e.target.dataset.filter) return;
  const filter = e.target.dataset.filter;
  const applications = await getApplications();

  const applicationsFiltered =
    filter === "All"
      ? applications
      : applications.filter(app =>
          app.status.toLowerCase() === filter.toLowerCase()
        );

  document.getElementById("applications-list").innerHTML = renderApplications(applicationsFiltered);
});