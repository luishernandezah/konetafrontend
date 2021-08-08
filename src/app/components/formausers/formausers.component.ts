import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { UserModel } from './../../models/user.model';



@Component({
  selector: 'app-formausers',
  templateUrl: './formausers.component.html',
  styleUrls: ['./formausers.component.scss']
})
export class FormausersComponent implements OnInit {
  @Input() formu:any
  @Input() texto:any
  @Output()enviardata:EventEmitter<any> = new EventEmitter()
  public active: Boolean = false;
  item:any

  data:any
  roles = [
    {id:1, nombre:"Administrador"},
    {id:2, nombre:"vendedor"},
    {id:3, nombre:"cliente"}
  ]
  constructor() { }

  ngOnInit() {

  }
  getError(element:string):any{
    if( this.formu.get(element).invalid && this.formu.get(element).touched){

      if( this.formu.get(element).errors.pattern){
        return `comprueba que un email es válido`
      }
        if( this.formu.get(element).errors.required){
          return "el campo es obligatorio"
        }
        if( this.formu.get(element).errors.email){
          return `requiere se un email `
        }
        if( this.formu.get(element).errors.minlength){
          return `el campo requiere un mínimo de ${this.formu.get(element).errors.minlength.requiredLength} caracteres, caracteres actual ${this.formu.get(element).errors.minlength.actualLength} `
        }
        if( this.formu.get(element).errors.maxlength){
          return `el campo requiere un máximo de ${this.formu.get(element).errors.maxlength.requiredLength} caracteres, caracteres actual ${this.formu.get(element).errors.maxlength.actualLength} `
        }
    }
  }
  getErrornumero(element:string):any{

    if( this.formu.get(element).invalid && this.formu.get(element).touched){

      if( this.formu.get(element).errors.pattern){
        return `el campo no se permiten caracteres especiales`
      }

      if(this.formu.get(element).errors.min){
        return `el campo  se requiere un  mínimo  ${this.formu.get(element).errors.min.min}  `
      }
      if(this.formu.get(element).errors.max){
        return `el campo se requiere un máximo   ${this.formu.get(element).errors.max.max}  `
      }
      if( this.formu.get(element).errors.maxlength){
        return `el campo  requiere un máximo de ${this.formu.get(element).errors.maxlength.requiredLength} caracteres, caracteres actual ${this.formu.get(element).errors.maxlength.actualLength} `
      }

      if( this.formu.get(element).errors.required){
        return "el campo es obligatorio"
      }

    }
  }
  cerrar() {
    this.active = false
  }

  guardar() {
    if (this.formu.invalid) {
      Object.values(this.formu.controls).forEach((datos:any)=>{
       datos.markAsTouched();
      })
      return ;
    }
    let datos = new UserModel(this.formu.get('name').value,
    this.formu.get('email').value, this.formu.get('password').value,
    this.formu.get('passwordconfig').value,this.formu.get('documento').value,
   this.formu.get('direccion').value,  this.formu.get('role').value,

  );

  this.enviardata.emit(datos)
    this.active = false
  }
  activo(data: any) {
    this.active = true
  }


}
