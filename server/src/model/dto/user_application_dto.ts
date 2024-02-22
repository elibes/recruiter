/**
 * A DTO representing a user's application with status.
 * Used for sending the user data to the API layer
 */
export interface UserApplicationDTO {
  readonly userId: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly status: string;
}
