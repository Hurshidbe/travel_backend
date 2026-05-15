import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { seedSuperAdmin } from './seed';
import { User } from './modules/users/entities/user.entity';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const userModel = app.get<Model<User>>(getModelToken(User.name));
  await seedSuperAdmin(userModel);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`nigga is running port ${process.env.PORT}`);
}
void bootstrap();
