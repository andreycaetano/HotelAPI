import { PartialType } from '@nestjs/mapped-types';
import { CreateTravelTimeDto } from './create-travel-time.dto';

export class UpdateTravelTimeDto extends PartialType(CreateTravelTimeDto) {}
