declare module "password-hash-and-salt" {
	interface PasswordHashAndSalt {
		hash(callback: (error, hash) => void);
		verifyAgainst(hash, callback: (error, verified: boolean) => void);
	}

	function x(password: string): PasswordHashAndSalt;

	export = x;
}