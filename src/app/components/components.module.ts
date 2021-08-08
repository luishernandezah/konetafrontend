import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FormausersComponent } from './formausers/formausers.component';


export const componentes=[
  FormausersComponent
]

@NgModule({
  declarations: [
    componentes
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,

    ReactiveFormsModule,
    FormsModule,
  ],
  exports:[
    componentes
  ]
})
export class ComponentsModule { }
