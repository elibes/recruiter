/**
 * A DTO representing a user's application with status.
 * Used for sending the user data to the API layer
 */
export interface UserApplicationDTO {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly status: string;
}
