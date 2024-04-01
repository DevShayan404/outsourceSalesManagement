import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipe',
})
export class PipePipe implements PipeTransform {
  transform(value: any, search?: any): any {
    if (!value) return null;
    if (!search) return value;

    return value.filter(function (item: any) {
      return JSON.stringify(item).toLowerCase().includes(search);
    });
  }
}
