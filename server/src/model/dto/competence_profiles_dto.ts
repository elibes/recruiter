import Decimal from 'decimal.js';

/**
 * A DTO representing competencies from the user.
 * */
export interface CompetenceProfilesDTO {
  readonly competenceProfiles: ReadonlyArray<CompetenceProfileDTO>;
}
export interface CompetenceProfileDTO {
  readonly personId: number;
  readonly competenceId: number;
  readonly yearsOfExperience: Decimal;
}
