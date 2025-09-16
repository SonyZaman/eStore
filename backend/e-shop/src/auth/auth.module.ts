// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { VendorModule } from 'src/vendor/vendor.module'; // Import SellerModule
import { AuthController } from './auth.controller';
import { PusherModule } from 'src/notifications/pusher.modul';
//import { MailModule } from 'src/mail/mailer.module';


@Module({
  imports: [
    PusherModule,
    VendorModule,  // Import Seller module to access seller data
    //MailModule,
    JwtModule.register({
      secret: 'your_secret_key',  // Store this in an environment variable
      signOptions: { expiresIn: '1h' },  // Set JWT expiry time
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],  // Export AuthService for use in other modules
})
export class AuthModule {}
