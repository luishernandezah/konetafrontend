

import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ListclientesComponent } from './pages/clients/listclientes/listclientes.component';
import { EditarolesComponent } from './pages/roles/editaroles/editaroles.component';
import { ListComponent } from './pages/usuarios/list/list.component';
import { UdpatecuentaoneComponent } from './pages/usuarios/udpatecuentaone/udpatecuentaone.component';


const routes: Routes = [
      {path:'', component:HomeComponent},
      {path:'actualizamicuenta/:id', component:UdpatecuentaoneComponent},
      {path:'listausuarios', component:ListComponent},
      {path:'listaclients', component:ListclientesComponent},
      {path:'listaroles', component:EditarolesComponent},
    ]


@NgModule({
  imports: [RouterModule.forChild(routes )],

exports: [RouterModule]
})
export class SharedRoutingModule { }
