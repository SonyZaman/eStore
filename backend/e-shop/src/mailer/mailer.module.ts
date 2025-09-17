import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    NestMailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
        user: process.env.GMAIL_USER,  // Use your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD,  // Use your Gmail App Password
        },
      },
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
