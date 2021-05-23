import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const modules = [
  DataTablesModule,
  CommonModule
]

@NgModule({
  declarations: [
  ],
  imports: modules,
  exports: modules
})
export class SharedModule { }
