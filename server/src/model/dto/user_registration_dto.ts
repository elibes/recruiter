/**
 * A DTO containing the information needed to register a user. This is used from the api to service layer.
 * */
export interface UserRegistrationDTO {
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  readonly password: string;
  readonly personalNumber: string;
  readonly email: string;
}
