export function renderApplications(applications) {
  return `
    <div class="card flex items-center justify-between p-4 mb-2 font-bold">
      <span>Company</span>
      <span>Role</span>
      <span>Status</span>
      <span>Date</span>
      <span></span>
    </div>

    ${applications.map(app => `
      <div class="card group flex items-center justify-between p-3 mb-2">
        <span>${app.company}</span>
        <span>${app.role}</span>
        <span 
          data-id="${app.id}" 
          data-status="${app.status}" 
          class="border border-transparent hover:border-gray-300 p-1 rounded cursor-pointer"
        >
          ${app.status}
        </span>
        <span>${app.date}</span>
        <button 
          class="opacity-0 cursor-pointer group-hover:opacity-100 text-red-500" 
          data-delete="${app.id}"
        >
          ✕
        </button>
      </div>
    `).join('')}
  `;
}