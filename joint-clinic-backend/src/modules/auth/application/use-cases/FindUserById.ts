import { User } from "modules/auth/domain/User";
import { UserRepoPort } from "../ports/UserRepoPort";

export class FindUserById {
    constructor(private userRepo: UserRepoPort) {}
    async exec(id: string): Promise<User | null> {
        const user = await this.userRepo.findById(id);
        return user;
    }
}