/**
 * A DTO representing availability periods from the user.
 * */
export interface AvailabilitiesDTO {
  readonly availabilities: ReadonlyArray<AvailabilityDTO>;
}

/**
 * A DTO representing a single availability period for a particular user, from the user.
 */
export interface AvailabilityDTO {
  readonly personId: number;
  readonly fromDate: Date;
  readonly toDate: Date;
}
