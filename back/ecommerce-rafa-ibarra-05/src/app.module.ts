import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import typeorm from './config/typeorm';
import { DatabaseModule } from './database/database.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    OrdersModule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
