import { Module } from '@nestjs/common';
import { MailchimpService } from './mailchimp.service';
import { MailchimpController } from './mailchimp.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [MailchimpController],
  providers: [MailchimpService],
  imports: [HttpModule]
})
export class MailchimpModule {}
