import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-editaroles',
  templateUrl: './editaroles.component.html',
  styleUrls: ['./editaroles.component.css']
})
export class EditarolesComponent implements OnInit {
  formu:any = FormGroup
  permisos:any = []
  constructor(public fb:FormBuilder, private _service:UsuariosService) {


  }

  ngOnInit(): void {
    this.formu = this.fb.group({
      rolepermiso: this.fb.array([])
    })

    this._service.getroles().subscribe((data:any)=>{
      if(data.roles[1].permisos.length){
        this.formu.setControl('rolepermiso',
        this.fb.array(data.roles[1].permisos.map((data:any)=>data.id.toString()) ));
      }
      for (const key of data.permiso) {
        this.permisos.push(key)
      }



    })
  }
  onCheckboxChange(e:any) {

    const checkbox:FormArray  =  this.formu.get('rolepermiso') as FormArray ;

    if (e.target.checked) {
      checkbox.push( new FormControl (e.target.value))
    }else{
      const checboxdelete = checkbox.controls.findIndex(elemnt=>elemnt.value === e.target.value)
      checkbox.removeAt(checboxdelete)
    }

  }
  enviar(){
    let permiso = {
      permiso: this.formu.get("rolepermiso").value
    }
    this._service.udpatedroles(permiso).subscribe(data=>console.log(data))
  }

}
