import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './../../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private _loginServices: LoginService,private _router: Router){
  }
  canActivate(): any{

      if(this._loginServices.Authoticacion()){
        return true
      }else{
        this._router.navigateByUrl('login')
      }
  }

}
