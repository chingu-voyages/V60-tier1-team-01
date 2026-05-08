const tableStyles = {
  cell: `
    whitespace-nowrap
    border-y
    border-[#274C25]/15
    dark:border-white/12
  `,

  cellLeft: `
    whitespace-nowrap
    border-y border-l
    border-[#274C25]/15
    dark:border-white/12
    rounded-l-lg
  `,

  cellRight: `
    whitespace-nowrap
    border-y border-r
    border-[#274C25]/15
    dark:border-white/12
    rounded-r-lg
  `,
};

export function renderApplications(applications) {
  return `
    <div class="w-full md:w-3/4 mx-auto mt-6">
      <!-- Scroll container for the entire table block -->
      <div class="overflow-x-auto pb-4">
        
        <!-- Table layout using separated borders for the card-style rows -->
        <table class="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr class="card font-bold">
              <th class="py-5 px-6 text-left ${tableStyles.cellLeft}">Company</th>
              <th class="py-5 px-4 text-left ${tableStyles.cell}">Role</th>
              <th class="py-5 px-5 text-left ${tableStyles.cell}">Status</th>
              <th class="py-5 px-4 text-left ${tableStyles.cell}">Date</th>
              <th class="py-5 px-6 ${tableStyles.cellRight}"></th>
            </tr>
          </thead>
          
          <tbody>
            ${applications.map(app => `
              <tr class="card group">
                <td class="py-4 px-6 ${tableStyles.cellLeft}">
                  <span class="font-medium">${app.company}</span>
                </td>
                
                <td class="py-4 px-4 ${tableStyles.cell}">
                  <span>${app.role}</span>
                </td>
                
                <td class="py-4 px-4 ${tableStyles.cell}">
                  <span
                    data-id="${app.id}"
                    data-status="${app.status}"
                    class="border border-transparent hover:border-gray-300 p-1 rounded cursor-pointer"
                  >
                    ${app.status}
                  </span>
                </td>
                
                <td class="py-4 px-4 ${tableStyles.cell}">
                  <span>${app.date}</span>
                </td>
                
                <td class="py-4 px-6 ${tableStyles.cellRight}">
                  <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <!-- Edit button -->
                    <button data-edit="${app.id}" class="hover:text-orange-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </button>
                    <!-- Delete button -->
                    <button data-delete="${app.id}" class="hover:text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}