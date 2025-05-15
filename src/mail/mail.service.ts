import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendMailDto } from './dto/send-mail.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}
  async sendMail(mail: SendMailDto) {
    const mailResult = await this.mailService.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
    });
    console.log('mail result==>>', mailResult);
  }
}
