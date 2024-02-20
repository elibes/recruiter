// Function to validate username

import {
  CompetenceState,
  AvailabilityState,
} from '../viewmodel/applicationSlice';

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

export function validateYearsOfExperience(years: string) {
  const regex = /^\d+\.?\d*$/;
  if (!years) {
    return false;
  }
  return regex.test(years);
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

export function validateCompetencies(
  acc: string[],
  competencies: CompetenceState[]
) {
  return competencies.reduce((acc: string[], currentValue: any) => {
    if (currentValue.hasCompetence && !currentValue.yearsOfExperience) {
      acc.push(currentValue.competenceName + ' has no exp,');
    }
    return acc;
  }, acc);
}

export function validateAvailabilities(
  acc: string[],
  availabilities: AvailabilityState[]
) {
  return availabilities.reduce((acc, currentValue) => {
    if (new Date(currentValue.endDate) <= new Date(currentValue.startDate)) {
      acc.push('specify at least one availability period');
    }
    return acc;
  }, acc);
}
