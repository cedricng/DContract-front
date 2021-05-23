import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ProgressComponent } from './progress/progress.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ProgressComponent,],
  imports: [
    CommonModule,
    DataTablesModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ProgressComponent
  ]
})
export class ComponentsModule { }
