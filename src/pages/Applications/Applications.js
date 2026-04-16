import { getApplications } from '../../utils/storage.js';

// ===== state =====
let activeFilter = "All";

// ===== constants =====
const activeBtnClasses = "bg-green-900 text-white";
const inactiveBtnClasses = "bg-white text-gray-500 hover:bg-green-50 hover:text-green-900";

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
        <button 
          data-filter="All" 
          class="px-4 py-2 border rounded ${activeFilter === 'All' ? activeBtnClasses : inactiveBtnClasses}"
        >
          All
        </button>
        <button 
          data-filter="Applied" 
          class="px-4 py-2 border rounded ${activeFilter === 'Applied' ? activeBtnClasses : inactiveBtnClasses}"
        >
          Applied
        </button>
        <button 
          data-filter="Interview" 
          class="px-4 py-2 border rounded ${activeFilter === 'Interview' ? activeBtnClasses : inactiveBtnClasses}"
        >
          Interview
        </button>
        <button 
          data-filter="Offer" 
          class="px-4 py-2 border rounded ${activeFilter === 'Offer' ? activeBtnClasses : inactiveBtnClasses}"
        >
          Offer
        </button>
        <button 
          data-filter="Rejected" 
          class="px-4 py-2 border rounded ${activeFilter === 'Rejected' ? activeBtnClasses : inactiveBtnClasses}"
        >
          Rejected
        </button>
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
  activeFilter = e.target.dataset.filter;
  const applications = await getApplications();

  const applicationsFiltered =
    activeFilter === "All"
      ? applications
      : applications.filter(app =>
          app.status.toLowerCase() === activeFilter.toLowerCase()
        );

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