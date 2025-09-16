import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
         user: process.env.GMAIL_USER,  // Use your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD,  // Use your Gmail App Password
      },
    });
  }

  async sendWelcomeEmail(to: string) {
    try {
      await this.transporter.sendMail({
        to: to,
        subject: 'Welcome to Trendora!',
        text: 'Thank you for joining Trendora. We’re excited to have you!',
      });
      return { message: 'Email sent successfully' };
    } catch (error) {
      console.error('Error sending email:', error);
      return { message: 'Failed to send email', error: error.message };
    }
  }

  async sendOtpEmail(to: string, otp: string) {
    try {
      await this.transporter.sendMail({
        to: to,
        subject: 'Verify Your Email - Trendora Vendor Registration',
        text: `Your OTP for email verification is: ${otp}. This OTP will expire in 10 minutes.`,
      });
      return { message: 'Email sent successfully' };
    } catch (error) {
      console.error('Error sending OTP email:', error);
      return { message: 'Failed to send OTP email', error: error.message };
    }
  }
}
