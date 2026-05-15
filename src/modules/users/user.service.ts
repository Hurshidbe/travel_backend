import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { user_role } from 'src/shared/enums';
import { Logger } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    // Create user
    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      role: createUserDto.role || user_role.ADMIN,
      permissions: createUserDto.permissions || ['packages', 'bookings'],
    });

    const savedUser = await user.save();

    this.logger.log(
      `CREATE User: ${savedUser._id.toString()} - Name: ${savedUser.name}, Email: ${savedUser.email}`,
    );

    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password').exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).select('-password').exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

 async update(id: string, updateUserDto: UpdateUserDto) {
  const user = await this.userModel
    .findById(id)
    .select('+password')
    .exec();

  if (!user) {
    throw new NotFoundException('User not found');
  }

  Object.assign(user, updateUserDto);

  if (updateUserDto.password) {
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(
      updateUserDto.password,
      salt,
    );
  }

  const updatedUser = await user.save();

  this.logger.log(
    `UPDATE_USER User: ${updatedUser._id} - Name: ${updatedUser.name}, Email: ${updatedUser.email}, Role: ${updatedUser.role}`,
  );

  const { password, ...userWithoutPassword } =
    updatedUser.toObject();

  return userWithoutPassword;
}

  async remove(id: string, currentUserId: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Prevent self-deletion
    if (user._id.toString() === currentUserId) {
      throw new BadRequestException('You cannot delete yourself');
    }

    await user.deleteOne();

    this.logger.log(`DELETE User: ${user._id.toString()} - Name: ${user.name}`);

    return user;
  }
}
