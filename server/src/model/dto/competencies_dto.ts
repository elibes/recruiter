export interface CompetenciesDTO {
  readonly competencies: ReadonlyArray<CompetenceDTO>;
}
export interface CompetenceDTO {
  readonly id: number;
  readonly competenceName: string;
}
