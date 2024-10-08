import { Role } from './auth.roles';

export class User {
  id: string;
  email: string;
  isEmailVerified: boolean;
  role: Role;
  provider: string;
}
