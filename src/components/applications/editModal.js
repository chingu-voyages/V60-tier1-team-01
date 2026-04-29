export function openEditModal(app) {
  console.log("EDIT APP:", app);

  const modal = document.getElementById("edit-modal");

  modal.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl p-4">
      
      <div class="card p-6 w-full max-w-md shadow-xl">

        <h2 class="text-xl font-bold pb-4">
          Edit Application
        </h2>
        
        <label class="text-sm">Company</label>
        <input class="mt-1 w-full border p-2 rounded" value="${app.company}" />

        <label class="text-sm mt-3 block">Role</label>
        <input class="mt-1 w-full border p-2 rounded" value="${app.role}" />

        <label class="text-sm mt-3 block">Location</label>
        <input class="mt-1 w-full border p-2 rounded" value="${app.location}" />

        <label class="text-sm mt-3 block">Notes</label>
        <textarea class="mt-1 w-full h-24 border p-2 rounded">${app.notes || ""}</textarea>

        <div class="flex justify-between mt-4">

          <button id="close-button"
            class="btn">
            Cancel
          </button>

          <button id="save-button"
            class="btn">
            Save
          </button>

        </div>

      </div>
    </div>
  `;

  modal.classList.remove("hidden");

  // hide modal
  modal.querySelector("#close-button").addEventListener("click", () => {
    modal.classList.add("hidden");
  });
}