import { Module } from '@nestjs/common';
import { PusherService } from './pusher.service';

@Module({
  providers: [PusherService], // Register PusherService as a provider
  exports: [PusherService],   // Export it so other modules can use it
})
export class PusherModule {}
