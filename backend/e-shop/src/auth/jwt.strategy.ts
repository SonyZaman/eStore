// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { VendorService } from '../vendor/vendor.service';
import { VendorEntity } from '../vendor/vendor.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly vendorService: VendorService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from Bearer token
      ignoreExpiration: false,  // Don't ignore expiration
      secretOrKey: 'your_secret_key',  // This should be an environment variable
    });
  }

  async validate(payload: any): Promise<VendorEntity> {
    const seller = await this.vendorService.findOne(payload.sub); // Get seller by ID from the payload
    if (!seller) {
      throw new UnauthorizedException('Seller not found');
    }
    return seller; // Return the seller entity if found
  }
}
