/**
 * This is a simple interface that defines the form of the data for user registration to be passed from the api layer
 * to the service layer.
 */
export interface userRegistrationData {
  firstName: string;
  lastName: string;
  password: string;
  personalNumber: number;
  email: string;
}