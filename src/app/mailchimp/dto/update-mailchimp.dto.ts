import { PartialType } from '@nestjs/mapped-types';
import { CreateMailchimpDto } from './create-mailchimp.dto';

export class UpdateMailchimpDto extends PartialType(CreateMailchimpDto) {}
