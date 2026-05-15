import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../shared/decorators/roles.decorator';
import { user_role } from 'src/shared/enums';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(user_role.SUPER_ADMIN)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return { success: true, data: user };
    } catch (error) {
      throw new HttpException(error.message, error.status??500)
    }
  }

  @Get()
  async findAll() {
    try {
      const users = await this.userService.findAll();
      return { success: true, data: users };
    } catch (error) {
      throw new HttpException(error.message, error.status??500)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne(id);
      return { success: true, data: user };
    } catch (error) {
      throw new HttpException(error.message, error.status??500)
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userService.update(id, updateUserDto);
      return { success: true, data: user };
    } catch (error) {
     throw new HttpException(error.message, error.status??500)
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Request() req: { user: { userId: string } },
  ) {
    throw new HttpException(error.message, error.status??500)
  }
}
