import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  formu: any = FormGroup  ;
  geterror: any[] = []
  disable = false
  constructor( private fb:FormBuilder, private _loginservice: LoginService,private _router:Router) { }
  getErrorEmail():any {
    if( this.formu.get('email').invalid && this.formu.get('email').touched){
      if (!this.formu.get('email').hasError('email')) {
        return 'se requiere un Email';
       }
    }
  }
  getErrorpassword():any {
    if( this.formu.get('password').invalid && this.formu.get('password').touched){
      if (!this.formu.get('password').hasError('minLength')) {
        return 'se requiere un minimo 5';
       }
       if (!this.formu.get('password').hasError('maxLength')) {
        return 'se requiere un maxLength 10';
       }
    }
  }
  ngOnInit(): void {
    this.formu = this.fb.group({
      email : ['', [Validators.required, Validators.email,Validators.min(5)]],
      password : ['', [Validators.required, Validators.minLength(5),Validators.maxLength(20)]]
    });
  }


  login(){

    if (this.formu.invalid) {
      return;
    }

    this.disable = true
    let datos = new UserModel('',this.formu.get('email').value,this.formu.get('password').value, null,0,'',null);

    this._loginservice.login(datos).subscribe(data=>{
        if (this._loginservice.Authoticacion() && data) {
          this._router.navigateByUrl('inicio')
        }
        this.disable = false
    },
    (error)=>{
       this.disable = false
      }
    )
  }

}
