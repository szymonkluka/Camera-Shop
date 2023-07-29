import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // Update with your email service provider
      auth: {
        user: 'psymon240@gmail.com', // Update with your email address
        pass: 'lpghseyolqgpvukg', // Update with your email password
      },
    });
  }

  async sendOrderEmail(email: string, orderData: any): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'psymon240@gmail.com', // Update with your email address
      to: email,
      subject: 'Order Confirmation',
      text: JSON.stringify(orderData),
    };

    await this.transporter.sendMail(mailOptions);
  }
}
