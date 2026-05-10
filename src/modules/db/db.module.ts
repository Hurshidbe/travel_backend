import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

@Module({
  imports : [
    MongooseModule.forRootAsync({
      inject : [ConfigService],
      useFactory :(config : ConfigService)=>({
        uri : config.get<string>('MONGO_URI')
      })
    })
  ],
  controllers: [],
  providers: [],
})
export class DbModule {}
