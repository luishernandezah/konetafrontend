import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LoginGuard } from './config/guard/login.guard';

import { SharedComponent } from './shared/shared.component';
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'inicio',pathMatch:'full'},
  { path: 'inicio', component: SharedComponent,canActivate : [LoginGuard],
  loadChildren:()=>import('./shared/shared.module').then(m=>m.SharedModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class AppRoutingModule { }
