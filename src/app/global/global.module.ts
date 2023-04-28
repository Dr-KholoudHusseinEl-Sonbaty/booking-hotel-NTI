import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatrialModuleModule } from './material.module';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';







@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MatrialModuleModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    MatrialModuleModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ]
})
export class GlobalModule { }
