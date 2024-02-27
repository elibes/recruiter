export interface TranslationsDTO {
  readonly translations: ReadonlyArray<TranslationDTO>;
}

export interface TranslationDTO {
  readonly competenceId: number;
  readonly languageId: number;
  readonly translationName: string;
}
