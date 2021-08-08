import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [

  CommonModule,
    MaterialModule,
    FormsModule,ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
  ],
  exports:[LoginComponent]
})
export class AuthModule { }
