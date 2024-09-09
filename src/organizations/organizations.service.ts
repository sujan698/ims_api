import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { capatalizeFirstLetterOfEachWordInAphrase } from 'src/helpers/capatilize';

@Injectable()
export class OrganizationsService {
  constructor(private prismaService:PrismaService) {}


  async create(createOrganizationDto: CreateOrganizationDto) {
    createOrganizationDto.name = capatalizeFirstLetterOfEachWordInAphrase(createOrganizationDto.name);
    if(createOrganizationDto.address){
      createOrganizationDto.address = capatalizeFirstLetterOfEachWordInAphrase(createOrganizationDto.address);
    }
    if(await this.checkIfOrganizationExist(createOrganizationDto.name)){
      throw new BadRequestException(`Organization ${createOrganizationDto.name}has alrready been taken`)
    }

    return  this.prismaService.organization.create({data: createOrganizationDto});
  }



  findAll() {
    return this.prismaService.organization.findMany();
  }

 async findOne(id: number) {
    return this.getOrganizationById(id);
  }

 async update(id: number,updateOrganizationDto: UpdateOrganizationDto) {
    await this.getOrganizationById(id);
    updateOrganizationDto.name = capatalizeFirstLetterOfEachWordInAphrase(updateOrganizationDto.name);
    if(updateOrganizationDto.address){
      updateOrganizationDto.address= capatalizeFirstLetterOfEachWordInAphrase(updateOrganizationDto.address);
    }
    if(!await this.checkIfOrganizationExist(updateOrganizationDto.name,id)){
      throw new BadRequestException(`Organization ${updateOrganizationDto.name}has alrready been taken`)
    }
    return this.prismaService.organization.update({where:{id},data:updateOrganizationDto});
  }

 
  async remove(id: number) {
    await this.getOrganizationById(id);
    return this.prismaService.organization.deleteMany({where:{id}});
  }

  private async getOrganizationById(id:number){
    const organization = await this.prismaService.organization.findFirst({where:{id}});
    if(!organization){
      throw new NotFoundException(`Organization with ${id} does not exist`)
    }
    return organization;
  }
  private async checkIfOrganizationExist(name:string, id?:number):Promise<boolean>{
    const organization = await this.prismaService.organization.findUnique({
     where :{ name,}
    });
    if (id) {
      return organization ? organization.id === id : true;
    }
    return !!organization;

  }

}


