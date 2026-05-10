import { Module } from '@nestjs/common';
import { ExpenceService } from './expence.service';
import { ExpenceController } from './expence.controller';

@Module({
  controllers: [ExpenceController],
  providers: [ExpenceService],
})
export class ExpenceModule {}
