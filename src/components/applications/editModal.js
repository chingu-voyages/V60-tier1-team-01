export function openEditModal(app) {
  console.log("EDIT APP:", app);

  const modal = document.getElementById("edit-modal");

  modal.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl p-4">
      
      <div class="card p-6 w-full max-w-md shadow-xl">

        <h2 class="text-xl font-bold pb-4">
          Edit Application
        </h2>
        
        <div>
          <label class="text-sm">Company</label>
          <input id="company-input" class="mt-1 w-full border p-2 rounded" value="${app.company}" />
          <small class="text-red-500"></small>
        </div>
        
        <div>
          <label class="text-sm mt-3 block">Role</label>
          <input id="role-input" class="mt-1 w-full border p-2 rounded" value="${app.role}" />
          <small class="text-red-500"></small>
        </div>

        <div>
          <label class="text-sm mt-3 block">Location</label>
          <input id="location-input" class="mt-1 w-full border p-2 rounded" value="${app.location}" />
          <small class="text-red-500"></small>
        </div>

        <label class="text-sm mt-3 block">Notes</label>
        <textarea id="notes-input" class="mt-1 w-full h-24 border p-2 rounded">${app.notes || ""}</textarea>

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

  // show modal
  modal.classList.remove("hidden");

  // select input fields
  const companyInput = modal.querySelector("#company-input");
  const roleInput = modal.querySelector("#role-input");
  const locationInput = modal.querySelector("#location-input");
  const notesInput = modal.querySelector("#notes-input");

  // helper functions for validation UI
  function showError(input, message) {
    const errorElement = input.parentElement.querySelector("small");
    errorElement.textContent = message;
    input.style.border = "2px solid red";
  }

  function clearError(input) {
    const errorElement = input.parentElement.querySelector("small");
    errorElement.textContent = "";
    input.style.border = "";
  }

  // attach event listeners
  // clear validation error when user edits input
  companyInput.addEventListener("input", () => clearError(companyInput));
  roleInput.addEventListener("input", () => clearError(roleInput));
  locationInput.addEventListener("input", () => clearError(locationInput));

  // close modal on cancel button click
  modal.querySelector("#close-button").addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // handle save action for edit modal
  modal.querySelector("#save-button").addEventListener("click", ()=> {
    // collect current required form values
    const inputs = {
      company: companyInput.value.trim(),
      role: roleInput.value.trim(),
      location: locationInput.value.trim(),
    };

    // track validation state
    let isValid = true;

    // validate required fields and show errors if needed
    if (!inputs.company) {
      showError(companyInput, "Company is required");
      companyInput.value = app.company;
      isValid = false;
    }

    if (!inputs.role) {
      showError(roleInput, "Role is required");
      roleInput.value = app.role;
      isValid = false;
    }

    if (!inputs.location) {
      showError(locationInput, "Location is required");
      locationInput.value = app.location;
      isValid = false;
    }

    // stop execution if validation fails
    if (!isValid) return;

    // build updated application object
    const newApp = {
      company: inputs.company,
      role: inputs.role,
      location: inputs.location,
      notes: notesInput.value,
    };

    // log updated data (temporary step before persistence)
    console.log(newApp);

    // close modal after successful update
    modal.classList.add("hidden");
  })
}