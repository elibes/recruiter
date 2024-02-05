export interface PersonNumberTestResult {
  message: string;
  isValid: boolean;
}

export const isPersonNumberValid = (pnr: string): PersonNumberTestResult => {
  const personNumberTestResult: PersonNumberTestResult = {
    message: '',
    isValid: true,
  };

  if (pnr.length !== 12) {
    personNumberTestResult.message = 'Personal number must be 12 digits';
    personNumberTestResult.isValid = false;
    return personNumberTestResult;
  }

  const personNumberDigit = new RegExp('^[0-9](?=.{12,})');
  if (!personNumberDigit.test(pnr)) {
    personNumberTestResult.message =
      'Person number must consist of only digits';
    personNumberTestResult.isValid = false;
  }

  return personNumberTestResult;
};
