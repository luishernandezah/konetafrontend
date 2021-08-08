import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';
import { environment } from './../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  getusuarios(){
    let headers = new HttpHeaders({
      Authorization : 'Bearer ' +  localStorage.getItem('token')
    });
    return this._http.get(`${environment.apiUrl}users` ,{headers})
  }
  postusuarios(data:UserModel){
  let headers = new HttpHeaders({
      Authorization : 'Bearer ' +  localStorage.getItem('token')
    });
    return this._http.post(`${environment.apiUrl}users`,data,{headers})
  }

  udapteusuarios(data:UserModel,id:any){
    let headers = new HttpHeaders({
        Authorization : 'Bearer ' +  localStorage.getItem('token')
      });
      return this._http.put(`${environment.apiUrl}users/${id}`,data,{headers})
    }


  verusuarios(id:any){
    let headers = new HttpHeaders({
        Authorization : 'Bearer ' +  localStorage.getItem('token')
      });
      return this._http.get(`${environment.apiUrl}users/${id}`,{headers})
    }


  deleteusuarios(id:any){
    let headers = new HttpHeaders({
        Authorization : 'Bearer ' +  localStorage.getItem('token')
      });
      return this._http.delete(`${environment.apiUrl}users/${id}`,{headers})
    }
////////////////clientes///////////////

getclient(){
  let headers = new HttpHeaders({
    Authorization : 'Bearer ' +  localStorage.getItem('token')
  });
  return this._http.get(`${environment.apiUrl}clients` ,{headers})
}
postclient(data:UserModel){
let headers = new HttpHeaders({
    Authorization : 'Bearer ' +  localStorage.getItem('token')
  });
  return this._http.post(`${environment.apiUrl}clients`,data,{headers})
}

udapteclient(data:UserModel,id:any){
  let headers = new HttpHeaders({
      Authorization : 'Bearer ' +  localStorage.getItem('token')
    });
    return this._http.put(`${environment.apiUrl}clients/${id}`,data,{headers})
  }


verclient(id:any){
  let headers = new HttpHeaders({
      Authorization : 'Bearer ' +  localStorage.getItem('token')
    });
    return this._http.get(`${environment.apiUrl}clients/${id}`,{headers})
  }


deleteclient(id:any){
  let headers = new HttpHeaders({
      Authorization : 'Bearer ' +  localStorage.getItem('token')
    });
    return this._http.delete(`${environment.apiUrl}clients/${id}`,{headers})
  }
//////////////Roles/////////
getroles(){
  let headers = new HttpHeaders({
    Authorization : 'Bearer ' +  localStorage.getItem('token')
  });
  return this._http.get(`${environment.apiUrl}roles` ,{headers})
}

udpatedroles(data:any){
  let headers = new HttpHeaders({
    Authorization : 'Bearer ' +  localStorage.getItem('token')
  });
  return this._http.put(`${environment.apiUrl}roles/2`,data ,{headers})
}

}
