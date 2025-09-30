import { User } from '../../domain/User.js';
export interface UserRepoPort {
  findByEmailOrPhone(identifier: string): Promise<User | null>;
}
