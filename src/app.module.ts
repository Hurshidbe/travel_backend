import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { MessagesModule } from './modules/messages/messages.module';
import { LogsModule } from './modules/logs/logs.module';
import { FinanceModule } from './modules/finance/finance.module';
import { ExpenceModule } from './modules/expences/expence.module';
import { CustomerModule } from './modules/customers/customer.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { AuthModule } from './modules/auth/auth.module';
import { PackagesModule } from './modules/packages/packages.module';
import { DbModule } from './modules/db/db.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    MessagesModule,
    LogsModule,
    FinanceModule,
    ExpenceModule,
    CustomerModule,
    BookingsModule,
    AuthModule,
    PackagesModule,
    DbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
