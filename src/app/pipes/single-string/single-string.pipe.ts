import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'singleString'
})
export class SingleStringPipe implements PipeTransform {

  transform(value: string): string {

    return !!value ? value.replace(' ', '-') : value;
  }
}
