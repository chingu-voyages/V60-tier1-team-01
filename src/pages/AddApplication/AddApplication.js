import template from './AddApplication.html?raw';
import { saveApplication } from '../../utils/storage.js';


export function AddApplication() {
  setTimeout(() => {
    const form = document.getElementById('applicationForm');

    form.addEventListener("submit", async (e)=>{
      e.preventDefault();

      const company = document.getElementById('company');
      const role = document.getElementById('role');
      const date = document.getElementById('date');
      const location = document.getElementById('location');
      const status = document.getElementById('status');

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

        // Validation logic
      if(company.value.trim() === ""){
        showError(company,"Company name is required");
        isValid =false;
      }else {
        clearError(company);
      } 
      if(role.value.trim() === ""){
        showError(role,"Role is required");
        isValid =false;
      }else {
        clearError(role);
      } 

      if(date.value.trim() === ""){
        showError(date,"Date is required");
        isValid =false;
      }else {
        clearError(date);

      } 
      if(location.value.trim() === ""){
        showError(location,"Location is required");
        isValid =false;
      }else {
        clearError(location);
      } 
      if(status.value.trim() === ""){
        showError(status,"Status is required");
        isValid =false;
      }else {
        clearError(status);
      } 

      // If all fields are valid, show success message and reset form

      if (isValid){
        await saveApplication({
          company: company.value,
          role: role.value,
          date: date.value,
          location: location.value,
          status: status.value,
          //   createdAt: new Date().toISOString(), // this is to aid in getting recent entry in dashboard
        });
        alert(" Application added successfully!");
        form.reset();
      }


      
    
    
    }

    )
  }, 0);


  return template;
}
