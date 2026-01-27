import { DoctorRepoPort } from "modules/doctor/application/ports/DoctorRepoPort.js";
import { detectContactType } from "../../../../shared/utils/detectContactType.js";
import { UserRepoPort } from "../ports/UserRepoPort.js";
import { User } from "modules/auth/domain/User.js";
import { generateAccessToken } from "shared/utils/generateTokens.js";

type FindUserReturn = {
    ok: true | false;
    user?: User | null;
    error?: string | null;
}

export class FindUserByContact {
    constructor(private userRepo: UserRepoPort, private doctorRepo: DoctorRepoPort) {}
    async exec(contact: string): Promise<FindUserReturn | any> {
        try {
            if(!contact) {
                return { ok: false, error: 'Contact is required' };
            }
            if(contact.startsWith("HLC")) {
                const doctor = await this.doctorRepo.findByNixpendId(contact);
                if(!doctor) {
                    return {ok: false, error: `Doctor Not Found`}
                }
                const accessToken = generateAccessToken({userId: contact, userType: 'doctor'});
                return { ok: true, user: {...doctor, accessToken} };
            } else {
                const contactType = detectContactType(contact);
                console.log("CONTACT TYPE: ", contactType);
                if (contactType === 'invalid') return { ok: false, user: null, error: 'Invalid contact type' };
                const user = await this.userRepo.findByEmailOrPhone(contactType, contact);
                console.log("TJEHEHHE : ", user)
                if(!user) {
                    return {ok: false, error: `User Not Found`}
                }
                return { ok: true, user };
            }
        } catch (error) {
            console.log('[Find User] Error in find user controller:', (error as Error).message);
            return { ok: false, error: 'Internal server error' };
        }
    }
}