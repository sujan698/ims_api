import { Module } from '@nestjs/common';
import { CustomerVendorsService } from './customer-vendors.service';
import { CustomerVendorsController } from './customer-vendors.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CustomerVendorsController],
  providers: [CustomerVendorsService,PrismaService],
})
export class CustomerVendorsModule {}
