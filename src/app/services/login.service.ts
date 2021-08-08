import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token:string = ''
  tiempos:string = ''
  data:any = ''
  tokenp:any
  menu:any
  usuarios:any

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }
  login(data: UserModel){
    let email = data.email
    let password = data.password

    return  this._http.post<any>(`${environment.apiUrl}login`,{email,password} ).pipe(map((data:any)=>{
      console.log(data.users)
      this.guardaLocastore(data.users,data.menu,data.access_token,data.expires_in)
      return true
      }
    ))
  }
  guardaLocastore(users:any,menu:any,access_token:any,tiempos:any){
    localStorage.setItem('users',JSON.stringify(users))
    localStorage.setItem('menus',JSON.stringify(menu))
    localStorage.setItem('token',access_token)
    localStorage.setItem('expires',tiempos)
  }
  Authoticacion(){
    if(localStorage.getItem('token')){
      return true
    }else{
      return false ;
    }
    return true;
  }
  removeToken(){
    localStorage.clear();
    localStorage.clear();
  }

  logout(){
    let headers = new HttpHeaders({
      Authorization : 'Bearer ' +  localStorage.getItem('token')
    });
    return this._http.post<any[]>(`${environment.apiUrl}logout` , '',{headers})
      .subscribe(
        data=>{
          console.log(data)
          this.removeToken();
          return this._router.navigateByUrl('login')},
        (error : HttpErrorResponse)=>{
          this.removeToken()

        }
      );
  }
}
