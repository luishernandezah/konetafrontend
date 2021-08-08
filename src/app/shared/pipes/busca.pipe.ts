import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busca'
})
export class BuscaPipe implements PipeTransform {

  transform(value: any, args: any): any {

    if (args.length > 0) {
      const txt = args.toLowerCase()
      let datos
      datos = value.filter((datos: any) => {
        return datos.name.toString().toLowerCase().includes(txt) ||
        datos.email.toString().toLowerCase().includes(txt) ||
        datos.direccion.toString().toLowerCase().includes(txt)||
        datos.documento.toString().toLowerCase().includes(txt)

      }

      )

      return datos
    }
    return value
    return value;
  }

}
