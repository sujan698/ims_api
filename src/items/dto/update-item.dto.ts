
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends (CreateItemDto) {
  static itemId(itemId: any) {
    throw new Error('Method not implemented.');
  }
  static organizationId(organizationId: any) {
    throw new Error('Method not implemented.');
  }
}
