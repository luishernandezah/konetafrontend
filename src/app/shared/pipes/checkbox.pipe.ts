import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkbox'
})
export class CheckboxPipe implements PipeTransform {

  transform(value: any,obj:any): Boolean {


    if (value.includes(obj.toString())) {
      return true
    }
    return false;
  }


}
