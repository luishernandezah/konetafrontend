import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {

  cliente = false
  usaurios = false
  role = false
  id:any
  constructor(private _service:LoginService) {
    const miusauiros = localStorage.getItem('users')
    const miid = JSON.parse(miusauiros||'')
    this.id = miid.id

    const data = localStorage.getItem('menus')
    const recores = JSON.parse(data||'')

    for (const iterator of recores) {
      if(iterator.acceso == "users"){
        if(iterator.slug == "userslistar"){

          this.usaurios = true
        }
        if(iterator.slug == "rolespermisos"){
          this.role = true
        }

      }
      if(iterator.acceso == "cliente"){
        if(iterator.slug == "clientelistar"){
          this.cliente = true
        }
      }

    }
   }

  ngOnInit(): void {
  }
  loguat(){
    this._service.logout()
  }
}
