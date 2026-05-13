import { Module } from '@nestjs/common';
import { ExpenceService } from './expence.service';
import { ExpenceController } from './expence.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Expence, ExpenceSchema } from './entities/expence.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Expence.name, schema: ExpenceSchema }]),
  ],
  controllers: [ExpenceController],
  providers: [ExpenceService],
})
export class ExpenceModule {}
