import { getApplications } from '../../utils/storage.js';
import { renderCards } from '../../components/applications/renderCards.js';
import { renderApplications } from '../../components/applications/renderTable.js';
import { renderFilterButtons } from '../../components/applications/renderStatusFilters.js';
import { renderViewToggle } from '../../components/applications/renderViewToggle.js';

// ===== state =====
let activeFilter = "All";
let viewMode = "cards";

// ===== helpers =====
// returns applications filtered by status
function filterApplications(applications, filter) {
  if (filter === "All") return applications;

  return applications.filter(app =>
    app.status.toLowerCase() === filter.toLowerCase()
  );
}

// ===== main =====
export async function Applications() {
  const applications = await getApplications();
  const filteredApplications = filterApplications(applications, activeFilter);
  return `
    <main class="pt-20 px-6 max-w-6xl mx-auto">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 mb-9">
        <h3 class="text-white font-bold text-center sm:text-start">Status:</h3>
        <div class="flex overflow-hidden bg-white border divide-x rounded-lg">
          ${renderFilterButtons(activeFilter)}
        </div>
      </div>

      <h1 class="text-center">Applications</h1>

      ${renderViewToggle(viewMode)}

      <div id="applications-list">
        ${viewMode === "cards" 
          ? renderCards(filteredApplications) 
          : renderApplications(filteredApplications)
        }
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