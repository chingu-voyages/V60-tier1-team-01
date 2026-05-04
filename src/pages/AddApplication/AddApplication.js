import template from './AddApplication.html?raw';
import { saveApplication } from '../../utils/storage.js';


export function AddApplication() {

  return {html: template, init: () => {
    
    const form = document.getElementById('applicationForm');

    // Restore draft if one exists
    const draft = localStorage.getItem('form_draft');
    if (draft) {
      const data = JSON.parse(draft);
      document.getElementById('company').value = data.company || '';
      document.getElementById('role').value = data.role || '';
      document.getElementById('date').value = data.date || new Date().toISOString().split('T')[0];
      document.getElementById('location').value = data.location || '';
      document.getElementById('status').value = data.status || '';
      document.getElementById('notes').value = data.notes || '';
    } 

    document.getElementById('date').value = document.getElementById('date').value || new Date().toISOString().split('T')[0]; // defaults to today to avoid failing field validation



    // Save draft on every input change
    form.addEventListener('input', () => {
      localStorage.setItem('form_draft', JSON.stringify({
        company: document.getElementById('company').value,
        role: document.getElementById('role').value,
        date: document.getElementById('date').value,
        location: document.getElementById('location').value,
        status: document.getElementById('status').value,
        notes: document.getElementById('notes').value,
      }));
    });

    form.addEventListener("submit", async (e)=>{
      e.preventDefault();

      const company = document.getElementById('company');
      const role = document.getElementById('role');
      const date = document.getElementById('date');
      const location = document.getElementById('location');
      const status = document.getElementById('status');
      const notes = document.getElementById('notes');

      let isValid = true;

      // Helper functions to show and clear error messages
      const showError = (input,message) => {
        const errorElement = input.parentElement.querySelector('small');
        errorElement.textContent = message;
        input.style.border = "2px solid red";
      }

      const clearError = (input) => {
        const errorElement = input.parentElement.querySelector('small');
        errorElement.textContent = "";
        input.style.border = "";
      }
      [company, role, date, location, status].forEach(input => {
  input.addEventListener('input', () => clearError(input));
});



// Validation logic
if (company.value.trim() === "") {
  showError(company, "Company name is required");
  isValid = false;
} else if (!/^[a-zA-Z\s\-&.,']+$/.test(company.value.trim())) {
  showError(company, "Company name contains invalid characters");
  isValid = false;
} else {
  clearError(company);
}

if (role.value.trim() === "") {
  showError(role, "Role is required");
  isValid = false;
} else if (!/^[a-zA-Z\s\-&.,']+$/.test(role.value.trim())) {
  showError(role, "Role contains invalid characters");
  isValid = false;
} else {
  clearError(role);
}

if (date.value.trim() === "") {
  showError(date, "Date is required");
  isValid = false;
} else {
  const selectedDate = new Date(date.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selectedDate > today) {
    showError(date, "Date applied can't be in the future");
    isValid = false;
  } else {
    clearError(date);
  }
}

if (location.value.trim() === "") {
  showError(location, "Location is required");
  isValid = false;
} else if (!/^[a-zA-Z\s\-&.,']+$/.test(location.value.trim())) {
  showError(location, "Location contains invalid characters");
  isValid = false;
} else {
  clearError(location);
}

if (status.value.trim() === "") {
  showError(status, "Status is required");
  isValid = false;
} else {
  clearError(status);
}

if (notes.value.length > 500) {
  showError(notes, "Notes must be under 500 characters");
  isValid = false;
} else {
  clearError(notes);
}

      // If all fields are valid, show success message and reset form

      if (isValid){
        await saveApplication({
          company: company.value,
          role: role.value,
          date: date.value,
          location: location.value,
          status: status.value,
          notes: notes.value,
        });
        localStorage.removeItem('form_draft');
        alert(" Application added successfully!");
        form.reset();
      }


      
    
    
    }

    )
  
  }};
}
