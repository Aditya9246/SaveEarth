
export interface ValidationResult {
  isValid: boolean;
  confidence?: number;
  message: string;
  details: string;
  challengeName?: string;
  challengeIcon?: string;
  raw?: any;
}
