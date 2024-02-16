// Function to validate username

export function validateUsername(username: string): string {
  if (!username) {
    return 'Username is required.';
  }
  return '';
}

export function validateFirstname(firstname: string): string {
  if (!firstname) {
    return 'Firstname is required.';
  }
  return '';
}

export function validateLastname(lastname: string): string {
  if (!lastname) {
    return 'Lastname is required.';
  }
  return '';
}

// Function to validate password
export function validatePassword(username: string): string {
  if (!username) {
    return 'Password is required.';
  }
  return '';
}

export function validateEmail(email: string): string {
  if (!email) {
    return 'Email is required.';
  }
  return '';
}

export function validatePersonalNumber(personalNumber: string): string {
  if (!personalNumber) {
    return 'Personal number is required.';
  }
  return '';
}

export function validatePasswordConfirmation(
  password: string,
  passwordConfirmation: string
): string {
  if (password !== passwordConfirmation) {
    return 'Passwords do not match.';
  }
  return '';
}
