import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './roles/roles.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerVendorsModule } from './customer-vendors/customer-vendors.module';

@Module({
  imports: [RolesModule, PrismaModule, OrganizationsModule, UsersModule, ItemsModule, AuthModule,ConfigModule.forRoot(), CustomerVendorsModule,],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
