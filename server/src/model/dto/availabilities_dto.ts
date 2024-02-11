/**
 * A DTO representing availability periods from the user.
 * */
export interface AvailabilitiesDTO {
  readonly availabilities: ReadonlyArray<AvailabilityDTO>;
}

export interface AvailabilityDTO {
  readonly personId: number;
  readonly fromDate: Date;
  readonly toDate: Date;
}
