import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenceDto } from './create-expence.dto';

export class UpdateExpenceDto extends PartialType(CreateExpenceDto) {}
