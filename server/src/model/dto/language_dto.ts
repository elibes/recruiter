export interface LanguagesDTO {
  readonly languages: ReadonlyArray<LanguageDTO>;
}

export interface LanguageDTO {
  readonly id: number;
  readonly languageName: string;
}
