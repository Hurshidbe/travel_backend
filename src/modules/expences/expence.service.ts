import { Injectable } from '@nestjs/common';
import { CreateExpenceDto } from './dto/create-expence.dto';
import { UpdateExpenceDto } from './dto/update-expence.dto';

@Injectable()
export class ExpenceService {
  create(createExpenceDto: CreateExpenceDto) {
    return 'This action adds a new expence';
  }

  findAll() {
    return `This action returns all expence`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expence`;
  }

  update(id: number, updateExpenceDto: UpdateExpenceDto) {
    return `This action updates a #${id} expence`;
  }

  remove(id: number) {
    return `This action removes a #${id} expence`;
  }
}
