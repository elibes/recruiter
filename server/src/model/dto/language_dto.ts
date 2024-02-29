/**
 * Data Transfer Object (DTO) for language, defining the structure for language data
 * being transferred between processes or layers within the application.
 */
export interface LanguageDTO {
  readonly id: number;
  readonly languageCode: string;
}
