import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorModule } from './vendor/vendor.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { PusherModule } from './notifications/pusher.modul';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration available globally
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '01082000', // Now you can access the configuration here
        database: 'e-com',
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService], // Injecting ConfigService
    }),
    VendorModule,
    CategoryModule,
    OrderItemModule,
    OrderModule,
    CustomerModule,
    ProductModule,
    PusherModule,
    
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
