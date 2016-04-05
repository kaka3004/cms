export class ModelNotFoundError extends Error {
  constructor(private id = null) {
    super();
  }

  getId() { return this.id; }
}

export class ForbiddenError extends Error {
  constructor(public message) {
    super(message);
  }
}

export class UnauthorizedError extends Error {
  constructor(public message) {
    super(message);
  }
}

export class ValidationError extends Error {
  constructor(private messages: Object = {}) {
    super();
  }

  getMessages() {
    return this.messages;
  }
}

export class ShopRequiredError extends ValidationError {
  constructor() {
    super({shop: 'Shop is required to make this request'});
  }
}
