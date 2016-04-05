export interface IAuthActions {
  createToken(email, password);
  checkToken(email, password);
}