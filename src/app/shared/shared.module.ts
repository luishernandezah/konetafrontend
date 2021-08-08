import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedRoutingModule } from './shared-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './pages/usuarios/list/list.component';
import { MaterialModule } from '../material.module';
import { ComponentsModule } from '../components/components.module';
import { ListclientesComponent } from './pages/clients/listclientes/listclientes.component';
import { EditarolesComponent } from './pages/roles/editaroles/editaroles.component';
import { CheckboxPipe } from './pipes/checkbox.pipe';
import { UdpatecuentaoneComponent } from './pages/usuarios/udpatecuentaone/udpatecuentaone.component';
import { SharedComponent } from './shared.component';
import { BuscaPipe } from './pipes/busca.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    ListclientesComponent,
    EditarolesComponent,
    CheckboxPipe,
    UdpatecuentaoneComponent,
    SharedComponent,
    BuscaPipe,

  ],
  imports: [
  CommonModule,
    SharedRoutingModule,

    ReactiveFormsModule,
     RouterModule,
     MaterialModule,
     ComponentsModule,
     FormsModule
  ],
  providers: [

  ],

})
export class SharedModule { }
