import { City } from '../entities/city.entity';
import { IsString } from 'class-validator';

export class UpdateCityDto extends City {
    @IsString()
    name: string;
}
