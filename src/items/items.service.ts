import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { capatalizeFirstLetterOfEachWordInAphrase } from 'src/helpers/capatilize';
import { OrganizationsService } from 'src/organizations/organizations.service';

@Injectable()
export class ItemsService {
  constructor(private prismaService: PrismaService) {}

  async create(createItemDto: CreateItemDto) {

    // const itemService = new ItemsService(this.prismaService);
    // const organizationService = new OrganizationsService(this.prismaService);

    // await itemService.findOne(createItemDto.itemId);
    // await organizationService.findOne(createItemDto.organizationId);

    createItemDto.name = capatalizeFirstLetterOfEachWordInAphrase(
      createItemDto.name,
    );
    if (await this.checkIfItemExist(createItemDto.name)) {
      throw new BadRequestException('This item name is already taken');
    }
    return this.prismaService.item.create({ data: createItemDto });
  }

  findAll() {
    return this.prismaService.item.findMany();
  }

  async findOne(id: number) {
    return this.getItemById(id);
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    await  this.getItemById(id);
    // const itemService = new ItemsService(this.prismaService);
    // const organizationService = new OrganizationsService(this.prismaService);

    // await itemService.findOne(updateItemDto.itemId);
    // await organizationService.findOne(updateItemDto .organizationId);


    updateItemDto.name = capatalizeFirstLetterOfEachWordInAphrase(updateItemDto.name);
    if(updateItemDto.name){
      updateItemDto.name= capatalizeFirstLetterOfEachWordInAphrase(updateItemDto.name);
    }
    if(!await this.checkIfItemExist(updateItemDto.name,id)){
      throw new BadRequestException(`Item ${updateItemDto.name}has alrready been taken`)
    }
    return this.prismaService.item.update({where:{id},data:updateItemDto});
  }

  async remove(id: number) {
   await this.getItemById(id);
   return this.prismaService.item.deleteMany({ where: { id } });
  }
  private async checkIfItemExist(name: string, id?: number): Promise<boolean> {
    const item = await this.prismaService.item.findUnique({
      where: { name },
    });
    if (id) {
      return item ? item.id === id : true;
    }
    return !!item;
  }
  private async getItemById(id:number){
    const item =await this.prismaService.item.findFirst({where:{id}});
    if(!item){
      throw new BadRequestException(`Item with ${id} does not exist.`)
    }
    return item;
  }
}
