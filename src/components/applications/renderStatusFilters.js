 // ===== constants =====
const filters = ["All", "Applied", "Interview", "Offer", "Rejected"];
const activeBtnClasses = "bg-green-900 text-white";
const inactiveBtnClasses = "bg-white text-gray-500 hover:bg-green-50 hover:text-green-900";
 
// renders filter buttons dynamically based on available filters
export function renderFilterButtons(activeFilter) {
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