import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMailchimpDto } from './dto/create-mailchimp.dto';
import { UpdateMailchimpDto } from './dto/update-mailchimp.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class MailchimpService {
  constructor(
    private readonly httpService: HttpService
  ) {}
  async create(contact: CreateMailchimpDto) {
    const formData = this.convert(contact);
    try {
        const data = this.httpService.post(process.env.MAILCHIMP_URL, formData, {
            headers: {
                Authorization: `Bearer ${process.env.API_KEY_MAILCHIMP}`
            }
        });
        return data;
    } catch (error: any) {
        if (error.response) {
            throw new ForbiddenException(error.response.data, error.response.status,);
        } else if (error.request) {
            throw new InternalServerErrorException('No response from server');
        } else {
            throw new InternalServerErrorException('Unexpected error occurred');
        }
    }
}

  private convert(data: any) {
    const member: any = {
        email_address: data.email,
        status: "subscribed",
        merge_fields: {}
    };

    if (data.fName) {
        member.merge_fields.FNAME = data.fName;
    }
    if (data.lName) {
        member.merge_fields.LNAME = data.lName;
    }
    if (data.phone) {
        member.merge_fields.PHONE = data.phone;
    }

    return {
        members: [member]
    };
}
}
