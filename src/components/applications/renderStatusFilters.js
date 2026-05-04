 // ===== constants =====
const filters = ["All", "Applied", "Interview", "Offer", "Rejected"];
const activeBtnClasses = "bg-green-900 text-white";
const inactiveBtnClasses = "text-gray-500 dark:text-gray-400 hover:bg-white/40 hover:text-green-900 dark:hover:bg-white/10 dark:hover:text-white";
 
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