declare module "mongoose" {
  export interface Document {
    save<T>(callback?: (err: any, res: T) => void): Promise<T>;
  }

  export class ValidationError extends Error {
  }
}