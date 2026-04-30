// helper functions for validation UI
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