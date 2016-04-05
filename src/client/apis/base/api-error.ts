import {IResponseError} from 'shared/response';

export class ApiError {
  constructor(private err: IResponseError) {}

  getStatusCode() {
    return this.err.statusCode;
  }

  getMainErrorMessage() {
    return this.err.error.message;
  }

  getErrorMessages() {
    if(this.isValidationError()) {
      return this.getValidationErrorMessages();
    }
  }

  getValidationErrorMessages() {
    let errors = this.err.error.errors, messages = [];

    for (let error in errors) {
      messages.push(errors[error].message || errors[error]);
    }

    return messages;
  }

  isValidationError() {
    return this.err.error.type === 'validation';
  }

  isNotFoundError() {
    return this.err.error.type === 'notfound';
  }

  isUnauthorized() {
    return this.err.error.type === 'unauthorized';
  }

  isForbiddenError() {
    return this.err.error.type === 'forbidden';
  }

  isUnknownError() {
    return this.err.error.type === 'unknown';
  }

  isInvalidToken() {
    return this.err.error.message === 'Invalid token';
  }
}