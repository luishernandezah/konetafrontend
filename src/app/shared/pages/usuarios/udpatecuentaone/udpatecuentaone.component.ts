import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormausersComponent } from 'src/app/components/formausers/formausers.component';
import { UserModel } from 'src/app/models/user.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-udpatecuentaone',
  templateUrl: './udpatecuentaone.component.html',
  styleUrls: ['./udpatecuentaone.component.css']
})
export class UdpatecuentaoneComponent implements OnInit {
  @ViewChild(FormausersComponent)
  formularios: FormausersComponent = new FormausersComponent();
  id:any
  active= true
  formu:any = FormGroup
  roles = [
    {id:1, nombre:"Administrador"},
    {id:2, nombre:"vendedor"},
    {id:3, nombre:"cliente"}
  ]
  constructor(private _activatedRoute:ActivatedRoute,
    public fb: FormBuilder,private _service:UsuariosService
    ) {
    this._activatedRoute.params.subscribe(datos=>this.id = datos.id)
    console.log(this.id)
  }
  soniguales(campo:string,campo1:string){
    return (group:FormGroup)=>{
      let camp = group.controls[campo].value
      let camp1 = group.controls[campo1].value
      if(camp === camp1){
        return null
      }
      return {
        soniguales:true
      }
    }
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
  actualizai(id:any){

    this._service.verusuarios(id).subscribe((data:any)=>{
      let roless = 0 ;
      if(data.roles.length>0){
        roless = data.roles[0].id
      }
      this.formu.patchValue({
        name:data.name,
        documento: data.documento,
        email:data.email,
        direccion:data.direccion,
        role:roless
      })

    })
    this.formularios.activo('actualizar')
  }
  ngOnInit(): void {
    this.formu = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(30)]],
      documento:[null,[Validators.required,Validators.min(1000000),Validators.max(99999999999),Validators.pattern("^[-+]?[0-9]+$") ]],
      email:['',[Validators.required, Validators.minLength(4),Validators.email,Validators.maxLength(30),Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[A-Za-z]{2,4}$")]],
      password:['',[Validators.required,Validators.required, Validators.minLength(8)]],
      passwordconfig:['',[Validators.required,Validators.required, Validators.minLength(8)]],
      direccion:['',[Validators.required, Validators.minLength(7)]],
      role:[[],[Validators.required,Validators.minLength(1)]],

   },{ validators:this.soniguales('password','passwordconfig')})
   this.actualizai(this.id)
  }

  guardar(){
    if (this.formu.invalid) {
      Object.values(this.formu.controls).forEach((datos:any)=>{
       datos.markAsTouched();
      })
      return ;
    }
    let datos = new UserModel(this.formu.get('name').value,
    this.formu.get('email').value, this.formu.get('password').value,
    this.formu.get('passwordconfig').value,this.formu.get('documento').value,
   this.formu.get('direccion').value, this.formu.get('role').value

  );
      this._service.udapteusuarios(datos,this.id).subscribe((data:any)=>{
        Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500
      })

    },(error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.errors,
        })
      }

      )

    }


}
