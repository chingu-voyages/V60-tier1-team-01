// Utility functions for displaying form validation errors in the UI
// Used to create and edit application forms

export function showError(input, message) {
  const errorElement = input.parentElement.querySelector("small");
  errorElement.textContent = message;
  input.style.border = "2px solid red";
}

export function clearError(input) {
  const errorElement = input.parentElement.querySelector("small");
  errorElement.textContent = "";
  input.style.border = "";
}