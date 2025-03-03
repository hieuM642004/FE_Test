import { UserRole } from '../schemas/user.schema';

export class UpdateUserDto {
  readonly username: string;
  readonly avatar: string;
  readonly email: string;
  readonly password: string;
  readonly role: UserRole;
  readonly slug: string;
  readonly followers: { userId: string; followedAt: Date }[];
}
