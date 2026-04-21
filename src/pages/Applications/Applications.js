import { getApplications } from '../../utils/storage.js';

// ===== state =====
let activeFilter = "All";
let viewMode = "cards";

// ===== constants =====
const filters = ["All", "Applied", "Interview", "Offer", "Rejected"];
const activeBtnClasses = "bg-green-900 text-white";
const inactiveBtnClasses = "bg-white text-gray-500 hover:bg-green-50 hover:text-green-900";

// ===== helpers =====
// returns applications filtered by status
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
      <span data-id="${app.id}" data-status="${app.status}" class="border border-transparent hover:border-gray-300 p-1 rounded">${app.status}</span>
      <span>${app.date}</span>
      <button class="opacity-0 cursor-pointer group-hover:opacity-100 text-red-500" data-delete="${app.id}">✕</button>
    </div>
    `).join('');
}

// renders filter buttons dynamically based on available filters
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

      <div class="flex justify-center mb-5">
        <label class="inline-flex items-center cursor-pointer">
          <span class="select-none text-sm font-medium text-heading">
            Cards
          </span>

          <input 
            type="checkbox" 
            id="view-toggle" 
            class="sr-only peer" 
            ${viewMode === "table" ? "checked" : ""}
          >

          <div class="relative mx-3 w-9 h-5 bg-gray-400 rounded-full
                      peer-checked:bg-green-900
                      after:content-[''] after:absolute after:top-0.5 after:left-0.5
                      after:bg-white after:rounded-full after:h-4 after:w-4
                      after:transition-all
                      peer-checked:after:translate-x-full">
          </div>

          <span class="select-none text-sm font-medium text-heading">
            Table
          </span>
        </label>
      </div>

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
export function setupApplicationFilters(onFilterChange) {
  // get all filter buttons via data-filter attribute
  const buttons = document.querySelectorAll('[data-filter]');
  const toggle = document.getElementById("view-toggle");
  
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter;
      
      // trigger UI re-render via callback
      onFilterChange();
    });
  });

  toggle.addEventListener("change", () => {
    viewMode = toggle.checked ? "table" : "cards";
    console.log(viewMode);
    onFilterChange();
  });
}