import { SetMetadata } from '@nestjs/common';
import { user_role } from 'src/shared/enums';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: user_role[]) =>
  SetMetadata(ROLES_KEY, roles);