import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailchimpService } from './mailchimp.service';
import { CreateMailchimpDto } from './dto/create-mailchimp.dto';
import { UpdateMailchimpDto } from './dto/update-mailchimp.dto';

@Controller('mailchimp')
export class MailchimpController {
  constructor(private readonly mailchimpService: MailchimpService) {}

  @Post()
  create(@Body() createMailchimpDto: CreateMailchimpDto) {
    return this.mailchimpService.create(createMailchimpDto);
  }
}
