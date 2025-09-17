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
  async sendProductNotification(event: string, message: string, product: any) {
    try {
      console.log('Triggering Pusher event:', event, 'for product:', product); // Log for debugging
      await this.pusher.trigger('vendor-channel', event, {
        message,
        product,
      });
    } catch (error) {
      console.error('Error sending Pusher event:', error);
    }
  }
}
