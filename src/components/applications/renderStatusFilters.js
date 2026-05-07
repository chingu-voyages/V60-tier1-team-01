 // ===== constants =====
const filters = ["All", "Applied", "Interview", "Offer", "Rejected"];
const activeBtnClasses = "bg-[#274C25] dark:bg-green-800 hover:opacity-85 dark:hover:bg-green-800 text-white";
const inactiveBtnClasses = "text-black dark:text-white hover:bg-white/40 hover:text-green-900 dark:hover:bg-white/8 dark:hover:text-green-600";
 
// renders filter buttons dynamically based on available filters
export function renderFilterButtons(activeFilter) {
  return filters.map(filter => `
    <button 
      data-filter="${filter}" 
      class="px-4 py-2 text-sm font-medium transition-colors duration-200 border-[#274C25]/15 dark:border-white/12 ${
        activeFilter === filter ? activeBtnClasses : inactiveBtnClasses
      }"
    >
      ${filter}
    </button>
  `).join('');
}