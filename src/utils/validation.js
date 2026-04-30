// utils/validation.js

const textRegex = /^[a-zA-Z0-9\s\-&.,']+$/;

export function validateRequired(value, fieldName) {
  if (value.trim() === "") {
    return `${fieldName} is required`;
  }
  return null;
}

export function validateText(value, fieldName) {
  if (!textRegex.test(value.trim())) {
    return `${fieldName} contains invalid characters`;
  }
  return null;
}

export function validateDate(value) {
  if (value.trim() === "") {
    return "Date is required";
  }

  const selectedDate = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate > today) {
    return "Date applied can't be in the future";
  }

  return null;
}

export function validateNotes(value) {
  if (value.trim().length > 500) {
    return "Notes must be under 500 characters";
  }
  return null;
}