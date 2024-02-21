/**
 * This represents a list of competencies from the database.
 */
export interface CompetenciesDTO {
  readonly competencies: ReadonlyArray<CompetenceDTO>;
}

/**
 * This represents a single row of the competence table from the database.
 */
export interface CompetenceDTO {
  readonly id: number;
  readonly competenceName: string;
}
