import { User } from './modules/users/entities/user.entity';
import { user_role } from './shared/enums';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

export async function seedSuperAdmin(UserModel: Model<User>) {
  const email = process.env.SUPERADMIN_EMAIL || 'superadmin@travel.com';
  const password = process.env.SUPERADMIN_PASSWORD || 'superadmin123';

  const existingSuperAdmin = await UserModel.findOne({
    role: user_role.SUPER_ADMIN,
  });

  if (existingSuperAdmin) {
    console.log('SuperAdmin already exists');
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const superAdmin = new UserModel({
    name: 'Super Admin',
    email,
    password: hashedPassword,
    role: user_role.SUPER_ADMIN,
    permissions: [
      'packages',
      'bookings',
      'users',
      'customers',
      'finance',
      'logs',
      'messages',
      'expenses',
    ],
  });

  await superAdmin.save();
  console.log('SuperAdmin created successfully');
}
