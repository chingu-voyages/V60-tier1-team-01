const tableRow = 'grid items-center gap-4 px-4 py-3 mb-2';
const tableCols = 'grid-cols-[2fr_2fr_1fr_1fr_2rem]';

export function renderApplications(applications) {
  return `
    <div class="w-3/4 mx-auto">
      <div class="card ${tableRow} ${tableCols} font-bold ">
        <span>Company</span>
        <span>Role</span>
        <span>Status</span>
        <span>Date</span>
        <span></span>
      </div>

      ${applications.map(app => `
        <div class="card group ${tableRow} ${tableCols}">
          <span class="break-words min-w-0">${app.company}</span>
          <span class="break-words min-w-0">${app.role}</span>
          <span
            data-id="${app.id}"
            data-status="${app.status}"
            class="border border-transparent hover:border-gray-300 p-1 rounded cursor-pointer"
          >
            ${app.status}
          </span>
          <span>${app.date}</span>
          <button
            class="opacity-0 cursor-pointer group-hover:opacity-100 text-red-500 justify-self-end"
            data-delete="${app.id}"
          >
            ✕
          </button>
        </div>
      `).join('')}
    </div>
  `;
}