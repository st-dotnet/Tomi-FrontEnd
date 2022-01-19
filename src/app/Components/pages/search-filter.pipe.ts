import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'searchFilter'
})

export class SearchFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
      if(!value)return null;
      if(!args)return value;
      args = args.toLowerCase();
      return value.filter(function(data: any){
          return (data.name).toLowerCase().includes(args) 
          ||(data.tagFrom).toLowerCase().includes(args) 
          ||(data.tagTo).toLowerCase().includes(args) 
          || (data.group.name).toLowerCase().includes(args);
      });
  }

}