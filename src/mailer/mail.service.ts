
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer/dist';

@Injectable()
export class MailService {


  constructor(private mailerService: MailerService) { }


  async sendEmail(userEmail: string, subject: string, text: string) {

    await this.mailerService.sendMail({
      to: userEmail,
      from: process.env.ADMIN_EMAIL,
      subject,
      text
    })

  }

}
