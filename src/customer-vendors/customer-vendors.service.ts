import { Injectable } from '@nestjs/common';
import { CreateCustomerVendorDto } from './dto/create-customer-vendor.dto';
import { UpdateCustomerVendorDto } from './dto/update-customer-vendor.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerVendorsService {
  constructor(private prismaService: PrismaService) {}

  create(createCustomerVendorDto: CreateCustomerVendorDto) {
    return 'This action adds a new customerVendor';
  }

  findAll() {
    return `This action returns all customerVendors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerVendor`;
  }

  update(id: number, updateCustomerVendorDto: UpdateCustomerVendorDto) {
    return `This action updates a #${id} customerVendor`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerVendor`;
  }
}
