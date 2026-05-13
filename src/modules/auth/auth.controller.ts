import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  UseGuards,
  Req,
  UnauthorizedException,
  ConflictException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/Login.dto';
import { RegisterDto } from './dto/Register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

interface JwtPayload {
  userId: string;
  role: string;
  permissions: string[];
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      const token = await this.authService.register(dto);
      return { success: true, token };
    } catch (error: unknown) {
      if (error instanceof ConflictException) {
        throw new HttpException(
          { success: false, error: error.message },
          error.getStatus(),
        );
      }
      if (error instanceof HttpException) {
        throw new HttpException(
          { success: false, error: error.message },
          error.getStatus(),
        );
      }
      throw new HttpException(
        { success: false, error: 'Internal server error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      const token = await this.authService.login(dto);
      return { success: true, token };
    } catch (error: unknown) {
      if (error instanceof UnauthorizedException) {
        throw new HttpException(
          { success: false, error: error.message },
          error.getStatus(),
        );
      }
      if (error instanceof HttpException) {
        throw new HttpException(
          { success: false, error: error.message },
          error.getStatus(),
        );
      }
      throw new HttpException(
        { success: false, error: 'Internal server error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req: { user: JwtPayload }) {
    try {
      const user = await this.authService.getCurrentUser(req.user.userId);
      return { success: true, data: user };
    } catch (error: unknown) {
      if (error instanceof UnauthorizedException) {
        throw new HttpException(
          { success: false, error: error.message },
          error.getStatus(),
        );
      }
      if (error instanceof HttpException) {
        throw new HttpException(
          { success: false, error: error.message },
          error.getStatus(),
        );
      }
      throw new HttpException(
        { success: false, error: 'Internal server error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
