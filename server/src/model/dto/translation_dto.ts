/**
 * Data Transfer Object (DTO) for translations, defining the structure for data
 * related to translations being transferred between processes or layers in the application.
 */
export interface TranslationDTO {
  readonly competenceId: number;
  readonly languageId: number;
  readonly translationName: string;
}
