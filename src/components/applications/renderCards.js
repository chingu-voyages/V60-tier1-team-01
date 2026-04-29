// Renders job applications as a responsive grid of cards
export function renderCards(applications) {
  return `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      ${applications.map(app => `
        <div class="card p-6 group flex flex-col mb-2">
          
          <div class="flex items-center justify-between">
            <span class="text-sm">${app.date}</span>
          </div>

          <div class="mt-3">
            <h3 class="text-2xl font-bold  mb-3">
              ${app.company}
            </h3>
            <p class="text-md ">
              ${app.role}
            </p>
            <p class="text-md ">
              Status: 
              <span 
                data-id="${app.id}" 
                data-status="${app.status}" 
                class="border border-transparent hover:border-gray-300 p-1 rounded cursor-pointer"
              >
                ${app.status}
              </span>
            </p>                    
          </div>

          <div class="flex justify-end mt-4">
            <button 
              class="border border-red-500 text-red-500 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white transition"
              data-delete="${app.id}"
            >
              Delete
            </button>   
          </div>

        </div>
      `).join('')}
    </div>
  `;
}