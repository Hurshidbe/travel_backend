import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpenceService } from './expence.service';
import { CreateExpenceDto } from './dto/create-expence.dto';
import { UpdateExpenceDto } from './dto/update-expence.dto';

@Controller('expence')
export class ExpenceController {
  constructor(private readonly expenceService: ExpenceService) {}

  @Post()
  create(@Body() createExpenceDto: CreateExpenceDto) {
    return this.expenceService.create(createExpenceDto);
  }

  @Get()
  findAll() {
    return this.expenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenceDto: UpdateExpenceDto) {
    return this.expenceService.update(+id, updateExpenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenceService.remove(+id);
  }
}
