import {CompetenceService} from './competence_service';

/**
 * This factory function creates instance of the competence service class. Each request a new instance shall be created to
 * ensure reliable operation in concurrent conditions.
 */
function createCompetenceService() {
  return new CompetenceService();
}

export {createCompetenceService};
