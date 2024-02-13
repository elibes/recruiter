/**
 * This represents a list of competencies from the database.
 */
export interface CompetenciesDTO {
  readonly competencies: ReadonlyArray<CompetenceDTO>;
}

/**
 * This represent a single row of the competence table from the database.
 */
export interface CompetenceDTO {
  readonly id: number;
  readonly competenceName: string;
}
