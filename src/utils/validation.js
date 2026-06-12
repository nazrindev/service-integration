const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin(formData) {
  const errors = {};

  if (!formData.username?.trim()) {
    errors.username = "Username is required";
  }

  if (!formData.password?.trim()) {
    errors.password = "Password is required";
  }

  return errors;
}

export function validateEmployeeForm(formData, isEditMode) {
  const errors = {};

  if (!formData.firstName?.trim()) {
    errors.firstName = "First name is required";
  }

  if (!formData.lastName?.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!formData.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required";
  } else if (new Date(formData.dateOfBirth) > new Date()) {
    errors.dateOfBirth = "Date of birth cannot be a future date";
  }

  if (!formData.personalEmail?.trim()) {
    errors.personalEmail = "Email is required";
  } else if (!emailPattern.test(formData.personalEmail.trim())) {
    errors.personalEmail = "Enter a valid email address";
  }

  if (!formData.mobileNumber?.trim()) {
    errors.mobileNumber = "Mobile number is required";
  } else if (!/^\d{10,15}$/.test(formData.mobileNumber.trim())) {
    errors.mobileNumber = "Enter a valid mobile number (10-15 digits)";
  }

  if (!formData.username?.trim()) {
    errors.username = "Username is required";
  }

  if (!isEditMode && !formData.password?.trim()) {
    errors.password = "Password is required";
  }

  if (formData.basicPay === "" || Number(formData.basicPay) <= 0) {
    errors.basicPay = "Basic pay is required and must be greater than 0";
  }

  if (!formData.gender || Number(formData.gender) === 0) {
    errors.gender = "Gender is required";
  }

  if (!formData.designation || Number(formData.designation) === 0) {
    errors.designation = "Designation is required";
  }

  if (!formData.country?.trim()) {
    errors.country = "Country is required";
  }

  if (!formData.city?.trim()) {
    errors.city = "City is required";
  }

  if (!formData.postalAddress?.trim()) {
    errors.postalAddress = "Postal address is required";
  }

  if (!formData.notes?.trim()) {
    errors.notes = "Notes is required";
  }

  return errors;
}
