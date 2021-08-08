import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormausersComponent } from 'src/app/components/formausers/formausers.component';
import Swal from 'sweetalert2';
import { UsuariosService } from './../../../../services/usuarios.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild(FormausersComponent)
  formularios: FormausersComponent = new FormausersComponent();
  datos:any = []
  formu:any = FormGroup
  guarda = false;
   inputseach:any = ''
  actualiza = false;
  eliminard = false
  constructor(public fb: FormBuilder,private _service:UsuariosService ) {

    const data = localStorage.getItem('menus')
    const recores = JSON.parse(data||'')

    for (const iterator of recores) {
      if(iterator.acceso == "users"){
        if(iterator.slug == "usersguardar"){
          this.guarda = true
        }
        if(iterator.slug == "usersactualizar"){
          this.actualiza = true
        }
        if(iterator.slug == "userseliminar"){
          this.eliminard = true
        }
      }
    }
    this._service.getusuarios().subscribe(data=>
      {
        console.log(data)
        this.datos = data
      }
      )
   }
   lista(){
    this._service.getusuarios().subscribe(data=>
      {
        this.datos = data
      }
      )
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
  ngOnInit(): void {
    this.formu = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(30)]],
      documento:[null,[Validators.required,Validators.min(1000000),Validators.max(99999999999),Validators.pattern("^[-+]?[0-9]+$") ]],
      email:['',[Validators.required, Validators.minLength(4),Validators.email,Validators.maxLength(30),Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[A-Za-z]{2,4}$")]],
      password:['',[Validators.required,Validators.required, Validators.minLength(8)]],
      passwordconfig:['',[Validators.required,Validators.required, Validators.minLength(8)]],
      role:[[],[Validators.required,Validators.minLength(1)]],
      direccion:['',[Validators.required, Validators.minLength(7)]],

   },{ validators:this.soniguales('password','passwordconfig')})
  }

  id:any
  bitn = ''
  actualizai(id:any){
    this.bitn = "actualizar"
    this.id = id
    console.log(id)
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
      this.formularios.activo('actualizar')
      console.log(data)
    })
  }

  actualizar(datos:any){
    this._service.udapteusuarios(datos,this.id)
  }
  guardar(datos:any){
    if('actualizar' == this.bitn){
      this._service.udapteusuarios(datos,this.id).subscribe((data:any)=>{
        Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500
      })
      this.lista()
    },(error)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.errors,
        })
      }

      )
      this.bitn = ''
      return
    }
    this._service.postusuarios(datos).subscribe((data:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500
      })
      this.lista()

        console.log(data)
    },(error)=>{

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.errors,
      })
      }
    )
  }
  eliminar(id:any){
    this._service.deleteusuarios(id).subscribe((data:any)=>{
      Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: data.message,
      showConfirmButton: false,
      timer: 1500
    })
    this.lista()
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
