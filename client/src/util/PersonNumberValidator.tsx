export interface PersonNumberTestResult {
  message: string;
  isValid: boolean;
}

export const isPersonNumberValid = (pnr: string): PersonNumberTestResult => {
  const personNumberTestResult: PersonNumberTestResult = {
    message: '',
    isValid: true,
  };

  const personNumberPattern =
    /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])-\d{4}$/;

  if (!personNumberPattern.test(pnr)) {
    personNumberTestResult.message =
      'Person number must be in the format YYYYMMDD-XXXX';
    personNumberTestResult.isValid = false;
  }

  return personNumberTestResult;
};
