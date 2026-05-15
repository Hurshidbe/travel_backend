import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/Login.dto';
import { RegisterDto } from './dto/Register.dto';
import { user_permissions, user_role } from 'src/shared/enums';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly UserRepo: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.UserRepo.findOne({ email }).select('+password');
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('Email or password incorrect');
    }
    return this.generateToken(user);
  }

  async register(dto: RegisterDto) {
    const existingUser = await this.UserRepo.findOne({
      email: dto.email,
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.UserRepo.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: dto.role || user_role.ADMIN,
      permissions: [user_permissions.PACKAGES, user_permissions.BOOKINGS],
    });
    return this.generateToken(user);
  }

  async getCurrentUser(userId: string) {
    const user = await this.UserRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  private generateToken(user: any) {
    return this.jwtService.sign({
      id: user.id.toString(),  
      role: user.role,
      permissions: user.permissions,
    });
  }
}