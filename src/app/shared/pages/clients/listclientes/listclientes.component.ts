import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormausersComponent } from 'src/app/components/formausers/formausers.component';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listclientes',
  templateUrl: './listclientes.component.html',
  styleUrls: ['./listclientes.component.css']
})
export class ListclientesComponent implements OnInit {

  @ViewChild(FormausersComponent)
  formularios: FormausersComponent = new FormausersComponent();
  datos:any = []
  texto = "Clientes"
  formu:any = FormGroup
  guarda = false;
  actualiza = false;
  inputseach:any = ''
  eliminard = false
  constructor(public fb: FormBuilder,private _service:UsuariosService ) {

    const data = localStorage.getItem('menus')
    const recores = JSON.parse(data||'')
    for (const iterator of recores) {
      if(iterator.acceso == "cliente"){
        if(iterator.slug == "clienteguardar"){
          this.guarda = true
        }
        if(iterator.slug == "clienteactualizar"){
          this.actualiza = true
        }
        if(iterator.slug == "clienteeliminar"){
          this.eliminard = true
        }


      }
    }

    this._service.getclient().subscribe(data=>
      {
        console.log(data)
        this.datos = data
      }
      )

   }
   lista(){
    this._service.getclient().subscribe(data=>
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
      role:[{value:"3",disabled: true}],
      direccion:['',[Validators.required, Validators.minLength(7)]],
      password:[''],
      passwordconfig:[''],

   })
   this.formu.patchValue({
    role:"3"
  })
  }

  id:any
  bitn = ''
  actualizai(id:any){
    this.bitn = "actualizar"
    this.id = id
    console.log(id)
    this._service.verclient(id).subscribe((data:any)=>{

      if(data.length>0){
      this.formu.patchValue({
        name:data[0].name,
        documento: data[0].documento,
        email:data[0].email,
        direccion:data[0].direccion,

      })
    }
      this.formularios.activo('actualizar')
      console.log(data)
    })
  }

  actualizar(datos:any){
    this._service.udapteusuarios(datos,this.id)
  }
  guardar(datos:any){
   datos.role = 3
    if('actualizar' == this.bitn){
      this._service.udapteclient(datos,this.id).subscribe((data:any)=>{
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
    this._service.postclient(datos).subscribe((data:any)=>{
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
    this._service.deleteclient(id).subscribe((data:any)=>{
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
