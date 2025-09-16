import { Injectable } from '@nestjs/common';
import Pusher from 'pusher';

@Injectable()
export class PusherService {
  private pusher: Pusher;

  constructor() {
    this.pusher = new Pusher({
      appId: "2051259",        // Your Pusher app ID
      key: "165ff3ab0d24b6a4f545",             // Your Pusher key
      secret: "1a0c282b53c4dd78b6e6",       // Your Pusher secret
      cluster: "ap3",     // Your Pusher cluster
      useTLS: true,
    });
  }

  // Method to send notifications to Pusher channel
  async sendLoginNotification(email: string) {
    try {
            console.log('Triggering login notification for:', email); // Add a log here
      await this.pusher.trigger('vendor-channel', 'login-event', {
        message: `${email} just logged in`,
        email,
      });
    } catch (error) {
      console.error('Error sending Pusher event:', error);
    }
  }
}
