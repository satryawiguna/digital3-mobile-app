import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'productTypeId'
})

export class CartFilter implements PipeTransform {
  transform(items: any[], args: number): any {
    return items.filter(item => item.product_type_id == args);
  }
}
