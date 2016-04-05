import {
  ModelNotFoundError, ValidationError, ForbiddenError, UnauthorizedError} from 'server/errors';
import {IResponseError} from 'shared/response';
import {IErrorMiddleware} from 'server/middlewares/error/error-middleware.d';
import PrettyError = require('pretty-error');

export class ErrorMiddleware implements IErrorMiddleware {
  logErrors(err, req, res, next) {
    let pe = new PrettyError();
    console.log(pe.render(err));
    next(err);
  }

  response(err, req, res, next) {
    let error;

    // Handle mongoose validation errors
    if(err.name === 'ValidationError')
    {
      error = this.getMongooseValidationError(err);
    }
    else if(err instanceof ValidationError) {
      error = this.getValidationError(err);
    }
    else if(err instanceof ModelNotFoundError)
    {
      error = this.getModelNotFoundError(err);
    }
    else if(err instanceof UnauthorizedError)
    {
      error = this.getUnauthorizedError(err);
    }
    else if(err instanceof ForbiddenError)
    {
      error = this.getForbiddenError(err);
    }
    else
    {
      error = this.getUnknownError(err);
    }

    res.status(error.statusCode).send(error);
  }

  private getUnknownError(err): IResponseError {
    return {
      statusCode: 500,
      error: {
        type: "unknown",
        description: "Unknown error",
        message: err.message || `Something went wrong, That's all we know!`
      }
    };
  }

  private getForbiddenError(err): IResponseError {
    return {
      statusCode: 403,
      error: {
        type: "forbidden",
        description: "Forbidden error",
        message: err.message || `You are not authorized to make this request`
      }
    };
  }

  private getUnauthorizedError(err): IResponseError {
    return {
      statusCode: 401,
      error: {
        type: "unauthorized",
        description: "Unauthorized error",
        message: err.message || `You must login to make this request`
      }
    };
  }

  private getModelNotFoundError(err): IResponseError {
    return {
      statusCode: 404,
      error: {
        type: "notfound",
        description: "Model not found",
        message: `Model with id ${err.getId()} not found`
      }
    };
  }

  private getValidationError(err): IResponseError {
    return {
      statusCode: 400,
      error: {
        type: "validation",
        description: "Validation error",
        message: "Fix these validation errors first",
        errors: err.getMessages()
      }
    };
  }

  private getMongooseValidationError(err): IResponseError {
    return {
      statusCode: 400,
      error: {
        type: "validation",
        description: "Validation error",
        message: err.message,
        errors: err.errors
      }
    };
  }
}
