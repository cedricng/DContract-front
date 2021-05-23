import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { ProjectsComponent } from './projects/projects.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ContractListComponent,
    ContractDetailsComponent,
    ProjectsComponent,
  ],
  imports: [
    CommonModule,
    ContractRoutingModule,
    ComponentsModule,
    SharedModule,
  ]
})
export class ContractModule { }
