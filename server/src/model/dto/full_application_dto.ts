import {CompetenceProfilesDTO} from './competence_profiles_dto';
import {AvailabilitiesDTO} from './availabilities_dto';

/**
 * This DTO represent the full application from a user, it should be built from JWT and form data in the api layer.
 */
export interface fullApplicationDTO {
  readonly userId: number;
  readonly userRole: number;
  readonly competencies: CompetenceProfilesDTO;
  readonly availabilities: AvailabilitiesDTO;
}
