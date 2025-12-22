import { detectContactType } from "shared/utils/detectContactType";
import { UserRepoPort } from "../ports/UserRepoPort";
import { User } from "modules/auth/domain/User";

type CreatePartialResult = {
    ok: true | false,
    user?: User | null,
    error?: string
}

export class CreatePartialUser {
    constructor(private userRepo: UserRepoPort) {}
    async exec(fullName: string, gender: 'Male' | 'Female' | 'male' | 'female', birthdate: Date, contact: string): Promise<CreatePartialResult> {
        try {
            const contactType = detectContactType(contact);
            const existingUser = await this.userRepo.findByEmailOrPhone(contact);
            if (existingUser) {
                return {ok: false, error: 'User Already Exists.'};
            }
            const user = await this.userRepo.create({ fullName, gender, birthdate, [contactType]: contact, userStatus: { partialProfileCompleted: true, registerOtpVerified: false, fullProfileCompleted: false } });
            return {ok: true, user};
        } catch (error) {
            console.log('[Create Partial User] Error in creating partial user:', (error as Error).message);
            return {ok: false, error: (error as Error).message};
        }
    }
}