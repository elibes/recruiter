/**
 * DTO for sending authentication info to the service layer
 */
export interface UserAuthDTO {
  readonly username: string;
  readonly role: number;
}
