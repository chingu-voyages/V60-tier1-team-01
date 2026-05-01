import { validateRequired, validateText, validateNotes } from "../../utils/validation";
import { showError, clearError } from "../../utils/formUtils";
import { updateApplication } from "../../utils/storage";

export function openEditModal(app, onSaveSuccess) {

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

        <div>
          <label class="text-sm mt-3 block">Notes</label>
          <textarea id="notes-input" class="mt-1 w-full h-24 border p-2 rounded">${app.notes || ""}</textarea>
          <small class="text-red-500"></small>
        </div>

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

  // -------------------------
  // Event listeners
  // -------------------------

  // clear validation error when user edits input
  companyInput.addEventListener("input", () => clearError(companyInput));
  roleInput.addEventListener("input", () => clearError(roleInput));
  locationInput.addEventListener("input", () => clearError(locationInput));
  notesInput.addEventListener("input", () => clearError(notesInput));

  // close modal on cancel button click
  modal.querySelector("#close-button").addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // handle save action for edit modal
  modal.querySelector("#save-button").addEventListener("click", async ()=> {
    // get current form values
    const inputs = {
      company: companyInput.value,
      role: roleInput.value,
      location: locationInput.value,
      notes: notesInput.value,
    };

    // track validation state
    let isValid = true;

    // validate fields and show errors if needed
    // COMPANY
    let companyError =
      validateRequired(inputs.company, "Company") ||
      validateText(inputs.company, "Company");

    if (companyError) {
      showError(companyInput, companyError);
      isValid = false;
    } else {
      clearError(companyInput);
    }

    // ROLE
    let roleError =
      validateRequired(inputs.role, "Role") ||
      validateText(inputs.role, "Role");

    if (roleError) {
      showError(roleInput, roleError);
      isValid = false;
    } else {
      clearError(roleInput);
    }

    // LOCATION
    let locationError =
      validateRequired(inputs.location, "Location") ||
      validateText(inputs.location, "Location");

    if (locationError) {
      showError(locationInput, locationError);
      isValid = false;
    } else {
      clearError(locationInput);
    }

    // NOTES
    let notesError = validateNotes(inputs.notes);

    if (notesError) {
      showError(notesInput, notesError);
      isValid = false;
    } else {
      clearError(notesInput);
    }

    // stop execution if validation fails
    if (!isValid) return;    

    // build an empty updated application object to populate
    const updatedData = {};
    
    // identify only the fields effectively changed comparing 
    // each field with the original application value
    if (inputs.company.trim() !== app.company) {
      updatedData.company = inputs.company.trim();
    }
    if (inputs.role.trim() !== app.role) {
      updatedData.role = inputs.role.trim();
    }
    if (inputs.location.trim() !== app.location) {
      updatedData.location = inputs.location.trim();
    }
    if (inputs.notes.trim() !== (app.notes || "")) {
      updatedData.notes = inputs.notes.trim();
    }

    // check if there is actually anything to update
    if (Object.keys(updatedData).length === 0) {
      modal.classList.add("hidden");
      return; // exit without saving any changes
    }    

    try {
      await updateApplication(app.id, updatedData);

      // close modal after successful update
      modal.classList.add("hidden");

      // trigger UI refresh by calling the provided callback ('render' in this case)
      if (onSaveSuccess) {
        await onSaveSuccess();
      }

    } catch (error) {
        console.error("Error while updating application:", error);
        alert("Something went wrong while saving your changes.");
    }

  })
}