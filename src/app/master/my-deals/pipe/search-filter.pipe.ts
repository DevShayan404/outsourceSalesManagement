import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class SearchFilterPipe implements PipeTransform {

  // transform(value: any, searchTerm:any):any {
  //   if(value.length === 0){
  //     return value;
  //   }
  //   return value.filter(function(search:any){
  //     return search.dba.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
  //   })
  // }


transform(value: any, search?:any):any {
  if(!value) return null;
  if(!search) return value;
  
  return value.filter(function(item:any){
  return JSON.stringify(item).toLowerCase().includes(search);
  });
  }
}


