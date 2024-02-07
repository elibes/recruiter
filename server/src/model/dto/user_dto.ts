/**
 * A DTO representing a user found in the database.
 * Contains the user's database id, names, email, personal identification number,
 * username, hashed password, and role (applicant or recruiter).
 * */
export interface UserDTO {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly personalIdentificationNumber: string;
  readonly username: string;
  readonly passwordHash: string;
  readonly role: number;
}
