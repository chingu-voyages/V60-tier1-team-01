import { getApplications } from '../../utils/storage.js';

// ===== state =====
let activeFilter = "All";

// ===== constants =====
const filters = ["All", "Applied", "Interview", "Offer", "Rejected"];
const activeBtnClasses = "bg-green-900 text-white";
const inactiveBtnClasses = "bg-white text-gray-500 hover:bg-green-50 hover:text-green-900";

// ===== helpers =====
function filterApplications(applications, filter) {
  if (filter === "All") return applications;

  return applications.filter(app =>
    app.status.toLowerCase() === filter.toLowerCase()
  );
}

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

function renderFilterButtons() {
  return filters.map(filter => `
    <button 
      data-filter="${filter}" 
      class="px-4 py-2 text-sm font-medium transition-colors duration-200 ${
        activeFilter === filter ? activeBtnClasses : inactiveBtnClasses
      }"
    >
      ${filter}
    </button>
  `).join('');
}

// ===== main =====
export async function Applications() {
  const applications = await getApplications();
  const filteredApplications = filterApplications(applications, activeFilter);
  return `
    <main class="pt-20 px-6 max-w-3xl mx-auto">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 mb-9">
        <h3 class="text-white font-bold text-center sm:text-start">Status:</h3>
        <div class="flex overflow-hidden bg-white border divide-x rounded-lg">
          ${renderFilterButtons()}
        </div>
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
        ${renderApplications(filteredApplications)}
      </div>
    </main>
  `;
}

// ===== events =====
document.addEventListener("click", async (e) => {
  if (!e.target.dataset.filter) return;
  activeFilter = e.target.dataset.filter;
  const applications = await getApplications();
  const applicationsFiltered = filterApplications(applications, activeFilter);

  document.getElementById("applications-list").innerHTML = renderApplications(applicationsFiltered);

  document.querySelectorAll("[data-filter]").forEach(btn => {
    if (btn.dataset.filter === activeFilter) {
      btn.classList.add(...activeBtnClasses.split(" "));
      btn.classList.remove(...inactiveBtnClasses.split(" "));
    } else {
      btn.classList.remove(...activeBtnClasses.split(" "));
      btn.classList.add(...inactiveBtnClasses.split(" "));
    }
  });
});