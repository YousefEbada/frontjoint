import { UserRepoPort } from "../ports/UserRepoPort";
import { User } from "../../domain/User";

type FindBy = { id?: string };

export class CreateFullUser {
	constructor(private userRepo: UserRepoPort) {}
	async exec(lookup: FindBy, fullProfileProps?: Partial<User>): Promise<User> {
		const { id } = lookup;
		console.log("CreateFullUser exec called with lookup:", lookup, "and fullProfileProps:", fullProfileProps);
		if (!id) throw new Error("Either id or contact is required to complete a user profile.");

		const user = await this.userRepo.findById(id!);
		console.log("\n--------------User found in create full USER -------------------------:", user, "\n\n\n---------------");
		if (!user) throw new Error("User not found.");

		const status = user.userStatus || ({} as any);

		// Require that the partial profile was completed and register OTP verified before marking full
		if (!status.partialProfileCompleted || !status.registerOtpVerified) {
			throw new Error("User is not eligible to complete full profile. Ensure partial profile is completed and registration OTP is verified.");
		}

		// Idempotent: if already full, return merged user
		if (status.fullProfileCompleted) {
			return { ...user, ...fullProfileProps } as User;
		}

		// Merge provided full profile props and ensure fullProfileCompleted is true
		const merged: Partial<User> = {
			...user,
			...((fullProfileProps as Partial<User>) || {}),
			userStatus: { ...status, fullProfileCompleted: true } as User['userStatus'],
		};

		// Persist the merged user using save (repo handles persistence details)
		let saved;
		console.log("Persisting full user with merged properties:", merged);
		try {
			saved = await this.userRepo.save(merged as Partial<User>);
		} catch (error) {
			console.error("Error saving full user:", (error as any).message);
			throw new Error("Failed to persist full user.");
		}
		if (!saved) {
			throw new Error('User is not found');
		} 
		return saved as User;
	}
}

