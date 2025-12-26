import { detectContactType } from "shared/utils/detectContactType";
import { UserRepoPort } from "../ports/UserRepoPort";
import { User } from "modules/auth/domain/User";

type FindUserReturn = {
    ok: true | false;
    user?: User | null;
    error?: string | null;
}

export class FindUserByContact {
    constructor(private userRepo: UserRepoPort) {}
    async exec(contact: string): Promise<FindUserReturn> {
        try {
            if(!contact) {
                return { ok: false, error: 'Contact is required' };
            }
            const contactType = detectContactType(contact);
            if (contactType === 'invalid') return { ok: false, user: null, error: 'Invalid contact type' };
            const user = await this.userRepo.findByEmailOrPhone(contact);
            if(!user) {
                return {ok: false, error: `User Not Found`}
            }
            return { ok: true, user };
        } catch (error) {
            console.log('[Find User] Error in find user controller:', (error as Error).message);
            return { ok: false, error: 'Internal server error' };
        }
    }
}