// Function to validate username
import i18next from 'i18next';
import {
  CompetenceState,
  AvailabilityState,
} from '../viewmodel/applicationSlice';

export function validateUsername(username: string): string {
  if (!username) {
    return i18next.t('validation.username-required');
  }
  return '';
}

export function validateFirstname(firstname: string): string {
  if (!firstname) {
    return i18next.t('validation.first-name-required');
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
    return i18next.t('validation.last-name-required');
  }
  return '';
}

// Function to validate password
export function validatePassword(username: string): string {
  if (!username) {
    return i18next.t('validation.password-required');
  }
  return '';
}

export function validateEmail(email: string): string {
  if (!email) {
    return i18next.t('validation.email-required');
  }
  return '';
}

export function validatePersonalNumber(personalNumber: string): string {
  if (!personalNumber) {
    return i18next.t('validation.personal-number-required');
  }
  return '';
}

export function validatePasswordConfirmation(
  password: string,
  passwordConfirmation: string
): string {
  if (password !== passwordConfirmation) {
    return i18next.t('validation.passwords-dont-match');
  }
  return '';
}

export function validateCompetencies(
  acc: string[],
  competencies: CompetenceState[]
) {
  return competencies.reduce((acc: string[], currentValue: any) => {
    if (currentValue.hasCompetence && !currentValue.yearsOfExperience) {
      acc.push(
        i18next.t('applicant.' + currentValue.competenceName) +
          i18next.t('validation.has-no-experience')
      );
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
      acc.push(i18next.t('validation.specify-availability'));
    }
    return acc;
  }, acc);
}
