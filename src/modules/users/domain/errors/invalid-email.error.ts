import { type DomainError } from '@/shared/errors/domain.error';

export class InvalidEmailError extends Error implements DomainError {
  statusCode: number;
  constructor(email: string, statusCode: number) {
    super(`The email ${email} is invalid.`);
    this.statusCode = statusCode;
    this.name = 'InvalidEmailError';
  }
}
