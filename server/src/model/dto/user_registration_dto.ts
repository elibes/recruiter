/**
 * A DTO containing the information needed to register a user.
 * */
export interface UserRegistrationDTO {
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  readonly password: string;
  readonly personalNumber: string;
  readonly email: string;
}
