import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { capatalizeFirstLetterOfEachWordInAphrase } from 'src/helpers/capatilize';
@Injectable()
export class RolesService {
  constructor (private prismaService :PrismaService) {}


  async create(createRoleDto: CreateRoleDto) {
    createRoleDto.name = capatalizeFirstLetterOfEachWordInAphrase(createRoleDto.name);
    if(await this.checkIfRoleExist(createRoleDto.name)){
      throw new BadRequestException(`Role ${createRoleDto.name}has alrready been taken`)
    }
    return  this.prismaService.role.create({data: createRoleDto});
  }


  findAll() {
    return this.prismaService.role.findMany();
  }

  
  async findOne(id: number) {
   return this.getRoleById(id);
  }



  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.getRoleById(id);
    updateRoleDto.name = capatalizeFirstLetterOfEachWordInAphrase(updateRoleDto.name);
    if(!await this.checkIfRoleExist(updateRoleDto.name,id)){
      throw new BadRequestException(`Role ${updateRoleDto.name}has alrready been taken`)
    }
    return this.prismaService.role.update({where:{id},data:updateRoleDto});
  }


  async remove(id: number) {
   await this.getRoleById(id);
    return this.prismaService.role.deleteMany({where:{id}});
  }
  private async getRoleById(id:number){
    const role = await this.prismaService.role.findFirst({where:{id}});
    if(!role){
      throw new NotFoundException(`Role with ${id} does not exist`)
    }
    return role;
  }
  private async checkIfRoleExist(name:string, id?:number):Promise<boolean>{
    const role = await this.prismaService.role.findUnique({
     where :{ name,}
    });
    if (id) {
      return role ? role.id === id : true;
    }
    return !!role;

  }

}
