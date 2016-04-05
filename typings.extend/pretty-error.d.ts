declare module "pretty-error" {
	class PrettyError {
		render(err: Error): any;
	}
  export = PrettyError;
}
