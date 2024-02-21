/**
 * DTO for sending authentication info to the service layer
 */
export interface UserAuthDTO {
  readonly userId: number;
  readonly roleId: number;
}
