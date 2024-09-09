import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesService } from 'src/roles/roles.service';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { capatalizeFirstLetterOfEachWordInAphrase } from 'src/helpers/capatilize';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const roleService = new RolesService(this.prismaService);
    const organizationService = new OrganizationsService(this.prismaService);

    await roleService.findOne(createUserDto.roleId);
    await organizationService.findOne(createUserDto.organizationId);

    createUserDto.name = capatalizeFirstLetterOfEachWordInAphrase(
      createUserDto.name,
    );
    if (await this.checkIfEmailExist(createUserDto.email)) {
      throw new BadRequestException('this email has already taken');
    }
    if (await this.checkIfMobileExist(createUserDto.mobile)) {
      throw new BadRequestException('this mobile number has already taken');
    }

    createUserDto.password = await hash(createUserDto.password, 10);

    return this.prismaService.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    return this.getUserById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  private async getUserById(id:number){
    const user = await this.prismaService.user.findFirst({where:{id}});
    if(!user){
      throw new NotFoundException(`User with ${id} does not exist`)
    }
    return user;
  }
  private async checkIfEmailExist(
    email: string,
    id?: number,
  ): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (id) {
      return user ? user.id === id : true;
    }
    return !!user;
  }

  private async checkIfMobileExist(
    mobile: string,
    id?: number,
  ): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { mobile },
    });
    if (id) {
      return user ? user.id === id : true;
    }
    return !!user;
  }
}
